import { app, BrowserWindow, ipcMain, shell, nativeTheme, MessageChannelMain } from 'electron'
import path from 'path'
import fs from 'node:fs'
import { spawn } from 'child_process'
import { App } from '@utils/const'
import Control from './control'
import Net from './core/Net'
import Server from './server/index'

let control: Control, net: Net, server: Server
const TEMP_PATH = path.join(__dirname, '../../src/_temp/')
const SCRIPT_PATH = path.join(__dirname, '../../src/control/')
const OUTPUT_FILE_NAME = 'output'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const handleControl = (appKey: string, order: string) => {
  if (!control) {
    control = new Control(appKey, order)
  } else {
    if (order === 'open') {
      control.changeApp(appKey)
    } else {
      control.command(order)
    }
  }
}

const getAudioOrder = (app: App, data: string) => {
  return app.command.find(c => c.label === data)?.value
}

const audioControlApp = (app: App, text: string) => {
  const order = getAudioOrder(app, text)
  handleControl(app.key, order)
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  mainWindow.maximize()

  net = new Net()
  server = new Server()

  // const result = await net.fetch('https://infinity-api.infinitynewtab.com/get-icons')

  ipcMain.on('change-theme', async (event, theme) => {
    nativeTheme.themeSource = theme
  })

  ipcMain.on('control-app', async (event, appKey, order) => {
    const webContents = event.sender
    const mainWindow = BrowserWindow.fromWebContents(webContents)
    mainWindow.setTitle(`${appKey}_control`)

    handleControl(appKey, order)
  })

  ipcMain.handle('audio-control:send', async (event, app, blob, mode) => {
    const dataBuffer = new Buffer(blob.replace(/^data:audio\/\w+;base64,/, ''), 'base64')

    const savePath = TEMP_PATH + OUTPUT_FILE_NAME + '.wav'
    console.log('path', savePath)
    fs.writeFileSync(savePath, dataBuffer)

    let text
    if (mode === 'local') {
      const p = spawn('whisper', [savePath, '--language', 'zh', '--model', 'medium', '-f', 'txt', '-o', TEMP_PATH])
      p.stdout.on('data', data => {
        // const result = data.match(/[\u4e00-\u9fa5]+/g)
        text = fs.readFileSync(TEMP_PATH + OUTPUT_FILE_NAME + '.txt', 'utf8')
        console.log('------------------local', text)

        mainWindow.webContents.send('audio-control:receive', text)
        return text
      })
    } else {
      server.postAudio(savePath, (text) => {
        text = text.match(/[\u4e00-\u9fa5]+/g)[0]
        console.log('------------------server', text)
      })
    }

    audioControlApp(app, text)
    
  })

  ipcMain.handle('request', async (event, req) => {
    console.log('req---', req)
    const { api, params } = req

    if (api === '/v2/getDefaultScript') {
      const filename = `${SCRIPT_PATH}${params.scriptId}.ts`
      return await server.getDefaultScriptCode(filename)
    } else if (api === '/v2/postAudio') {
      // todo
    }
  })


  // // We'll be sending one end of this channel to the main world of the
  // // context-isolated page.
  // const { port1: client, port2: server } = new MessageChannelMain()
  // // 允许在另一端还没有注册监听器的情况下就通过通道向其发送消息 消息将排队等待，直到有一个监听器注册为止。
  // server.postMessage({ test: 21 })
  // // 我们也可以接收来自渲染器主进程的消息。
  // server.on('message', event => {
  //   console.log('from client:', event.data)
  // })
  // server.start()
  // // 预加载脚本将接收此 IPC 消息并将端口
  // // 传输到主进程。
  // mainWindow.webContents.postMessage('main-world-port', null, [client])

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.commandLine.appendSwitch('remote-debugging-port', '8315')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on('web-contents-created', (e, webContents) => {
  // 禁用window.open打开窗口
  webContents.setWindowOpenHandler(details => {
    console.log('禁用window.open', details)
    shell.openExternal(details.url || '')
    return { action: 'deny' }
  })
})
