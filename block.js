const blockSize = 30

let blockSts = {
  x: 0,
  y: 0,
  rotatoin: 0,
  type: "O",
}

let status = {
  score: 0,
  start: false,
  level: 1,
  speed: 1000,
}

const randomBlock = () => {
  let rand = Math.floor(Math.random() * 7)
  if (rand === 0) {
    blockSts.type = "O"
  } else if (rand === 1) {
    blockSts.type = "Z"
  } else if (rand === 2) {
    blockSts.type = "S"
  } else if (rand === 3) {
    blockSts.type = "J"
  } else if (rand === 4) {
    blockSts.type = "L"
  } else if (rand === 5) {
    blockSts.type = "T"
  } else {
    blockSts.type = "I"
  }
}

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

const blockColor = {
  O: color.yellow,
  Z: color.red,
  S: color.green,
  J: color.blue,
  L: color.orenge,
  T: color.purple,
  I: color.skyblue,
}

const initialize = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      drawBlock(i, j, color.black)
    }
  }
  status.score = 0
  status.level = 1
  status.speed = 1000
  document.getElementsByClassName("viewPhraseGameOver")[0].style.display = "none"
  clearInterval(startTimeout)
  startTimeout = setInterval(downBlock, status.speed)
}

const drawBlock = (row, col, color) => {
  let ctx = document.getElementById("myCanvas").getContext("2d")
  ctx.fillStyle = color
  ctx.fillRect(row * blockSize + 1, col * blockSize + 1, blockSize - 2, blockSize - 2)
}

const isBlockBlack = function (row, col) {
  let ctx = document.getElementById("myCanvas").getContext("2d")
  let tempColor = ctx.getImageData(row * blockSize + 1, col * blockSize + 1, 1, 1).data
  return tempColor[0] === 12 && tempColor[1] === 13 && tempColor[2] === 12
}

const createBlock = () => {
  blockSts.x = 4
  blockSts.y = 0
  blockSts.rotatoin = 0

  randomBlock()
  moveBlock(blockSts.x, blockSts.y, 1, blockSts.type)
  if (noObstacleBelow() === false) {
    gameOver()
  }
}

const downBlock = () => {
  if (status.start === true) {
    if (noObstacleBelow()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.y++
      moveBlock(blockSts.x, blockSts.y, 1)
    } else {
      deleteLine()
      createBlock()
    }
  }
}

let startTimeout = setInterval(downBlock, status.speed)

const gameOver = () => {
  status.start = false
  document.getElementsByClassName("viewPhraseGameOver")[0].style.display = "block"
}

const moveBlock = (row, col, moveAfter) => {
  const type = blockSts.type
  if (type === "O") {
    block_O(row, col, moveAfter)
  } else if (type === "Z") {
    block_Z(row, col, moveAfter)
  } else if (type === "S") {
    block_S(row, col, moveAfter)
  } else if (type === "J") {
    block_J(row, col, moveAfter)
  } else if (type === "L") {
    block_L(row, col, moveAfter)
  } else if (type === "T") {
    block_T(row, col, moveAfter)
  } else if (type === "I") {
    block_I(row, col, moveAfter)
  }
}

const dropDownBlock = () => {
  moveBlock(blockSts.x, blockSts.y, 0, blockSts.type)
  while (noObstacleBelow() === true) {
    blockSts.y++
  }
  moveBlock(blockSts.x, blockSts.y, 1, blockSts.type)
}

const checkLineIsFull = () => {
  let arr = []
  for (let i = 0; i < 20; i++) {
    let cnt = 0
    for (let j = 0; j < 10; j++) {
      isBlockBlack(j, i) ? (cnt = cnt) : cnt++
      if (cnt === 10) arr.push(i)
    }
  }
  if (typeof arr[0] !== "undefined") return arr
}

