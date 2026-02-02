const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,

  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "jest.setup.js"],
    env: {
      jest: true,
    },
  },

  {
    ignores: ["dist/*"],
  },
]);
