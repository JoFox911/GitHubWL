import { Service } from './base.service'

class SoundsService extends Service {
  // sounds names from audio folder
  SOUNDS_LIST = {
    BACKGROUND_THEME: 'background-theme',
    EGG_CRACKING: 'egg-cracking'
  }

  constructor () {
    super()
    // Base path that contains all the available sound files
    this.basePath = 'audio/'

    // sound object, which contains HTML Audio elements responsible for playback
    this.soundObjects = {}
  }

  playSound (filename, loop = false, volume = 1) {
    const sound = this.getOrCreateAudioElement(filename)
    sound.loop = loop
    sound.volume = volume

    // Load and play the file
    sound.load()
    sound.play()
  }

  stopSound (fileName) {
    if (this.soundObjects[fileName]) {
      this.soundObjects[fileName].pause()
    }
  }

  getOrCreateAudioElement (fileName) {
    if (Object.keys(this.soundObjects).includes(fileName)) {
      return this.soundObjects[fileName]
    }
    // create a new audio element for playback
    const audio = new Audio()
    // determine the user browser supported file extension
    let extension
    if (audio.canPlayType('audio/mpeg')) {
      extension = '.mp3'
    } else {
      extension = audio.canPlayType('audio/ogg') ? '.ogg' : ''
    }
    // restore full path to file
    const filePath = this.basePath + fileName + extension

    audio.onerror = () => {
      console.error(audio.error.message)
    }

    // set file source
    audio.src = filePath
    this.soundObjects[fileName] = audio
    return audio
  }

  playBackgroundSound (loop = true, volume = 0.02) {
    this.playSound(this.SOUNDS_LIST.BACKGROUND_THEME, loop, volume)
  }

  stopBackgroundSound () {
    this.stopSound(this.SOUNDS_LIST.BACKGROUND_THEME)
  }
  
  playEggCrackingSound (loop = false, volume = 1) {
    this.playSound(this.SOUNDS_LIST.EGG_CRACKING, loop, volume)
  }
}
export default new SoundsService()
