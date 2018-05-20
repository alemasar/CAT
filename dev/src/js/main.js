// import CatAjax from './common/CatAjax';

// import CatTwig from './Twig/CatTwig';

import Config from './modules/config';
import {module} from './modules/page';
import {template} from './modules/template';

// import Utils from './common/utils';
const config = new Config();
const page = module(config);
const t = template(page);
document.addEventListener('DOMContentLoaded', () => {

    t.func = () => {
        return 'Estoy en main';
    }
});

/*
 *export default class CatPage {
 *    constructor (url) {
 *       const a = new CatAjax(url, {});
 *       this.defaultRoute = {};
 *   }
 *
 *  get page () {
 *       const url = new URL(window.location.href);
 *       const p = url.searchParams.get("page")
 *       if (p !== '' && p === obj.id) {
 *           this.pageAssigment(r, obj);
 *       } else if (p === '' || p === null) {
 *           const firstElement = 0;
 *           if (r.default) {
 *               this.pageAssigment(r, obj);
 *           } else if (index === firstElement) {
 *               this.pageAssigment(r, obj);
 *           }
 *       }
 *      // return ;
 *   }
 *
 *   pageAssigment (from, to) {
 *       to.default = from.default;
 *       this.defaultRoute = to;
 *   }
 *}
 *const objAssign = (from) => {
 *
 *   const obj = {}
 *   obj.label = from.label;
 *   obj.template = from.path + '/' + from.template;
 *   obj.id = from.id;
 *   obj.data = from.data;
 *   obj.css = from.css;
 *   obj.dataName = from.dataName;
 *
 *   return obj;
 *}
 *
 *document.addEventListener('DOMContentLoaded', () => {
 *   const a = new CatAjax("http://localhost:3004/routes", {});
 *   a.response.subscribe((data) => {
 *       const routes = [];
 *       let defaultRoute = {};
 *
 *       data.forEach((rs) => {
 *           rs.children.forEach((r, index) => {
 *               const obj = objAssign(r);
 *
 *               if (page !== '' && page === obj.id) {
 *                   pageAssigment(r, obj);
 *               } else if (page === '' || page === null) {
 *                   const firstElement = 0;
 *                   if (r.default) {
 *                       pageAssigment(r, obj);
 *                   } else if (index === firstElement) {
 *                       pageAssigment(r, obj);
 *                   }
 *               }
 *               routes.push(obj);
 *           });
 *       });
 *
 *       if (defaultRoute) {
 *           const t = new CatTwig({
 *               id: "prova",
 *               namespaces: {
 *                   'views_dir': './dev/src/tpls'
 *               },
 *               href: './dev/src/tpls/route_menu.html',
 *               async: false
 *           });
 *           t.template.subscribe((t) => {
 *               console.log(defaultRoute)
 *               console.log(t.render({"routes": [defaultRoute]}))
 *           })
 *
 *       }
 *
 *
 *       //  console.log(t.render())
 *   })
 *})
 */
