import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
// import { baseUrl } from '../../api/service'
// import Recorder from 'js-audio-recorder'

const Record = forwardRef(({ onEnd, remote = true }, ref) => {
	const [rec, setRec] = useState(null)
	const [text, setText] = useState('')

	useImperativeHandle(ref, () => ({
		start: () => {
			startRec()
		},
		upload: () => {
			uploadRec()
		},
		stop: (fn) => {
			stopRec(fn)
		},
	}))

	const initRec = () => {
		// const recorder = new Recorder({
		// 	sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
		// 	sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
		// 	numChannels: 1
		// })	
		const recorder = new Recorder()
		setRec(recorder)
	}

	const startRec = () => {
		//打开麦克风授权获得相关资源
		rec.open(
			function () {
				//开始录音
				console.log('=======开始录音了========')
				rec.start()
			},
			function (msg, isUserNotAllow) {
				//用户拒绝了权限或浏览器不支持
				alert((isUserNotAllow ? '用户拒绝了权限，' : '') + '无法录音:' + msg)
			},
		)
	}

	const stopRec = (fn) => {
		rec.stop(
			async function (blob, duration) {
				fn(blob)
			},
			function (msg) {
				console.warn('录音失败:' + msg)
			},
		)
	}

	const uploadRec = () => {
		rec.stop(
			async function (blob, duration) {
				// todo
			},
			function (msg) {
				console.warn('录音失败:' + msg)
			},
		)
	}

	const handleUpload = (blob) => {
		// const form = new FormData()
		// form.append('file', blob, `${new Date().valueOf()}.mp3`)
		// //直接用ajax上传
		// const xhr = new XMLHttpRequest()
		// xhr.open('POST', `${baseUrl}/ai/audio_to_text/`)
		// xhr.onreadystatechange = function () {
		// 	if (xhr.readyState === 4) {
		// 		if (xhr.status === 200) {
		// 			const result = JSON.parse(xhr.responseText)
		// 			console.log('🚀 uploadRec ~ file: index.tsx:48 ~ result: 语音识别返回的文字', result)
		// 			const content = result.data.text
		// 			setText(content)
		// 			onEnd && onEnd(content)
		// 		}
		// 	}
		// }
		// xhr.send(form)
	}

	useEffect(() => {
		initRec()
	}, [])

	return <div></div>
})

export default Record
