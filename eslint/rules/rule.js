/**
 * @fileoverview Description
 * @author Aleix Masague
 */
"use strict";
//var CLIEngine = require("eslint").CLIEngine;
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: "Description",
      category: "Fill me in",
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function (context) {
    console.log(context);
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    /* var cli = new CLIEngine({
            envs: ["browser", "mocha"],
            useEslintrc: false,
            rules: {
                semi: 2
            }
        });
        var messages = cli.executeOnText("var foo = 'bar';", "foo.js");
        console.log(messages)*/

    return {
      // give me methods
    };
  },
};
