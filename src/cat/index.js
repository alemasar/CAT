import instance from "./src/classes/Singleton";
import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";
import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
window.addEventListener('popstate', function () {
  console.log("EYYYYYYY")
});
//window.onpopstate = function() {alert(1);};
const loadComponents = async (components) => {
  for (let cmp of components) {
    await import(`COMPONENTS/lib/${cmp}`);
  }
}

document.addEventListener("viewLoaded", () => {
  //console.log(WebComponents)
  // eslint-disable-next-line no-undef
  WebComponents.waitFor(async () => {
    // At this point we are guaranteed that all required polyfills have
    // loaded, and can use web components API's.
    // The standard pattern is to load element definitions that call
    // `customElements.define` here.
    // Note: returning the import's promise causes the custom elements
    // polyfill to wait until all definitions are loaded and then upgrade
    // the document in one batch, for better performance.
    const components = instance.getAll();
    console.log(instance.getAll());
    await loadComponents(components);
    console.log(customElements.get('chess-board'))
    //document.body.innerHTML = '<a href="#" onclick="history.pushState({page: 1}, "title 1", "/news");">Home</a>';
    //history.pushState({}, '/news', '/news');
    //    history.pushState({}, document.title, "/news");
  });
  //  document.body.appendChild(component());
})