const lineDown = (col) => {
  let ctx = document.getElementById("myCanvas").getContext("2d")
  for (col; col > 0; col--) {
    for (let i = 0; i < 10; i++) {
      let imageData = ctx.getImageData(
        i * blockSize + 1,
        (col - 1) * blockSize + 1,
        blockSize - 2,
        blockSize - 2
      )
      ctx.putImageData(imageData, i * blockSize + 1, col * blockSize + 1)
    }
  }
}

const deleteLine = () => {
  let arr = checkLineIsFull()
  if (typeof arr !== "undefined") {
    for (let n in arr) {
      lineDown(arr[n])
      n = n * 1
      status.score += (n + 1) * 100
    }
    status.level = parseInt(status.score / 1000) + 1
    if (status.level < 10) {
      status.speed = 1000 - status.level * 100
    } else {
      status.speed = parseInt(100 - (status.level % 10) * 10)
    }
    console.log("speed : " + status.speed)
    document.getElementById("score").innerHTML = status.score
    document.getElementById("level").innerHTML = status.level
    clearInterval(startTimeout)
    startTimeout = setInterval(downBlock, status.speed)
  }
}

const block_O = (row, col, moveAfter) => {
  drawBlock(row, col, moveAfter ? blockColor.O : color.black)
  drawBlock(row + 1, col, moveAfter ? blockColor.O : color.black)
  drawBlock(row, col + 1, moveAfter ? blockColor.O : color.black)
  drawBlock(row + 1, col + 1, moveAfter ? blockColor.O : color.black)
}

const block_Z = (row, col, moveAfter) => {
  if (blockSts.rotatoin % 2 === 0) {
    drawBlock(row - 1, col, moveAfter ? blockColor.Z : color.black)
    drawBlock(row, col, moveAfter ? blockColor.Z : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.Z : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.Z : color.black)
  } else {
    drawBlock(row, col, moveAfter ? blockColor.Z : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.Z : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.Z : color.black)
    drawBlock(row - 1, col + 2, moveAfter ? blockColor.Z : color.black)
  }
}

const block_S = (row, col, moveAfter) => {
  if (blockSts.rotatoin % 2 === 0) {
    drawBlock(row, col, moveAfter ? blockColor.S : color.black)
    drawBlock(row + 1, col, moveAfter ? blockColor.S : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.S : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.S : color.black)
  } else {
    drawBlock(row - 1, col, moveAfter ? blockColor.S : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.S : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.S : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.S : color.black)
  }
}

const block_J = (row, col, moveAfter) => {
  if (blockSts.rotatoin % 4 === 0) {
    drawBlock(row - 1, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.J : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.J : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.J : color.black)
  } else if (blockSts.rotatoin % 4 === 1) {
    drawBlock(row, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.J : color.black)
    drawBlock(row - 1, col + 2, moveAfter ? blockColor.J : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.J : color.black)
  } else if (blockSts.rotatoin % 4 === 2) {
    drawBlock(row - 1, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row + 1, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.J : color.black)
  } else {
    drawBlock(row - 1, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row, col, moveAfter ? blockColor.J : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.J : color.black)
    drawBlock(row - 1, col + 2, moveAfter ? blockColor.J : color.black)
  }
}

const block_L = (row, col, moveAfter) => {
  if (blockSts.rotatoin % 4 === 0) {
    drawBlock(row + 1, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.L : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.L : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.L : color.black)
  } else if (blockSts.rotatoin % 4 === 1) {
    drawBlock(row - 1, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.L : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.L : color.black)
  } else if (blockSts.rotatoin % 4 === 2) {
    drawBlock(row - 1, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row + 1, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.L : color.black)
  } else {
    drawBlock(row - 1, col, moveAfter ? blockColor.L : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.L : color.black)
    drawBlock(row - 1, col + 2, moveAfter ? blockColor.L : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.L : color.black)
  }
}

