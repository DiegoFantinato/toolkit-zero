"use strict";

const {
  DEFAULT_MAX_LINES,
  isBaselineIgnored,
  isCheckableSourceFile,
  isTestFile,
} = require("../utils/file-classification.cjs");

module.exports = {
  meta: {
    type: "suggestion",
    docs: { description: "Limit source file size to encourage modular responsibilities." },
    schema: [
      {
        type: "object",
        properties: {
          max: { type: "integer", minimum: 1 },
          includeTests: { type: "boolean" },
          ignore: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooLong: "File has {{actual}} lines; configured maximum is {{max}}. Refactor by responsibility, not by arbitrary line splitting.",
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const max = options.max || DEFAULT_MAX_LINES;
    const includeTests = Boolean(options.includeTests);
    const filename = context.getFilename();

    return {
      Program(node) {
        if (!isCheckableSourceFile(filename)) return;
        if (!includeTests && isTestFile(filename)) return;
        if (isBaselineIgnored(filename, options.ignore)) return;

        const actual = context.getSourceCode().lines.length;
        if (actual > max) {
          context.report({ node, messageId: "tooLong", data: { actual, max } });
        }
      },
    };
  },
};
