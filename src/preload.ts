// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  controlApp: (appKey: string, order: string) => ipcRenderer.send('control-app', appKey, order),

  changeTheme: (theme: string) => ipcRenderer.send('change-theme', theme),

  request: (data) => ipcRenderer.invoke('request', data),

  asr: () => ipcRenderer.send('asr'),

  audioControl: {
    send: (app, blob, mode) => ipcRenderer.invoke('audio-control:send', app, blob, mode),
    receive: callback => ipcRenderer.on('audio-control:receive', (_event, value) => callback(value)),
  },
})