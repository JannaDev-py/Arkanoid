const canvasContainer = document.querySelector('#gameboard-container') as HTMLDivElement
const canvas = document.querySelector('#gameboard') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = canvasContainer.clientWidth
canvas.height = canvasContainer.clientHeight

const config = {
  wGameboard: canvasContainer.clientWidth,
  hGameboard: canvasContainer.clientHeight,
  pieceWidth: 15,
  pieceHeight: 4,
  piecesRowNum: canvasContainer.clientWidth / 15,
  piecesColumnNum: canvasContainer.clientHeight / 4
}

document.addEventListener('resize', () => {
  canvas.width = canvasContainer.clientWidth
  canvas.height = canvasContainer.clientHeight
  config.wGameboard = canvasContainer.clientWidth
  config.hGameboard = canvasContainer.clientHeight
})
