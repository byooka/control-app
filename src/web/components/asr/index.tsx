import { CustomerServiceOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Dropdown, Tooltip } from 'antd'
import Record from './record'
import Speech from './speech-recognition'
import AudioRTC from './RecordRTC'
import { convertBlobToWav, blobToBase64 } from '@utils/audio'

enum RECO_MODE {
  'browser' = 'browser',
  'local' = 'local',
  'server' = 'server',
}

const audioRTC = new AudioRTC()

const Asr = ({ position, app }) => {
  const [pos, setPos] = useState({})
  const [dragData, setDragData] = useState({})
  const [isRecording, setIsRecording] = useState(false)
  const [mode, setMode] = useState(RECO_MODE.browser)

  const srRef = useRef(null)
  const recordRef = useRef(null)

  const handleDragStart = e => {
    console.log('🚀 ~ file: index.tsx:198 ~ handleMouseDown ~ e:', e)
    const { clientX, clientY } = e
    setDragData({ clientX, clientY })
  }

  const handleDrag = e => {}

  const handleDragEnd = e => {
    const { clientX, clientY } = e
    const moveX = clientX - dragData.clientX
    const moveY = clientY - dragData.clientY
    const newPosition = {
      ...pos,
      top: +pos.top.match(/\d/g).join('') + moveY + 'px',
      left: +pos.left.match(/\d/g).join('') + moveX + 'px',
    }
    setPos(newPosition)
  }

  const handleItemClick = (e, mode) => {
    e.stopPropagation()
    setMode(mode)
    setIsRecording(true)
    startRecording(mode)
  }

  const startRecording = m => {
    if (m === RECO_MODE.browser) {
      srRef.current?.start()
    } else {
      // recordRef.current?.start()
      audioRTC.startRecording()
    }
  }

  const handleClick = async () => {
    if (!isRecording) return

    if (mode === RECO_MODE.browser) {
      // TODO
    } else {
      await audioRTC.stopRecording()
      // 获取 wav 格式的 blob
      const waveBlob = await audioRTC.getWaveBlob()
      const base64Data = await blobToBase64(waveBlob)
      const result = await window.electronAPI.audioControl.send(app, base64Data, mode)
      console.log('result', result)
    }

    setIsRecording(false)
  }

  const speechEnd = text => {
    setIsRecording(false)
  }

  useEffect(() => {
    window.electronAPI.audioControl.receive(data => {
      console.log(data)
    })
  }, [])

  useEffect(() => {
    if (position) {
      const { x, y, w, h } = position
      setPos({
        position: 'fixed',
        zIndex: '999',
        top: x,
        left: y,
        width: w,
        height: h,
      })
    }
  }, [position])

  return (
    <div
      style={pos}
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: <span onClick={e => handleItemClick(e, 'server')}>[在线] 远程识别</span>,
            },
            {
              key: '2',
              label: <span onClick={e => handleItemClick(e, 'local')}>[离线] 本地识别</span>,
            },
            {
              key: '3',
              label: <span onClick={e => handleItemClick(e, 'browser')}>[外网] 浏览器识别</span>,
            },
          ],
        }}
        placement="bottomRight"
      >
        <Button shape="circle" type="primary" icon={isRecording ? <LoadingOutlined /> : <CustomerServiceOutlined />} />
      </Dropdown>

      {/* {mode === RECO_MODE.browser ? <Speech ref={srRef} onEnd={speechEnd}/> : <Record ref={recordRef} />} */}
      {mode === RECO_MODE.browser && <Speech ref={srRef} onEnd={speechEnd} />}
    </div>
  )
}

export default Asr
