module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'my_new_app',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './scripts/main/webpack.config.prod.js',
        renderer: {
          config: './scripts/render/webpack.config.prod.js',
          entryPoints: [
            {
              html: './src/render/index.html',
              js: './src/render/index.ts',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
}
