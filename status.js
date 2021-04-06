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
