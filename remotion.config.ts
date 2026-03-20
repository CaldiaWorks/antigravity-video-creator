import { Config } from '@remotion/cli/config';

Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules
          ? currentConfiguration.module.rules.filter((rule) => {
              if (typeof rule === "object" && rule !== null && "test" in rule) {
                 if (rule.test instanceof RegExp && rule.test.toString().includes(".css")) {
                     return false;
                 }
              }
              return true;
            })
          : []),
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    "@tailwindcss/postcss",
                    "autoprefixer",
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  };
});
