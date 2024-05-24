export function convertBlobToWav(blob) {
  const reader = new FileReader();
  reader.onload = function() {
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(reader.result, function(decodedData) {
      const wavBlob = encodeWav(decodedData);
      downloadWav(wavBlob);
    });
  };
  reader.readAsArrayBuffer(blob);
}

function encodeWav(audioBuffer) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const bitsPerSample = 16;
  const blockAlign = numChannels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;

  const buffer = new ArrayBuffer(44 + audioBuffer.length * blockAlign);
  const view = new DataView(buffer);

  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + audioBuffer.length * blockAlign, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, audioBuffer.length * blockAlign, true);

  // Audio data
  floatTo16BitPCM(view, 44, audioBuffer.getChannelData(0));

  if (numChannels > 1) {
    floatTo16BitPCM(view, 44 + audioBuffer.length * blockAlign, audioBuffer.getChannelData(1));
  }

  return new Blob([view], {type: 'audio/wav'});
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function downloadWav(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'audio.wav';
  document.body.appendChild(a);
}

export function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.onload = (e) => {
			resolve(e.target.result)
		}
		// readAsDataURL
		fileReader.readAsDataURL(blob)
		fileReader.onerror = () => {
			reject(new Error('blobToBase64 error'))
		}
	})
}