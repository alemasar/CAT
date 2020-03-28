import instance from "CATSRC/classes/Singleton";
/** write json ejecuta replaceJson con el parametro json **/
/** write routes ejecuta replaceRoutes con los parametros json, alias **/

class Router{
  constructor (json){
    this.url = new URL(document.location);
    this.initRouter(json);
  }
  async initRouter(json){
    const viewLoaded = new Event('viewLoaded');
    /* write routes */
    document.dispatchEvent(viewLoaded);
    console.log(instance.getAll())
  }
}
export default new Router(/* write json */);