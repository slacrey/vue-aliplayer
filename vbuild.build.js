module.exports = {
  entry: 'src/VueAliplayer.vue',
  // then user can access `window.Aliplayer` in browser as well
  moduleName: 'VueAliplayer',
  html: false,
  minimize: false,
  sourceMap: false,
  filename: {
    js: 'vue-aliplayer.js'
  },
  extract: false,
  // this will not copy ./static/** to ./dist/**
  copy: false
}
