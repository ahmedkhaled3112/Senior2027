/** Architecture rules for after/src. Each rule is proved by a planted violation in scripts/arch-prove.mjs. */
const SRC = "^after/src";
module.exports = {
  forbidden: [
    {
      name: "domain-stays-pure",
      comment: "domain imports only its own domain and shared",
      severity: "error",
      from: { path: `${SRC}/modules/[^/]+/domain` },
      to: { pathNot: [`${SRC}/modules/[^/]+/domain`, `${SRC}/shared`] },
    },
    {
      name: "application-not-to-outer-layers",
      severity: "error",
      from: { path: `${SRC}/modules/[^/]+/application` },
      to: { path: `${SRC}/modules/[^/]+/(infrastructure|presentation)` },
    },
    {
      name: "no-reaching-into-other-modules",
      comment: "a module may import another module only through its index.ts",
      severity: "error",
      from: { path: `${SRC}/modules/([^/]+)/` },
      to: { path: `${SRC}/modules/([^/]+)/.+`, pathNot: [`${SRC}/modules/$1/`, `${SRC}/modules/[^/]+/index[.]ts$`] },
    },
    {
      name: "nothing-outside-root-sees-internals",
      comment: "the composition root also goes through each module's index.ts",
      severity: "error",
      from: { path: `${SRC}/composition-root` },
      to: { path: `${SRC}/modules/[^/]+/.+`, pathNot: `${SRC}/modules/[^/]+/index[.]ts$` },
    },
    {
      name: "shared-knows-no-module",
      severity: "error",
      from: { path: `${SRC}/shared` },
      to: { path: `${SRC}/modules` },
    },
    {
      name: "domain-has-no-path-to-infrastructure",
      comment: "catches laundering through a barrel, which a direct-import rule misses",
      severity: "error",
      from: { path: `${SRC}/modules/[^/]+/domain` },
      to: { path: `${SRC}/modules/[^/]+/infrastructure`, reachable: true },
    },
    { name: "no-cycles", severity: "error", from: {}, to: { circular: true } },
  ],
  options: {
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
    doNotFollow: { path: "node_modules" },
    // no includeOnly here: it would hide npm packages from the graph, and a domain file importing pg would pass.
    // arch-prove.mjs caught exactly that in the first version of this config.
  },
};
