import quality from "../index.cjs";

export function createBaseQualityPreset(options = {}) {
  const maxLines = options.maxLines ?? 350;
  const includeTests = options.includeTests ?? false;

  return {
    plugins: { quality },
    rules: {
      "quality/max-lines": ["warn", { max: maxLines, includeTests }],
      "quality/no-direct-console": ["error", { includeTests: false }],
    },
  };
}

export default createBaseQualityPreset();
