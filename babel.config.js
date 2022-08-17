// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 1 version'],
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
      },
    ],
    ['@vue/cli-plugin-babel/preset'],
    ['@babel/preset-typescript'],
  ],
}
