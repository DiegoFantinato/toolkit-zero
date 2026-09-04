import { RuleTester } from "eslint";
import quality from "../index.cjs";

const tester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

function lines(count) {
  return Array.from({ length: count }, (_, i) => `const v${i} = ${i};`).join("\n");
}

tester.run("max-lines", quality.rules["max-lines"], {
  valid: [
    { code: lines(10), filename: "src/domain/service.js", options: [{ max: 20 }] },
    { code: lines(30), filename: "src/domain/service.test.js", options: [{ max: 20 }] },
    { code: lines(30), filename: "src/generated/client.js", options: [{ max: 20 }] },
    { code: lines(30), filename: "src/types.ts", options: [{ max: 20 }] },
  ],
  invalid: [
    {
      code: lines(21),
      filename: "src/domain/service.js",
      options: [{ max: 20 }],
      errors: [{ messageId: "tooLong" }],
    },
  ],
});

tester.run("no-direct-console", quality.rules["no-direct-console"], {
  valid: [
    { code: "logger.info('ok')", filename: "src/app/a.js" },
    { code: "console.log('test')", filename: "src/app/a.test.js" },
    { code: "console.info('allowed')", filename: "src/app/a.js", options: [{ allow: ["info"] }] },
  ],
  invalid: [
    { code: "console.log('x')", filename: "src/app/a.js", errors: [{ messageId: "directConsole" }] },
    { code: "console['error']('x')", filename: "src/app/a.js", errors: [{ messageId: "directConsole" }] },
  ],
});

const dataOptions = [{ modules: ["@/db"], guardedLayers: ["app", "components"] }];

tester.run("no-direct-data-access", quality.rules["no-direct-data-access"], {
  valid: [
    { code: "import db from '@/db'", filename: "src/server/repository.js", options: dataOptions },
    { code: "import db from '@/db'", filename: "src/app/page.test.js", options: dataOptions },
    { code: "import api from '@/api'", filename: "src/app/page.js", options: dataOptions },
  ],
  invalid: [
    {
      code: "import db from '@/db'",
      filename: "src/app/page.js",
      options: dataOptions,
      errors: [{ messageId: "directDataAccess" }],
    },
    {
      code: "import { db as database } from '@/db'",
      filename: "src/components/card.js",
      options: dataOptions,
      errors: [{ messageId: "directDataAccess" }],
    },
  ],
});

console.log("TZ ESLint Quality Gates: verification passed");
