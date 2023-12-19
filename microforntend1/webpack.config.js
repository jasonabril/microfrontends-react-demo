import { ModuleFederationPlugin } from "webpack";

export default {
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3001/", // La URL pública de tu microfrontend
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
      name: "microfrontend1",
      library: { type: "var", name: "microfrontend1" },
      filename: "remoteEntry.js",
      exposes: {
        "./Microfrontend1App": "./src/Microfrontend1App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
