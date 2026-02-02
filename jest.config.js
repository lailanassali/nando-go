module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(expo|expo-router|expo-modules-core|expo-constants|expo-asset|react-native|@react-native|@expo)/)",
  ],
};
