## 使用

## 开发

### 环境
1. node > 18
2. whisper 或者 Azure语音服务（用于语音控制）

### 语音配置

2.1 全局安装whisper

**windows:** `pip3 install -U openai-whisper`

**mac:** `brew install openai-whisper`

2.2 Azure语音服务

**windows:**
控制台
```
setx SPEECH_KEY your-key
setx SPEECH_REGION your-region
```

**mac:**
编辑 .zshrc 文件，然后添加环境变量：
```
export SPEECH_KEY=your-key
export SPEECH_REGION=your-region
```
制台窗口运行 source ~/.zshrc，生效(如果不生效，尝试重启电脑)

2.3 浏览器识别
使用浏览器自带的语音识别功能，体检极佳。需要外网

### 启动
> npm run start

## FAQ

1. 依赖网络安装不了？
- 使用代理 export http_proxy="http://localhost:7890" export https_proxy="http://localhost:7890"

2. electron安装不了？
- yarn config set electron_mirror https://npmmirror.com/mirrors/electron/

To run a local app, execute the following on the command line:
> node_modules/electron/dist/Electron.app/Contents/MacOS/Electron path-to-app
