const {app} = require('electron')
const {VRWindow} = require('electron-openvr')
const { Vector3, Matrix3x4 } = require('node-openvr/tools')

let win

app.disableHardwareAcceleration()

const createWindow = () => {
  win = new VRWindow({
    width: 1024,
    height: 1024,
    vr: {
      key: 'electronvr.sample',
      name: 'Hello VR!',
      fps: 45
    }
  })
  win.overlay.position = { x: 0, y: 0, z: -1 }
  win.loadFile('./app/index.html')

  const pos = new Vector3(0, 0, -1)
  let t = 0
  setInterval(() => {
    const mat = Matrix3x4.fromTransform({
      T: pos,
      R: new Vector3(Math.sin(t), Math.cos(t), t)
    })

    // console.log({d: mat.data})

    t += 0.01
    // console.log({mat})
    win.overlay.transformTrackedDeviceRelativeMatrix(0, mat.data)
  }, 33)
}

app.on('ready', createWindow)
