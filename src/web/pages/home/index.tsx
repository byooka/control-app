import { appConfig } from '@utils/const'
import { Button, Flex, Tag, Dropdown, Col, Row, Drawer } from 'antd'
import cs from 'classnames'
import Asr from '@components/asr'
import { App } from '@utils/const'
import CodeEditor from '@/web/components/code-editor'
import { contextBridge, ipcRenderer } from 'electron/renderer'

import styles from './index.module.styl'

enum DrawerType {
  SCRIPT = 'SCRIPT'
}


const Apps = () => {
  const [activeApp, setActiveApp] = useState<App[]>(appConfig[0])
  const [open, setOpen] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')

  const changeApp = (app: App) => {
    setActiveApp(app)
  }

  const handleCommand = (appKey: string, order: string) => {
    window.electronAPI.controlApp(appKey, order)
  }

  const renderOptions = (app: App) => {
    const { key, command = [] } = app
    const showCommand = command.slice(0, 3)
    const moreCommand = command.slice(3)
    const moreMenu = moreCommand.map((m, idx) => {
      return {
        key: idx,
        label: (
          <Tag color="orange" onClick={() => handleCommand(key, m.value)}>
            {m.label}
          </Tag>
        ),
      }
    })
    return (
      <>
        {showCommand.map((s, idx) => {
          return (
            <Tag key={idx} color="magenta" onClick={() => handleCommand(key, s.value)}>
              {s.label}
            </Tag>
          )
        })}
        {moreCommand?.length > 0 && (
          <Dropdown menu={{ items: moreMenu }}>
            <Tag color="orange">更多..</Tag>
          </Dropdown>
        )}
      </>
    )
  }

   const handleDrawer = async (id: string, type: string) => {
    const result = await window.electronAPI.request({
      api: '/v2/getDefaultScript',
      params: {
        scriptId: id
      }
    })
    console.log('res----', result)
    setCode(result)
    setOpen(true)
   }

  useEffect(() => {
    window.onmessage = (event) => {
      // event.source === window 意味着消息来自预加载脚本
      // 而不是来自iframe或其他来源
      if (event.source === window && event.data === 'main-world-port') {
        const [ client ] = event.ports
        // 一旦我们有了这个端口，我们就可以直接与主进程通信
        client.onmessage = (event) => {
          console.log('from main process:', event.data)
          client.postMessage(event.data.test * 2)
        }
      }
    }
  }, [])

  return (
    <div className={styles.app}>
      <Asr
        position={{ x: '80px', y: '210px', w: '36px', h: '36px' }}
        app={activeApp}
      />
      {appConfig.map(a => {
        return (
          <div
            key={a.key}
            className={cs(styles.website, {
              [styles.active]: activeApp.key === a.key,
            })}
            onClick={() => changeApp(a)}
          >
            <div className={styles.top}>
              <div className={styles.name}>{a.name}</div>
              <div className={styles.auto}>
                <Button className={styles.login} size="small" type="primary">
                  自动登录
                </Button>
                <Button size="small" type="dashed" onClick={() => handleDrawer(a.script.id, 'SCRIPT')}>
                  脚本
                </Button>
              </div>
            </div>
            <div className={styles.options}>
              <Flex gap="4px 0" wrap>
                {renderOptions(a)}
              </Flex>
            </div>
          </div>
        )
      })}

      <Drawer title="脚本" size='large' onClose={() => setOpen(false)} open={open}>
        <CodeEditor code={code} />
      </Drawer>
    </div>
  )
}

export default Apps
