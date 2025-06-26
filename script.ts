const canvasContainer = document.querySelector('#gameboard-container') as HTMLDivElement
const canvas = document.querySelector('#gameboard') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

const config = {
  wGameboard: canvasContainer.clientWidth,
  hGameboard: canvasContainer.clientHeight,
  pieceWidth: (canvasContainer.clientWidth / 9),
  pieceHeight: ((canvasContainer.clientHeight / 2) / 5)
}

const player = {
  width: config.pieceWidth * 2,
  height: config.pieceHeight / 3,
  x: 0,
  y: canvas.height - config.pieceHeight / 2
}

const Pieces = {
  piecesColumnNum: Math.floor(canvas.width / config.pieceWidth),
  piecesRowNum: Math.floor(canvas.height / config.pieceHeight / 2)
}

const Ball = {
  width: config.wGameboard / 10,
  height: config.wGameboard / 10,
  x: config.wGameboard / 10,
  y: (canvas.height - config.pieceHeight / 2) - player.height * 2
}

function configUpdate (): void {
  config.wGameboard = canvasContainer.clientWidth
  config.hGameboard = canvasContainer.clientHeight
  config.pieceWidth = (canvasContainer.clientWidth / 9)
  config.pieceHeight = ((canvasContainer.clientHeight / 2) / 5)
}

function PiecesUpdate (): void {
  Pieces.piecesColumnNum = Math.floor(canvas.width / config.pieceWidth)
  Pieces.piecesRowNum = Math.floor(canvas.height / config.pieceHeight / 2)
}

function playerUpdate (): void {
  player.width = config.pieceWidth * 2
  player.height = config.pieceHeight / 3
  player.y = canvas.height - config.pieceHeight / 2
}

function BallUpdate (): void {
  Ball.width = config.wGameboard / 10
  Ball.height = config.wGameboard / 10
  Ball.y = (canvas.height - config.pieceHeight / 2) - player.height * 2
}

window.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight

  configUpdate()
  PiecesUpdate()
  playerUpdate()
  BallUpdate()

  createGameboard()
  renderGame()
})

interface Piece {
  x: number
  y: number
}

let piecesArray: Piece[][] = []

function createGameboard (): void {
  const padding = {
    left: Math.abs((canvas.width - (Pieces.piecesColumnNum * config.pieceWidth)) - 2.5),
    top: Math.abs((canvas.height / 2 - (Pieces.piecesRowNum * config.pieceHeight)) - 5)
  }

  piecesArray = [[]]
  for (let row = 0; row < Pieces.piecesRowNum; row++) {
    piecesArray.push([])
    for (let column = 0; column < Pieces.piecesColumnNum; column++) {
      piecesArray[row].push({ x: column * config.pieceWidth + padding.left, y: row * config.pieceHeight + padding.top })
    }
  }
}

function renderGame (): void {
  const padding = {
    left: Math.abs((canvas.width - (Pieces.piecesColumnNum * config.pieceWidth)) - 5),
    top: Math.abs((canvas.height / 2 - (Pieces.piecesRowNum * config.pieceHeight)) - 5)
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  piecesArray.forEach(row => {
    row.forEach(Piece => {
      ctx.fillStyle = '#222'
      ctx.fillRect(Piece.x, Piece.y, config.pieceWidth - padding.left, config.pieceHeight - padding.top)
    })
  })
  ctx.fillStyle = '#3f7'
  ctx.fillRect(player.x, player.y, player.width - padding.left, player.height - padding.top)

  ctx.fillStyle = '#f21'
  ctx.arc(Ball.x, Ball.y, Ball.width / 2, 0, Math.PI * 2)
  ctx.fill()
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && player.x + 10 + player.width <= config.wGameboard) {
    player.x += 10
  } else if (e.key === 'ArrowLeft' && player.x - 10 >= 0) {
    player.x -= 10
  }
  renderGame()
})

createGameboard()
renderGame()