const block_T = (row, col, moveAfter) => {
  if (blockSts.rotatoin % 4 === 0) {
    drawBlock(row, col, moveAfter ? blockColor.T : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.T : color.black)
  } else if (blockSts.rotatoin % 4 === 1) {
    drawBlock(row, col, moveAfter ? blockColor.T : color.black)
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.T : color.black)
  } else if (blockSts.rotatoin % 4 === 2) {
    drawBlock(row - 1, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.T : color.black)
  } else {
    drawBlock(row, col, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row + 1, col + 1, moveAfter ? blockColor.T : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.T : color.black)
  }
}

const block_I = (row, col, moveAfter) => {
  if (blockSts.rotatoin % 2 === 0) {
    drawBlock(row - 1, col, moveAfter ? blockColor.I : color.black)
    drawBlock(row, col, moveAfter ? blockColor.I : color.black)
    drawBlock(row + 1, col, moveAfter ? blockColor.I : color.black)
    drawBlock(row + 2, col, moveAfter ? blockColor.I : color.black)
  } else {
    drawBlock(row, col, moveAfter ? blockColor.I : color.black)
    drawBlock(row, col + 1, moveAfter ? blockColor.I : color.black)
    drawBlock(row, col + 2, moveAfter ? blockColor.I : color.black)
    drawBlock(row, col + 3, moveAfter ? blockColor.I : color.black)
  }
}

const noObstacleBelow = () => {
  const type = blockSts.type
  const rote = blockSts.rotatoin
  if (type === "O") {
    return isBlockBlack(blockSts.x, blockSts.y + 2) && isBlockBlack(blockSts.x + 1, blockSts.y + 2)
  } else if (type === "Z") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 2) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 3) && isBlockBlack(blockSts.x, blockSts.y + 2)
      )
    }
  } else if (type === "S") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 2) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) && isBlockBlack(blockSts.x, blockSts.y + 3)
      )
    }
  } else if (type === "J") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 2) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 3) && isBlockBlack(blockSts.x, blockSts.y + 3)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 3) && isBlockBlack(blockSts.x, blockSts.y + 1)
      )
    }
  } else if (type === "L") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 2) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) && isBlockBlack(blockSts.x, blockSts.y + 3)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 3) && isBlockBlack(blockSts.x, blockSts.y + 3)
      )
    }
  } else if (type === "T") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 2) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) && isBlockBlack(blockSts.x, blockSts.y + 3)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 3) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x, blockSts.y + 3) && isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    }
  } else {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 2, blockSts.y + 1)
      )
    } else {
      return isBlockBlack(blockSts.x, blockSts.y + 4)
    }
  }
}

const noObstacleLeft = () => {
  const type = blockSts.type
  const rote = blockSts.rotatoin
  if (type === "O") {
    return isBlockBlack(blockSts.x - 1, blockSts.y) && isBlockBlack(blockSts.x - 1, blockSts.y + 1)
  } else if (type === "Z") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) && isBlockBlack(blockSts.x - 1, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 2)
      )
    }
  } else if (type === "S") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) && isBlockBlack(blockSts.x - 2, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    }
  } else if (type === "J") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) && isBlockBlack(blockSts.x - 2, blockSts.y + 1)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 2)
      )
    } else if (rote % 4 === 2) {
      return isBlockBlack(blockSts.x - 2, blockSts.y) && isBlockBlack(blockSts.x, blockSts.y + 1)
    } else {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 2)
      )
    }
  } else if (type === "L") {
    if (rote % 4 === 0) {
      return isBlockBlack(blockSts.x, blockSts.y) && isBlockBlack(blockSts.x - 2, blockSts.y + 1)
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) && isBlockBlack(blockSts.x - 2, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 2)
      )
    }
  } else if (type === "T") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) && isBlockBlack(blockSts.x - 2, blockSts.y + 1)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x - 2, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 2, blockSts.y + 1) && isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    }
  } else {
    if (rote % 2 === 0) {
      return isBlockBlack(blockSts.x - 2, blockSts.y)
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 3)
      )
    }
  }
}

