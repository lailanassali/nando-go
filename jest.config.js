module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-native-reanimated|expo(nent)?|@expo(nent)?/.*|@react-native/.*)",
  ],
};
