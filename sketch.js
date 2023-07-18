var tileSize = 75;
var gameBoard;
var currMode = "main" //["main", "corner", "center", "color"] //can have main, corner, center, color
var lastSelectedTile = null;
// var multipleTilesSelected = false;
var startingDragX = -1;
var startingDragY = -1;
var startingDragIsSelected = false;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  var cnv = createCanvas(675, 675);
  // var x = (windowWidth - width) / 2;
  var x = 100
  var y = ((windowHeight - height) / 2) + 20;
  cnv.position(x, y);

  gameBoard = new Board();

  //add a keypad
  b1 = createButton('1')
  b1.position(825, 280)
  b1.mousePressed(function() { keypadValue(1)})
  b1.size(75, 75)
  b1.style('background-color: rgb(232, 85, 0)')
  b1.style('color', 'white')
  // b1.style('border', 'none')
  b1.style('font-size', '32px')
  b1.style('cursor', 'pointer')

  b2 = createButton('2')
  b2.position(902, 280)
  b2.mousePressed(function() { keypadValue(2)})
  b2.size(75, 75)
  b2.style('background-color: rgb(232, 85, 0)')
  b2.style('color', 'white')
  // b2.style('border', 'none')
  b2.style('font-size', '32px')
  b2.style('cursor', 'pointer')

  b3 = createButton('3')
  b3.position(979, 280)
  b3.mousePressed(function() { keypadValue(3)})
  b3.size(75, 75)
  b3.style('background-color: rgb(232, 85, 0)')
  b3.style('color', 'white')
  // b1.style('border', 'none')
  b3.style('font-size', '32px')
  b3.style('cursor', 'pointer')


  b4 = createButton('4')
  b4.position(825, 357)
  b4.mousePressed(function() { keypadValue(4)})
  b4.size(75, 75)
  b4.style('background-color: rgb(232, 85, 0)')
  b4.style('color', 'white')
  // b1.style('border', 'none')
  b4.style('font-size', '32px')
  b4.style('cursor', 'pointer')

  b5 = createButton('5')
  b5.position(902, 357)
  b5.mousePressed(function() { keypadValue(5)})
  b5.size(75, 75)
  b5.style('background-color: rgb(232, 85, 0)')
  b5.style('color', 'white')
  // b2.style('border', 'none')
  b5.style('font-size', '32px')
  b5.style('cursor', 'pointer')

  b6 = createButton('6')
  b6.position(979, 357)
  b6.mousePressed(function() { keypadValue(6)})
  b6.size(75, 75)
  b6.style('background-color: rgb(232, 85, 0)')
  b6.style('color', 'white')
  // b1.style('border', 'none')
  b6.style('font-size', '32px')
  b6.style('cursor', 'pointer')
  

  b7 = createButton('7')
  b7.position(825, 434)
  b7.mousePressed(function() { keypadValue(7)})
  b7.size(75, 75)
  b7.style('background-color: rgb(232, 85, 0)')
  b7.style('color', 'white')
  // b1.style('border', 'none')
  b7.style('font-size', '32px')
  b7.style('cursor', 'pointer')

  b8 = createButton('8')
  b8.position(902, 434)
  b8.mousePressed(function() { keypadValue(8)})
  b8.size(75, 75)
  b8.style('background-color: rgb(232, 85, 0)')
  b8.style('color', 'white')
  // b2.style('border', 'none')
  b8.style('font-size', '32px')
  b8.style('cursor', 'pointer')

  b9 = createButton('9')
  b9.position(979, 434)
  b9.mousePressed(function() { keypadValue(9)})
  b9.size(75, 75)
  b9.style('background-color: rgb(232, 85, 0)')
  b9.style('color', 'white')
  // b1.style('border', 'none')
  b9.style('font-size', '32px')
  b9.style('cursor', 'pointer')
  
}

function draw() {
  background(100);

  showGrid()
  gameBoard.showTiles()
  gameBoard.checkAllTiles()

  document.getElementById("whatMode").innerHTML = currMode

  if (gameBoard.checkGameWin()) {
    // print("GAME WON")
    // rectMode(CENTER)
    fill(255)
    stroke(0)
    strokeWeight(10)
    // translate((width - 500) / 2, (height - 250) / 2)
    rect((width - 500) / 2, (height - 250) / 2, 500, 250, 50);
    // rectMode(CORNER)

    fill(0)
    textAlign(CENTER, CENTER)
    textFont('Helvetica')
    textSize(72)
    strokeWeight(0)
    
    text("You won!", width / 2, width / 2)
  }

  // if (keyIsDown(CONTROL)) {
  //   currMode = "center"
  // }
  // if (keyIsDown(SHIFT)) {
  //   currMode = "corner"
  // }

}

