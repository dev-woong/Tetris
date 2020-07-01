const blockSize = 30

let blockSts = {
  x: 0,
  y: 0,
  rotatoin: 0,
  type: "O",
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

const drawBlock = (row, col, color) => {
  let ctx = document.getElementById("myCanvas").getContext("2d")
  ctx.fillStyle = color
  ctx.fillRect(row * blockSize + 1, col * blockSize + 1, blockSize - 2, blockSize - 2)
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
    block_I(row, col, moveAfter)
  } else if (type === "I") {
    block_I(row, col, moveAfter)
  }
}
