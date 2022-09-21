### Q： rollup-plugin-typescript2 报错 （

> Cannot read properties of undefined done

### A 修改 rollup.config.js 文件

```js
plugins: [
  json(),
  typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  })
]
```

再将 tsconfig.json 文件中的 module 配置修改成 es2020