function showGrid() {
  stroke(0)
  strokeWeight(1)
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      let currTile = gameBoard.getTileAt(j + 1, i + 1)
      if (currTile.isSelected) {
        fill(245, 245, 66)
      }
      else {
        fill(255)
      }
      rect(j * tileSize, i * tileSize, tileSize, tileSize);

    }
  }

  fill(0)

  // outer border
  strokeWeight(6)
  line(0, 0, tileSize * 9, 0)
  line(0, 0, 0, tileSize * 9)
  line(0, tileSize * 9, tileSize * 9, tileSize * 9)
  line(tileSize * 9, 0, tileSize * 9, tileSize * 9)

  // box borders
  strokeWeight(3)
  line(tileSize * 3, 0, tileSize * 3, tileSize * 9)
  line(tileSize * 6, 0, tileSize * 6, tileSize * 9)
  line(0, tileSize * 3, tileSize * 9, tileSize * 3)
  line(0, tileSize * 6, tileSize * 9, tileSize * 6)

}

function mousePressed() {
  //clicked number pad (dont want to do anything here)
  if (mouseX >= 725 && mouseX <= 953 && mouseY >= 220 && mouseY <= 449) {
    return
  }
  
  var x = ceil(mouseX / tileSize)
  var y = ceil(mouseY / tileSize)

  startingDragX = x
  startingDragY = y
  
  let tile = gameBoard.getTileAt(x, y)
  let tilesSelected = gameBoard.amountOfSelectedTiles()

  

  //clicked out of grid
  if (tile === null) {
    //deselect all tiles
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    return
  }

  startingDragIsSelected = tile.isSelected

  //single tile is already selected and i click on it
  if (tilesSelected === 1 && tile.isSelected) {
    tile.isSelected = false
    lastSelectedTile = null
    return
  }

  //tile is not selected and CTRL is held down for any amount of selected tiles
  if (!tile.isSelected && keyIsDown(CONTROL)) {
    tile.isSelected = true
    lastSelectedTile = tile
    return
  }

  //tile is not selected and CTRL is not held down for any amount of selected tiles
  if (!tile.isSelected && !keyIsDown(CONTROL)) {
    //deselect all tiles
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    tile.isSelected = true
    lastSelectedTile = tile
    return
  }

  //right now this is the same logic inside the if statement as the one above
  //more than 1 tile is selected and I click on a selected tile while CTRL is not held down
  if (tilesSelected > 1 && tile.isSelected && !keyIsDown(CONTROL)) {
    //deselect all tiles
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    tile.isSelected = true
    lastSelectedTile = tile
    return
  }

  //more than 1 tile is selected and I click on a selected tile while CTRL is held down
  if (tilesSelected > 1 && tile.isSelected && keyIsDown(CONTROL)) {
    tile.isSelected = false
    if (lastSelectedTile.column === tile.column && lastSelectedTile.row === tile.row) {
      lastSelectedTile = null
    }
    return
  }

  //default case: should not run ever
  tile.isSelected = true
  return  
}

function mouseDragged() {
  print("mouse dragged")

  var x = ceil(mouseX / tileSize)
  var y = ceil(mouseY / tileSize)

  //in the same cell
  if (x == startingDragX && y == startingDragY) {

  }
  else { //changed to a different cell
    let tile = gameBoard.getTileAt(x, y)
    if (tile === null) {
      return
    }

    //break up into specific cases like mousePressed()
    if (startingDragIsSelected && keyIsDown(CONTROL)) {
      tile.isSelected = false
      if (lastSelectedTile.column === tile.column && lastSelectedTile.row === tile.row) {
        lastSelectedTile = null
      }
    }
    else if (startingDragIsSelected && !keyIsDown(CONTROL)){
      tile.isSelected = true
      lastSelectedTile = tile
    }
    else if (!startingDragIsSelected){
      tile.isSelected = true
      lastSelectedTile = tile
    }
    
    startingDragX = x
    startingDragY = y
  }
}

// adding numbers
function keyTyped() {
  if (key <= 9 && key >= 1) {
    
    if (currMode == "main") {
      for (let i = 0; i < 81; i++) {
        if (gameBoard.tiles[i].isSelected) {
          gameBoard.tiles[i].mainNum = int(key)
        }
      }
    }
    else if (currMode == "corner") {
      for (let i = 0; i < 81; i++) {
        if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].cornerNums.includes(int(key))) {
          // also put it in order 
          gameBoard.tiles[i].cornerNums.push(int(key))
        }
        else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].cornerNums.includes(int(key))) {
          // also put it in order 
          let index = gameBoard.tiles[i].cornerNums.indexOf(int(key))
          gameBoard.tiles[i].cornerNums.splice(index, 1)
        }
      }
    }
    else if (currMode == "center") {
      for (let i = 0; i < 81; i++) {
        if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].centerNums.includes(int(key))) {
          gameBoard.tiles[i].centerNums.push(int(key))
        }
        else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].centerNums.includes(int(key))) {
          // also put it in order 
          let index = gameBoard.tiles[i].centerNums.indexOf(int(key))
          gameBoard.tiles[i].centerNums.splice(index, 1)
        }
      }
    }

  }

}

