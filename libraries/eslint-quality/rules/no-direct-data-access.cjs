"use strict";

const { hasPathSegment, normalizeFilePath } = require("../utils/path-utils.cjs");
const { isTestFile } = require("../utils/file-classification.cjs");

function importedBindings(node) {
  return node.specifiers
    .map((specifier) => specifier.local && specifier.local.name)
    .filter(Boolean);
}

module.exports = {
  meta: {
    type: "problem",
    docs: { description: "Prevent presentation/application layers from importing configured data-access modules directly." },
    schema: [
      {
        type: "object",
        required: ["modules", "guardedLayers"],
        properties: {
          modules: { type: "array", minItems: 1, items: { type: "string" } },
          guardedLayers: { type: "array", minItems: 1, items: { type: "string" } },
          allowedBindings: { type: "array", items: { type: "string" } },
          allowedExtensions: { type: "array", items: { type: "string" } },
          includeTests: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      directDataAccess: "Layer '{{layer}}' must not import data-access module '{{module}}' directly. Use an approved repository/service/adapter boundary.",
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const filename = normalizeFilePath(context.getFilename());
    if (!options.includeTests && isTestFile(filename)) return {};

    const modules = new Set(options.modules || []);
    const allowedBindings = new Set(options.allowedBindings || []);
    const allowedExtensions = options.allowedExtensions || [];
    const matchedLayer = (options.guardedLayers || []).find((layer) => hasPathSegment(filename, layer));

    if (!matchedLayer) return {};
    if (allowedExtensions.some((ext) => filename.endsWith(ext))) return {};

    return {
      ImportDeclaration(node) {
        const source = typeof node.source?.value === "string" ? node.source.value : null;
        if (!source || !modules.has(source)) return;

        const bindings = importedBindings(node);
        if (bindings.length > 0 && bindings.every((binding) => allowedBindings.has(binding))) return;

        context.report({
          node,
          messageId: "directDataAccess",
          data: { layer: matchedLayer, module: source },
        });
      },
    };
  },
};
