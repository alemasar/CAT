"use strict";
console.log("PROCESSOR FILE");
function preprocess(text, filename) {
  const posStyle = text.indexOf("<style>");
  const endPosStyle = text.indexOf("</style>");
  const codeStyle = text.substring(posStyle, endPosStyle);
  text = text.replace(codeStyle, "");
  text = text.replace("</style>", "");
  const posTemplate = text.indexOf("<template>");
  const endPosTemplate = text.indexOf("</template>");
  let codeTemplate = text.substring(posTemplate, endPosTemplate);
  codeTemplate = codeTemplate.replace("</template>", "");
  text = text.replace(codeTemplate, "");
  text = text.replace("</template>", "");
  console.log(text);

  return [
    // return an array of code blocks to lint
    //CLIEngine.getErrorResults(messages.results)
    { text: text, filename: "0.js" },
    { text: codeTemplate, filename: "0.html" },
  ];
}

function postprocess(messages, filename) {
  // `messages` argument contains two-dimensional array of Message objects
  // where each top-level array item contains array of lint messages related
  // to the text that was returned in array from preprocess() method

  // you need to return a one-dimensional array of the messages you want to keep
  console.log(messages);
  return [].concat(...messages);
}

module.exports = {
  preprocess,
  postprocess,
  supportsAutofix: true,
};