const noObstacleRight = () => {
  const type = blockSts.type
  const rote = blockSts.rotatoin
  if (type === "O") {
    return isBlockBlack(blockSts.x + 2, blockSts.y) && isBlockBlack(blockSts.x + 2, blockSts.y + 1)
  } else if (type === "Z") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) && isBlockBlack(blockSts.x + 2, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 2)
      )
    }
  } else if (type === "S") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x + 2, blockSts.y) && isBlockBlack(blockSts.x + 1, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    }
  } else if (type === "J") {
    if (rote % 4 === 0) {
      return isBlockBlack(blockSts.x, blockSts.y) && isBlockBlack(blockSts.x + 2, blockSts.y + 1)
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x + 2, blockSts.y) && isBlockBlack(blockSts.x + 2, blockSts.y + 1)
      )
    } else {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 2)
      )
    }
  } else if (type === "L") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x + 2, blockSts.y) && isBlockBlack(blockSts.x + 2, blockSts.y + 1)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 2) {
      return isBlockBlack(blockSts.x + 2, blockSts.y) && isBlockBlack(blockSts.x, blockSts.y + 1)
    } else {
      return (
        isBlockBlack(blockSts.x, blockSts.y) &&
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    }
  } else if (type === "T") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) && isBlockBlack(blockSts.x + 2, blockSts.y + 1)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x + 2, blockSts.y + 1) && isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 2, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2)
      )
    }
  } else {
    if (rote % 2 === 0) {
      return isBlockBlack(blockSts.x + 3, blockSts.y)
    } else {
      return (
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 3)
      )
    }
  }
}

const rotatable = () => {
  const type = blockSts.type
  const rote = blockSts.rotatoin
  if (type === "Z") {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) && isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) && isBlockBlack(blockSts.x + 1, blockSts.y + 1)
      )
    }
  } else if (type === "S") {
    if (rote % 2 === 0) {
      return isBlockBlack(blockSts.x - 1, blockSts.y) && isBlockBlack(blockSts.x, blockSts.y + 2)
    } else {
      return isBlockBlack(blockSts.x, blockSts.y) && isBlockBlack(blockSts.x + 1, blockSts.y)
    }
  } else if (type === "J") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x, blockSts.y) &&
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 2)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) && isBlockBlack(blockSts.x - 1, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x, blockSts.y + 1) && isBlockBlack(blockSts.x + 1, blockSts.y + 1)
      )
    }
  } else if (type === "L") {
    if (rote % 4 === 0) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x, blockSts.y) &&
        isBlockBlack(blockSts.x, blockSts.y + 2)
      )
    } else if (rote % 4 === 1) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 1) && isBlockBlack(blockSts.x + 1, blockSts.y)
      )
    } else if (rote % 4 === 2) {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y + 2) && isBlockBlack(blockSts.x, blockSts.y + 2)
      )
    } else {
      return (
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y + 1) &&
        isBlockBlack(blockSts.x + 1, blockSts.y)
      )
    }
  } else if (type === "T") {
    if (rote % 4 === 0) {
      return isBlockBlack(blockSts.x, blockSts.y + 2)
    } else if (rote % 4 === 1) {
      return isBlockBlack(blockSts.x + 1, blockSts.y + 1)
    } else if (rote % 4 === 2) {
      return isBlockBlack(blockSts.x, blockSts.y)
    } else {
      return isBlockBlack(blockSts.x - 1, blockSts.y + 1)
    }
  } else {
    if (rote % 2 === 0) {
      return (
        isBlockBlack(blockSts.x, blockSts.y + 1) &&
        isBlockBlack(blockSts.x, blockSts.y + 2) &&
        isBlockBlack(blockSts.x, blockSts.y + 3)
      )
    } else {
      return (
        isBlockBlack(blockSts.x - 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 1, blockSts.y) &&
        isBlockBlack(blockSts.x + 2, blockSts.y)
      )
    }
  }
}
