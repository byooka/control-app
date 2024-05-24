import { Button } from 'antd'
import { AudioOutlined, LoadingOutlined } from '@ant-design/icons'

import styles from './index.module.styl'

let resultFlag = false

const Speech = forwardRef(({ showMsg = false, mini = true, onEnd }, ref) => {
  const [message, setMessage] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const [speechRecognition, setSpeechRecognition] = useState()

  useImperativeHandle(ref, () => ({
    start: () => {
      handleStart()
    },
  }))

  const handleRecognitionResult = useCallback(event => {
    console.log('result', event)
    const text = event.results[0][0].transcript
    setMessage(text)

    if (event.results[0].isFinal) {
      console.log(
        '🚀 ~ file: index.tsx:25 ~ handleRecognitionResult ~ audio_to_text---语音识别出的文字:',
        text
      )
      setMessage(text)
      onEnd && onEnd(text)

      resultFlag = true
    }
  }, [])

  const handleRecognitionEnd = useCallback(
    event => {
      console.log('end', event)
      setIsRecording(false)

      // 没有说明没有说话，返回一个空，好走屏幕识别
      if (!resultFlag) {
        onEnd && onEnd('')
      }
    },
    [message]
  )

  const handleStart = (sr?) => {
    const reco = sr ?? speechRecognition
    console.log('reco', reco)
    if (isRecording) {
      reco?.abort()
      setIsRecording(false)

      return
    }
    reco?.start()
    setIsRecording(true)
  }

  const init = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    // recognition.lang = 'en-EN';
    // 设置所识别的语言
    recognition.lang = 'zh-CN'
    // 是否返回未确定的结果
    recognition.interimResults = true
    // 是否返回连续结果
    recognition.continuous = false

    recognition.addEventListener('result', handleRecognitionResult)
    recognition.addEventListener('end', handleRecognitionEnd)

    setSpeechRecognition(recognition)

    return recognition
  }

  useEffect(() => {
    init()
  }, [handleRecognitionResult, handleRecognitionEnd])

  return (
    <div className={styles.container}>
      {showMsg && <div className={styles.message}>{message}</div>}
      {!mini && (
        <Button onClick={() => handleStart()}>
          {isRecording ? <LoadingOutlined /> : <AudioOutlined />}
        </Button>
      )}
    </div>
  )
})

export default Speech
