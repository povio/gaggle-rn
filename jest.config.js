module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { caller: { preserveEnvVars: true } }],
    "^.+\\.(ts|tsx)?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-native-animatable|react-native-reanimated|react-clone-referenced-element|@react-native-picker|axios|@react-native-community|react-native-gesture-handler|expo(nent)?|@expo(nent)?/.*|@react-native*|@react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|i18n-js)",
  ],
  testPathIgnorePatterns: [],
  coveragePathIgnorePatterns: [],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "@/assets/icons/(.*)$": "<rootDir>/assets/icons/$1.tsx",
  },
};
