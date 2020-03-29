/* eslint-disable */
import * as fs from 'fs';
import path from "path";
import sass from "node-sass";
import Replaces from "./Replaces";
import assetFunctions from "node-sass-asset-functions";

class Compiler {
  static async compile(src, file, args) {
    const fileArray = file.split("\n");
    for (const line of fileArray) {
      if (line.indexOf("/**") !== -1) {
        const statement = line.replace("/**", '').replace("**/", "").trim();
        const replacementCommentEnd = statement.indexOf("ejecuta");
        let replacementComment = "";
        let replacementFunction = "";
        let parameterName = "";
        if (replacementCommentEnd !== -1) {
          replacementComment = statement.substring(0, replacementCommentEnd).trim();
          replacementFunction = statement.substring(replacementCommentEnd + 8, statement.indexOf(" ", replacementCommentEnd + 8));
          let parametersNamePos = statement.indexOf("parametros", replacementCommentEnd + 8);
          if (parametersNamePos !== -1) {
            const parameters = statement.substring(parametersNamePos + 10, statement.length);
            const parametersName = parameters.split(",");
            const parametersArgs = [];
            parametersName.forEach(p => {
              parametersArgs.push(args[p.trim()]);
            })
            const replacementFunctions = new Replaces();
            const replaceString = await replacementFunctions[replacementFunction](src, ...parametersArgs);
            file = file.replace(`/* ${replacementComment} */`, replaceString)
          } else {
            const parameterNamePos = statement.indexOf("parametro", replacementCommentEnd + 8);
            parameterName = statement.substring(parameterNamePos + 9, statement.length).trim();
            const replacementFunctions = new Replaces();
            const replaceString = await replacementFunctions[replacementFunction](src, args[parameterName]);
            file = file.replace(`/* ${replacementComment} */`, replaceString)
          }
        }
      }
    }
    return file;
  }
  static getCss(styles,alias) {
    return new Promise((resolve, reject) => {
      sass.render(
        {
          functions: assetFunctions({
            images_path: alias.ASSETS,
            http_images_path: alias.ASSETS
          }),
          data: styles
        },
        (err, result) => {
          console.log(err)
          const css = result.css.toString();
          /* this.searchImages(css, inputs.json.basePath, inputs.webpack)
           resolve(css);*/
          // console.log(css);
          resolve(css);
        }
      );
    });
  }
  static async getComponentCss(componentTemplate, alias) {
    const stylePos = componentTemplate.indexOf("<style>");
    let styles = "";
    let css = "";
    if (stylePos !== -1) {
      styles = componentTemplate.substring(stylePos, componentTemplate.indexOf("</style>")).replace("<style>", "");
      css = Compiler.getCss(styles, alias);
    }
    return new Promise((resolve, reject) => {
      resolve(css);
    });
  }
  static getComponentTemplate(componentTemplate) {
    const templatePos = componentTemplate.indexOf("<template>");
    let stringTemplate = "";
    if (templatePos !== -1) {
      stringTemplate = componentTemplate.substring(templatePos, componentTemplate.indexOf("</template>")).replace("<template>", "");
    }
    return stringTemplate;
  }

  static writeFileSyncRecursive(filename, content, charset) {
    const fileSplit = filename.split('/').slice(1, -1);
    let currentPath = "";
    fileSplit.forEach(p => {
      currentPath += "/" + p;
      if (!fs.existsSync(path.normalize(currentPath))) {
        fs.mkdirSync(currentPath);
      }
    })
    fs.writeFileSync(filename, content, charset)
  }
  static getCodeClass(code) {
    const classSplitted = code.split("\n");
    let copy = false;
    let classCode = "";
    classSplitted.forEach(line => {
      if (line.indexOf("class") === 0 || copy) {
        copy = true;
        classCode += `${line}\n`;
      }
    })
    return classCode;
  }
  static getClassImports(component){
    let classImports = "";
    const classSplitted = component.split("\n");
    classSplitted.forEach(line => {
      if (line.indexOf("import") === 0) {
        classImports += `${line}\n`;
      }
    });
    return classImports;
  }
  static async getTemplateImports(src, alias, template) {
    const fileArray = template.split("\n");
    let finalStringTemplate = ``;
    let importingClass = '';
    const imports = [];
    fileArray.forEach(line => {
      if (line.indexOf("<!--") !== -1) {
        const statement = line.replace("<!--", '').replace("-->", "").trim();
        const replacementCommentEnd = statement.indexOf("import");
        if (replacementCommentEnd !== -1) {
          imports.push(statement.split(" ")[1])
        }
      }
    });

    console.log("start", imports);
    for (const importClass of imports) {
      const component = fs.readFileSync(path.join(src + "/" + alias.COMPONENTS, "./" + importClass + ".js"), "utf8").toString();
      const classImports = Compiler.getClassImports(component);
      const css = await Compiler.getComponentCss(component, alias);
      const classCode = Compiler.getCodeClass(component);
      const stringTemplate = Compiler.getComponentTemplate(component)
      finalStringTemplate = `const template = document.createElement("template");
      template.innerHTML =\`<style>
      ${css}
      </style>
      ${stringTemplate}\`;`;
      console.log(finalStringTemplate);
      Compiler.writeFileSyncRecursive(path.join(src + "/" + alias.COMPONENTS + "/lib", "./" + importClass + ".js"), classImports + "\n" + finalStringTemplate + "\n" + classCode, "utf8");
      importingClass += `instance.add("${importClass}");`;
    }
    console.log("end", imports);
    return new Promise((resolve, reject) => {
      resolve(importingClass);
    });
  }
}

export default Compiler;
