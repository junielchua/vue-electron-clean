const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          {
            "provider": "github",
            "owner": "junielchua",
            "repo": "vue-electron-clean",
            "private": false
          }]
      }
    }
  }
})
