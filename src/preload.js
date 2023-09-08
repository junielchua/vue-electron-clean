console.log('preload loaded')
const { contextBridge, ipcRenderer } = require("electron")
const authController = require('./controllers/authentication')
const dbController = require('./controllers/db')


contextBridge.exposeInMainWorld('api', {
    authLogin: (creadentials) =>  { return authController.login(creadentials); },
    loadVersion: () => ipcRenderer.send('loadVersion'),
    sendVersion: (param) => ipcRenderer.on('sendVersion',param),
    getVersion: ()  => ipcRenderer.invoke('getVersion'),
    getDbVer: () => ipcRenderer.invoke('getDbVer'),
    syncDb: () => { return dbController.syncDatabase() },
    syncData: () => { return dbController.syncData() }
})