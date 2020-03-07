import instance from "./src/classes/Singleton";
import "@webcomponents/webcomponentsjs/webcomponents-loader.js";

let first = instance;
let second = instance;
console.log(first===second);

function component() {
  const element = document.createElement('div');

  element.innerHTML = '<hola-mundo></hola-mundo><adios-mundo></adios-mundo>';

  return element;
}

document.addEventListener("DOMContentLoaded", () => {
  //console.log(WebComponents)
  // eslint-disable-next-line no-undef
  WebComponents.waitFor(() => {
    // At this point we are guaranteed that all required polyfills have
    // loaded, and can use web components API's.
    // The standard pattern is to load element definitions that call
    // `customElements.define` here.
    // Note: returning the import's promise causes the custom elements
    // polyfill to wait until all definitions are loaded and then upgrade
    // the document in one batch, for better performance.
    import("COMPONENTS/HolaMundo");
    import("COMPONENTS/AdiosMundo");
  });
  document.body.appendChild(component());

})