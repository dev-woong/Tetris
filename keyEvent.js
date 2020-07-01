//key event

const keyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

onkeydown = function () {
  if (event.keyCode == keyCode.left) {
    pressKey("left")
  } else if (event.keyCode == keyCode.up) {
    pressKey("up")
  } else if (event.keyCode == keyCode.right) {
    pressKey("right")
  } else if (event.keyCode == keyCode.down) {
    pressKey("down")
  }
}

const pressKey = (key) => {
  if (key === "down") {
    moveBlock(blockSts.x, blockSts.y, 0)
    blockSts.y++
    moveBlock(blockSts.x, blockSts.y, 1)
  } else if (key === "left") {
    moveBlock(blockSts.x, blockSts.y, 0)
    blockSts.x--
    moveBlock(blockSts.x, blockSts.y, 1)
  } else if (key === "right") {
    moveBlock(blockSts.x, blockSts.y, 0)
    blockSts.x++
    moveBlock(blockSts.x, blockSts.y, 1)
  } else {
    moveBlock(blockSts.x, blockSts.y, 0)
    blockSts.rotatoin++
    moveBlock(blockSts.x, blockSts.y, 1)
  }
}

// const rotate = (positionX, positionY, rotetion) => {
//   block_T(positionX, positionY, blockSts.rotatoin, 0)
// }
