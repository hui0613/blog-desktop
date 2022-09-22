

const {series} = require('gulp')
const {rollup} = require('rollup')
const fs= require('fs-extra')
const path = require('path')

const rollupConfig = require('./rollup.config.js')

async function cleanMainOut(){
  fs.removeSync(path.resolve(__dirname, '../out/main'))
}

async function compilerMainByRollup(){
  let inputOption = []
  let outputOption = []

  if(Array.isArray(rollupConfig)){
    rollupConfig.forEach(item=>{
      inputOption.push({
        input: item.input,
        plugins: item.plugins
      })
      outputOption.push(item.output)
    })
  }

  inputOption.forEach(async (item, index)=>{
    const bundle = await rollup(item)

    if(Array.isArray(outputOption[index])){
      outputOption[index].forEach(async outputItem=>{
        await bundle.write(outputItem)
      })
    }else{
      await bundle.write(outputOption[index])
    }
  })
}

const buildMain = series(cleanMainOut, compilerMainByRollup)

const build = series(buildMain)

exports.default = build


