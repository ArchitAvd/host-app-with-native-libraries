const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = {
  optimization: {
    splitChunks: false,
  },
  ...withModuleFederationPlugin({
    name: "host",

    shared: {
      ...shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      }),
    },
  }),
};
