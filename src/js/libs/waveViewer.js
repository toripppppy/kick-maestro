import WaveSurfer from "https://unpkg.com/wavesurfer.js/dist/wavesurfer.esm.js"
import RegionsPlugin from "https://unpkg.com/wavesurfer.js/dist/plugins/regions.esm.js"

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)',
  // 表示幅
  minPxPerSec: 250,
  // スクロールバーを非表示
  hideScrollbar: true,
  // 触れても何も起きない
  interact: false,
  // ノーマライズ
  normalize: true,
})

const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create())

// 音源の読み込み完了後に呼び出される
wavesurfer.on('decode', () => {
  // リージョン（マーカー）を全てクリアする
  wsRegions.clearRegions()
})

export class WaveViewer {
  constructor() {
    this.wavesurfer = wavesurfer;
    this.wsRegions = wsRegions;
  }

  setTime(time) {
    wavesurfer.setTime(time)
  }

  pause() {
  wavesurfer.pause()
  }

  play(time) {
    wavesurfer.setTime(time)
    wavesurfer.play()
  }

  placeMarker(text, time) {
    wsRegions.clearRegions()
    wsRegions.addRegion({
      start: time,
      content: text,
      color: "#cccccc",
    })
  }

  load(url) {
    wavesurfer.load(url);
  }
}