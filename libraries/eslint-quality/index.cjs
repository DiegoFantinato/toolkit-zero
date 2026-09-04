"use strict";

module.exports = {
  rules: {
    "max-lines": require("./rules/max-lines.cjs"),
    "no-direct-console": require("./rules/no-direct-console.cjs"),
    "no-direct-data-access": require("./rules/no-direct-data-access.cjs"),
  },
};
