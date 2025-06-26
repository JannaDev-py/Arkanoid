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

window.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight

  configUpdate()
  PiecesUpdate()

  createGameboard()
  renderGame()
})

const Pieces = {
  piecesColumnNum: Math.floor(canvas.width / config.pieceWidth),
  piecesRowNum: Math.floor(canvas.height / config.pieceHeight / 2)
}

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
      ctx.fillRect(Piece.x, Piece.y, config.pieceWidth - padding.left, config.pieceHeight - padding.top)
    })
  })
}

createGameboard()
renderGame()
