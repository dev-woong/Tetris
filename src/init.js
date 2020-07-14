// import "./block.js"
const blockSize = 30

const color = {
  gray: "#7a7a7a", // Grid
  yellow: "#E39F02", // O
  red: "#D70F37", // Z
  green: "#59B101", // S
  blue: "#2141C6", // J
  orenge: "#E35B02", // L
  purple: "#AF298A", // T
  skyblue: "#0F9BD7", // I
  black: "#0c0d0c", // Back Ground
}

;(function () {
  let ctx = document.getElementById("myCanvas").getContext("2d")
  for (let i = 1; i < 10; i++) {
    ctx.moveTo(i * blockSize, 0)
    ctx.lineTo(i * blockSize, 600)
  }
  for (let i = 1; i < 20; i++) {
    ctx.moveTo(0, i * blockSize)
    ctx.lineTo(300, i * blockSize)
  }
  ctx.strokeStyle = color.gray
  ctx.stroke()
})()
// ;(function () {
//   initialize()
// })()
