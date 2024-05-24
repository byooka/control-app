import fs from 'node:fs'
import sdk from 'microsoft-cognitiveservices-speech-sdk'

export default class Server {
  async getDefaultScriptCode(filepath: string) {
    return await fs.readFileSync(filepath, 'utf8')
  }

  async postAudio(filepath: string, callback) {
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION)
    speechConfig.speechRecognitionLanguage = 'zh-CN'

    const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(filepath))
    const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

    speechRecognizer.recognizeOnceAsync(result => {
      switch (result.reason) {
        case sdk.ResultReason.RecognizedSpeech:
          console.log(`RECOGNIZED: Text=${result.text}`)
          callback(result.text)
          break
        case sdk.ResultReason.NoMatch:
          console.log('NOMATCH: Speech could not be recognized.')
          break
        case sdk.ResultReason.Canceled:
          const cancellation = sdk.CancellationDetails.fromResult(result)
          console.log(`CANCELED: Reason=${cancellation.reason}`)

          if (cancellation.reason == sdk.CancellationReason.Error) {
            console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`)
            console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`)
            console.log('CANCELED: Did you set the speech resource key and region values?')
          }
          break
      }
      speechRecognizer.close()
    })
  }
}
