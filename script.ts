const canvasContainer = document.querySelector('#gameboard-container') as HTMLDivElement
const canvas = document.querySelector('#gameboard') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
console.log(ctx)
canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

const config = {
  wGameboard: canvasContainer.clientWidth,
  hGameboard: canvasContainer.clientHeight,
  pieceWidth: (canvasContainer.clientWidth / 9) - 5,
  pieceHeight: ((canvasContainer.clientHeight / 2) / 5) - 5
}

document.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight
  config.wGameboard = canvasContainer.clientWidth
  config.hGameboard = canvasContainer.clientHeight
})

const Pieces = {
  piecesColumnNum: Math.floor(canvas.width / config.pieceWidth),
  piecesRowNum: Math.floor(canvas.height / config.pieceHeight / 2)
}

interface Piece {
  x: number
  y: number
}

const piecesArray: Piece[][] = []

for (let row = 0; row < Pieces.piecesRowNum; row++) {
  piecesArray.push([])
  for (let column = 0; column < Pieces.piecesColumnNum; column++) {
    piecesArray[row].push({ x: column, y: row })
  }
}

console.log(piecesArray)
