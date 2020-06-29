const blockSize = 30

let blockSts = {
  x: 0,
  y: 0,
  rotate: 0,
}

const color = {
  gray: "#7a7a7a",
  red: "#D70F37",
  green: "#59B101",
  yellow: "#E39F02",
  skyblue: "#0F9BD7",
  blue: "#2141C6",
  orenge: "#E35B02",
  black: "#0c0d0c",
}

const keyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
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

const drawBlock = (row, col, color) => {
  let ctx = document.getElementById("myCanvas").getContext("2d")
  ctx.fillStyle = color
  ctx.fillRect(row * blockSize + 1, col * blockSize + 1, blockSize - 2, blockSize - 2)
}

//key event
onkeydown = function () {
  if (event.keyCode == keyCode.left) {
    drawBlock(0, 0, color.orenge)
  } else if (event.keyCode == keyCode.up) {
    drawBlock(0, 0, color.blue)
  } else if (event.keyCode == keyCode.right) {
    drawBlock(0, 0, color.skyblue)
  } else if (event.keyCode == keyCode.down) {
    moveDown(blockSts.x, blockSts.y)
  }
}

const createBlock = (positionX, positionY) => {
  drawBlock(positionX, positionY, color.yellow)
  drawBlock(positionX + 1, positionY, color.yellow)
  drawBlock(positionX, positionY + 1, color.yellow)
  drawBlock(positionX + 1, positionY + 1, color.yellow)
}

const moveDown = (positionX, positionY) => {
  drawBlock(positionX, positionY, color.black)
  drawBlock(positionX + 1, positionY, color.black)
  drawBlock(positionX, positionY + 2, color.yellow)
  drawBlock(positionX + 1, positionY + 2, color.yellow)
  blockSts.y++
}

;(function () {
  blockSts.x = 4
  createBlock(blockSts.x, blockSts.y)
})()
