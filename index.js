const {app} = require('electron')
const {VRWindow} = require('electron-openvr')

let win

const createWindow = () => {
  win = new VRWindow({width: 1024,
    height: 1024,
    vr: {
      key: 'electronvr.sample',
      name: 'Hello VR!',
      fps: 45
    }
  })
  win.loadFile('./app/index.html')
}

app.on('ready', createWindow)
