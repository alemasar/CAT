/* eslint-disable */
import * as fs from 'fs';
import path from "path";
import Compiler from "./Compiler";

class Replaces {
  replaceJson(src, json) {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(json));
    });
  }
  async replaceRoutes(src, json, alias) {
    const routerKeys = Object.keys(json);
    let router = "";
    for (const k of routerKeys) {
      router += `if ("${json[k].path}" === this.url.pathname){
       const template = await import(\`VIEWS/${json[k].view}\`);`;
      const view = fs.readFileSync(path.join(src + "/" + alias.VIEWS, "./" + json[k].view), "utf8").toString();
      const route = await Compiler.getTemplateImports(src,alias,view);
      router += route;
      router += `document.getElementById("app").innerHTML = document.getElementById("app").innerHTML + template.default;
     }`;
    };
    return new Promise((resolve, reject) => {
      resolve(router);
    });
  }
}

export default Replaces;
