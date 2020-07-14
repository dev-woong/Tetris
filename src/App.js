import React from "react"
// import "./block.js"
// import "./keyEvent.js"
import "./init.js"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div class="myBoard">
        <canvas id="myCanvas" width="300" height="600"></canvas>
      </div>
      <div class="stateBoard">
        <div class="level">
          <h1>Level</h1>
          <p id="level">1</p>
        </div>
        <div class="scoreBoard">
          <h1>Score</h1>
          <p id="score">0</p>
        </div>
        <div class="start">
          <button id="btnStart">Start</button>
        </div>
      </div>
      <div class="viewPhraseGameOver">
        <h1>GAME OVER</h1>
      </div>
    </div>
  )
}

export default App
