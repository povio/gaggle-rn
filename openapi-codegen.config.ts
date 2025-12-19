import type { OpenAPICodegenConfig } from "@povio/openapi-codegen-cli";

const config: OpenAPICodegenConfig = {
  // input: "openapi.json", // Local generated OpenAPI spec
  input: "https://gaggle.povio.dev/api/docs-json", // External deployed backend
  output: "./openapi",
  tsPath: "@/openapi",
  errorHandlingImportPath: "@/utils/vendor/error-handling",
  replaceOptionalWithNullish: true,
  infiniteQueries: true,
  standalone: true,
  acl: false,
};

export default config;
