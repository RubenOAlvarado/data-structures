import { dirname, join } from "node:path";
import { defineConfig } from "vitest/config";

// `npm run test:solution` runs Vitest with `--mode solution`. In that mode every
// `./starter` import is redirected to the sibling `solution.ts`, so the same tests
// validate both the learner's starter and the reference solution.
const useSolution = {
  name: "use-solution",
  enforce: "pre" as const,
  resolveId(source: string, importer: string | undefined) {
    if (importer !== undefined && /^\.\/starter(\.[jt]s)?$/.test(source)) {
      return join(dirname(importer), "solution.ts");
    }
    return null;
  },
};

export default defineConfig(({ mode }) => ({
  plugins: mode === "solution" ? [useSolution] : [],
  test: {
    include: ["src/**/*.test.ts"],
  },
}));