//handles backspace and arrow key movement
function keyPressed() {
  if (key == ' ') {
    if (currMode == "main") {
      currMode = "corner"
    }
    else if (currMode == "corner") {
      currMode = "center"
    }
    else if (currMode == "center") {
      currMode = "color"
    }
    else if (currMode == "color") {
      currMode = "main"
    }
    print("Mode: ", currMode)
    return
  }

  if (keyCode === BACKSPACE) {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        let currTile = gameBoard.tiles[i]
        currTile.mainNum = 0
        currTile.cornerNums.length = 0
        currTile.centerNums.length = 0
      }
    }
    return
  }
  
  //getting the tile to move from
  let currTileX = 0
  let currTileY = 0
  if (lastSelectedTile === null) {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        currTileX = gameBoard.tiles[i].column
        currTileY = gameBoard.tiles[i].row
        break
      }
    }
  }
  else {
    currTileX = lastSelectedTile.column
    currTileY = lastSelectedTile.row
  }

  // left arrow
  if (keyCode === LEFT_ARROW && keyIsDown(CONTROL)) {
    if (currTileX - 1 === 0) {
      currTileX = 10
    }
    let newTile = gameBoard.getTileAt(currTileX - 1, currTileY)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }
  if (keyCode === LEFT_ARROW && !keyIsDown(CONTROL)) {
    if (currTileX - 1 === 0) {
      currTileX = 10
    }
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    let newTile = gameBoard.getTileAt(currTileX - 1, currTileY)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }

  // right arrow
  if (keyCode === RIGHT_ARROW && keyIsDown(CONTROL)) {
    if (currTileX + 1 === 10) {
      currTileX = 0
    }
    let newTile = gameBoard.getTileAt(currTileX + 1, currTileY)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }
  if (keyCode === RIGHT_ARROW && !keyIsDown(CONTROL)) {
    if (currTileX + 1 === 10) {
      currTileX = 0
    }
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    let newTile = gameBoard.getTileAt(currTileX + 1, currTileY)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }

  // down arrow
  if (keyCode === DOWN_ARROW && keyIsDown(CONTROL)) {
    if (currTileY + 1 === 10) {
      currTileY = 0
    }
    let newTile = gameBoard.getTileAt(currTileX, currTileY + 1)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }
  if (keyCode === DOWN_ARROW && !keyIsDown(CONTROL)) {
    if (currTileY + 1 === 10) {
      currTileY = 0
    }
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    let newTile = gameBoard.getTileAt(currTileX, currTileY + 1)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }

  // up arrow
  if (keyCode === UP_ARROW && keyIsDown(CONTROL)) {
    if (currTileY - 1 === 0) {
      currTileY = 10
    }
    let newTile = gameBoard.getTileAt(currTileX, currTileY - 1)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }
  if (keyCode === UP_ARROW && !keyIsDown(CONTROL)) {
    if (currTileY - 1 === 0) {
      currTileY = 10
    }
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].isSelected = false
      }
    }
    let newTile = gameBoard.getTileAt(currTileX, currTileY - 1)
    newTile.isSelected = true
    lastSelectedTile = newTile
    return
  }
}

// function keyReleased() {
//   if (keyCode === SHIFT || keyCode === CONTROL) {
//     currMode = "main"
//   }
// }

function keypadValue(value) {
  // value = 1
  if (currMode == "main") {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected) {
        gameBoard.tiles[i].mainNum = value
      }
    }
  }
  else if (currMode == "corner") {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].cornerNums.includes(value)) {
        // also put it in order 
        gameBoard.tiles[i].cornerNums.push(value)
      }
      else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].cornerNums.includes(value)) {
        // also put it in order 
        let index = gameBoard.tiles[i].cornerNums.indexOf(value)
        gameBoard.tiles[i].cornerNums.splice(index, 1)
      }
    }
  }
  else if (currMode == "center") {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].centerNums.includes(value)) {
        gameBoard.tiles[i].centerNums.push(value)
      }
      else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].centerNums.includes(value)) {
        // also put it in order 
        let index = gameBoard.tiles[i].centerNums.indexOf(value)
        gameBoard.tiles[i].centerNums.splice(index, 1)
      }
    }
  }
}


