import type { OpenAPICodegenConfig } from "@povio/openapi-codegen-cli";

const config: OpenAPICodegenConfig = {
  // input: "openapi.json", // Local generated OpenAPI spec
  input: "https://api.dev.pov.io/api/docs-json", // External deployed backend
  output: "./openapi",
  tsPath: "@/openapi",
  errorHandlingImportPath: "@/utils/vendor/error-handling",
  replaceOptionalWithNullish: true,
  infiniteQueries: true,
  standalone: true,
  acl: false,
};

export default config;
