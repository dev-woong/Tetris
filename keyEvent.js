//key event

const keyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

onkeydown = function () {
  if (event.keyCode == keyCode.left) {
    if (noObstacleLeft()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.x--
      moveBlock(blockSts.x, blockSts.y, 1)
    }
  } else if (event.keyCode == keyCode.up) {
    moveBlock(blockSts.x, blockSts.y, 0)
    blockSts.rotatoin++
    moveBlock(blockSts.x, blockSts.y, 1)
  } else if (event.keyCode == keyCode.right) {
    if (noObstacleRight()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.x++
      moveBlock(blockSts.x, blockSts.y, 1)
    }
  } else if (event.keyCode == keyCode.down) {
    if (noObstacleBelow()) {
      moveBlock(blockSts.x, blockSts.y, 0)
      blockSts.y++
      moveBlock(blockSts.x, blockSts.y, 1)
    } else {
      console.log(checkLineIsFull())
      createBlock()
    }
  }
}

onclick = () => {
  let x = event.clientX
  let y = event.clientY
  var coord = " X : " + x + ", Y : " + y
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext("2d")
  let tempColor = ctx.getImageData(x - 20, y, 1, 1).data
  console.log(tempColor[0] === 0 && tempColor[1] === 0 && tempColor[2] === 0)
  console.log(tempColor)

  document.getElementById("mouseLocation").innerHTML = tempColor
}
