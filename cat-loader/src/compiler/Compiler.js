/* eslint-disable */
import * as fs from 'fs';
import path from "path";
import Replaces from "./Replaces";

class Compiler {
  static compile(src, file, args) {
    const fileArray = file.split("\n");
    fileArray.forEach(line => {
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
            file = file.replace(`/* ${replacementComment} */`, replacementFunctions[replacementFunction](src, ...parametersArgs))
          } else {
            const parameterNamePos = statement.indexOf("parametro", replacementCommentEnd + 8);
            parameterName = statement.substring(parameterNamePos + 9, statement.length).trim();
            const replacementFunctions = new Replaces();
            file = file.replace(`/* ${replacementComment} */`, replacementFunctions[replacementFunction](src, args[parameterName]))
          }
        }
      }
    })
    return file;
  }
  static getComponentClass(componentTemplate) {
    console.log(componentTemplate);
    const templatePos = componentTemplate.indexOf("<template>");
    const stylePos = componentTemplate.indexOf("<style>");
    let styles = "";
    let stringTemplate = "";
    let finalStringTemplate = "";
    if (templatePos !== -1) {
      stringTemplate = componentTemplate.substring(templatePos, componentTemplate.indexOf("</template>")).replace("<template>", "");
    }

    if (stylePos !== -1) {
      styles = componentTemplate.substring(stylePos, componentTemplate.indexOf("</style>")).replace("<style>", "");
    }
    finalStringTemplate = `const template = document.createElement("template");template.innerHTML =\`<style>${styles}</style>${stringTemplate}\`;`;
    return finalStringTemplate;
  }
  static writeFileSyncRecursive(filename, content, charset) {
    //const file = path.normalize(filename);
    const fileSplit = filename.split('/').slice(1, -1);

    console.log(fileSplit);
    /*file.split('/').slice(0, -1).reduce((last, folder) => {
      let folderPath = last ? (last + '/' + folder) : folder;
      console.log("Directory: ",folderPath);
      if (!fs.accessSync(folderPath)) {
        console.log(folderPath);
        fs.mkdirSync(folderPath); 
      }
      return folderPath;
    });*/
    let currentPath = "";
    fileSplit.forEach(p=>{
      currentPath += "/"+p;
     // console.log(currentPath)
      if (!fs.existsSync(path.normalize(currentPath))){
        console.log(currentPath);
        fs.mkdirSync(currentPath);
      }
    })
   // console.log(filename+'   '+fs.existsSync(path.normalize(filename)));
    fs.writeFileSync(filename, content, charset)
  }
  static getTemplateImports(src, alias, template) {
    const fileArray = template.split("\n");
    let importClass = '';
    fileArray.forEach(line => {
      if (line.indexOf("<!--") !== -1) {
        const statement = line.replace("<!--", '').replace("-->", "").trim();
        const replacementCommentEnd = statement.indexOf("import");
        if (replacementCommentEnd !== -1) {
          const componentClass = statement.split(" ")[1];
          const component = fs.readFileSync(path.join(src + "/" + alias.COMPONENTS, "./" + componentClass + ".js"), "utf8").toString();
          const compiledComponent = Compiler.getComponentClass(component);
          //console.log(path.join(src + "/" + alias.COMPONENTS + "/lib", "./" + componentClass + ".js"));
          Compiler.writeFileSyncRecursive(path.join(src + "/" + alias.COMPONENTS + "/lib", "./" + componentClass + ".js"), compiledComponent + component, "utf8");
          importClass += `instance.add("${componentClass}");`;
        }
      }
    });
    return importClass;
  }
}

export default Compiler;
