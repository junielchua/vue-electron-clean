console.log('preload loaded')
const { contextBridge, ipcRenderer } = require("electron")
const authController = require('./controllers/authentication')


contextBridge.exposeInMainWorld('api', {
    authLogin: (creadentials) =>  { return authController.login(creadentials); },
    loadVersion: () => ipcRenderer.send('loadVersion'),
    sendVersion: (param) => ipcRenderer.on('sendVersion',param),
    atestFunc: () => {
        return 'yesasdasdasd';
    }
})