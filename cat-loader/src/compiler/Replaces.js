/* eslint-disable */
import * as fs from 'fs';
import path from "path";
import Compiler from "./Compiler";

class Replaces {
  replaceJson(src, json) {
    return JSON.stringify(json);
  }
  replaceRoutes(src, json, alias) {
    const routerKeys = Object.keys(json);
    let router = "";
    routerKeys.forEach(k => {
      router += `if ("${json[k].path}" === this.url.pathname){
       const template = await import(\`VIEWS/${json[k].view}\`);`;
      const view = fs.readFileSync(path.join(src + "/" + alias.VIEWS, "./" + json[k].view), "utf8").toString();
      router += Compiler.getTemplateImports(src,alias,view);
      router += `console.log(template.default);document.getElementById("app").innerHTML = document.getElementById("app").innerHTML + template.default;
     }`;
    });
    return router;
  }
}

export default Replaces;
