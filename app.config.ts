import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Gaggle - Families",
  slug: "gaggle",
  scheme: "gaggle",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.flock.team.app",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.flock.team.app",
  },
  extra: {
    eas: {
      projectId: "b27c9db0-d9a2-49cf-929d-a15589bc5149",
    },
  },
  owner: "gaggle",
  experiments: {
    tsconfigPaths: true,
    reactCompiler: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-font",
    "expo-router",
    "expo-secure-store",
    // If you are using EAS Build, you can set the environment variable by creating a secret named SENTRY_AUTH_TOKEN.
    // [
    //  "@sentry/react-native/expo",
    //  {
    //    organization: process.env.SENTRY_ORG,
    //    project: process.env.SENTRY_PROJECT,
    //  },
    // ]
  ],
};

export default config;
