// import { ConfigFile } from "@rtk-query/codegen-openapi";

const config = {
  schemaFile: "./swagger.json",
  apiFile: "./src/state/apiSlice.ts",
  apiImport: "apiSlice",
  outputFile: "./src/state/apiAutogen.ts",
  exportName: "apiAutogen",
  hooks: true,
};

module.exports = config;
