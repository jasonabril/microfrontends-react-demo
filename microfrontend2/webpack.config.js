import { ModuleFederationPlugin } from "webpack";

export default {
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3002/", // La URL pública de tu microfrontend
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "microfrontend2",
      library: { type: "var", name: "microfrontend2" },
      filename: "remoteEntry.js",
      exposes: {
        "./Microfrontend2App": "./src/Microfrontend2App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
