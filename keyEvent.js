//key event

const keyCode = {
  spaceBar: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

document.getElementById("btnStart").onclick = () => {
  initialize()
  createBlock()
  status.start = true
  startTimeout
  document.getElementById("btnStart").blur()
}

onkeydown = function () {
  if (status.start === true) {
    if (event.keyCode === keyCode.left && noObstacleLeft()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.x--
      moveBlock(blockSts.x, blockSts.y, 1)
    } else if (event.keyCode === keyCode.up && rotatable()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.rotatoin++
      moveBlock(blockSts.x, blockSts.y, 1)
    } else if (event.keyCode === keyCode.right && noObstacleRight()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.x++
      moveBlock(blockSts.x, blockSts.y, 1)
    } else if (event.keyCode === keyCode.down) {
      if (noObstacleBelow()) {
        moveBlock(blockSts.x, blockSts.y, 0)
        blockSts.y++
        moveBlock(blockSts.x, blockSts.y, 1)
      } else {
        deleteLine()
        createBlock()
      }
    } else if (event.keyCode === keyCode.spaceBar) {
      dropDownBlock()
      deleteLine()
      createBlock()
    }
  }
}
