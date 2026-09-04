"use strict";

const { isTestFile } = require("../utils/file-classification.cjs");

const DEFAULT_METHODS = ["log", "info", "warn", "error", "debug", "trace", "table", "dir"];

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Prevent direct console usage in application source code." },
    schema: [
      {
        type: "object",
        properties: {
          allow: { type: "array", items: { type: "string" } },
          methods: { type: "array", items: { type: "string" } },
          includeTests: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      directConsole: "Use the project logging adapter instead of direct console.{{method}}().",
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const filename = context.getFilename();
    if (!options.includeTests && isTestFile(filename)) return {};

    const methods = new Set(options.methods || DEFAULT_METHODS);
    const allowed = new Set(options.allow || []);

    return {
      MemberExpression(node) {
        if (node.object?.type !== "Identifier" || node.object.name !== "console") return;

        let method = null;
        if (!node.computed && node.property?.type === "Identifier") method = node.property.name;
        if (node.computed && node.property?.type === "Literal" && typeof node.property.value === "string") {
          method = node.property.value;
        }

        if (!method || !methods.has(method) || allowed.has(method)) return;
        context.report({ node, messageId: "directConsole", data: { method } });
      },
    };
  },
};
