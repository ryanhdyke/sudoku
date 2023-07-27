var tileSize = 75;
var gameBoard;
var currMode = "main" //["main", "corner", "center", "color"] //can have main, corner, center, color
var holdingShift = false
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

  //hard difficulty
  let hardBoard = [[5, 5, 1], [4, 9, 1], [7, 2, 2], [6, 6, 2],
                   [1, 2, 3], [3, 7, 3], [8, 3, 4], [4, 4, 4],
                   [1, 5, 4], [6, 8, 4], [9, 3, 5], [5, 7, 5],
                   [1, 3, 6], [2, 5, 6], [8, 6, 6], [7, 8, 6],
                   [7, 5, 7], [1, 7, 7], [5, 9, 7], [2, 2, 8],
                   [8, 4, 8], [1, 6, 8], [4, 5, 9], [9, 6, 9],
                   [2, 8, 9]]

  gameBoard = new Board(hardBoard);

  //add a keypad
  b1 = createButton('1')
  b1.position(825, 280)
  b1.mousePressed(function() {numberInput(1)})
  b1.size(75, 75)
  b1.style('background-color: rgb(232, 85, 0)')
  b1.style('color', 'white')
  // b1.style('border', 'none')
  b1.style('font-size', '32px')
  b1.style('cursor', 'pointer')

  b2 = createButton('2')
  b2.position(902, 280)
  b2.mousePressed(function() {numberInput(2)})
  b2.size(75, 75)
  b2.style('background-color: rgb(232, 85, 0)')
  b2.style('color', 'white')
  // b2.style('border', 'none')
  b2.style('font-size', '32px')
  b2.style('cursor', 'pointer')

  b3 = createButton('3')
  b3.position(979, 280)
  b3.mousePressed(function() {numberInput(3)})
  b3.size(75, 75)
  b3.style('background-color: rgb(232, 85, 0)')
  b3.style('color', 'white')
  // b1.style('border', 'none')
  b3.style('font-size', '32px')
  b3.style('cursor', 'pointer')


  b4 = createButton('4')
  b4.position(825, 357)
  b4.mousePressed(function() {numberInput(4)})
  b4.size(75, 75)
  b4.style('background-color: rgb(232, 85, 0)')
  b4.style('color', 'white')
  // b1.style('border', 'none')
  b4.style('font-size', '32px')
  b4.style('cursor', 'pointer')

  b5 = createButton('5')
  b5.position(902, 357)
  b5.mousePressed(function() {numberInput(5)})
  b5.size(75, 75)
  b5.style('background-color: rgb(232, 85, 0)')
  b5.style('color', 'white')
  // b2.style('border', 'none')
  b5.style('font-size', '32px')
  b5.style('cursor', 'pointer')

  b6 = createButton('6')
  b6.position(979, 357)
  b6.mousePressed(function() {numberInput(6)})
  b6.size(75, 75)
  b6.style('background-color: rgb(232, 85, 0)')
  b6.style('color', 'white')
  // b1.style('border', 'none')
  b6.style('font-size', '32px')
  b6.style('cursor', 'pointer')
  

  b7 = createButton('7')
  b7.position(825, 434)
  b7.mousePressed(function() {numberInput(7)})
  b7.size(75, 75)
  b7.style('background-color: rgb(232, 85, 0)')
  b7.style('color', 'white')
  // b1.style('border', 'none')
  b7.style('font-size', '32px')
  b7.style('cursor', 'pointer')

  b8 = createButton('8')
  b8.position(902, 434)
  b8.mousePressed(function() {numberInput(8)})
  b8.size(75, 75)
  b8.style('background-color: rgb(232, 85, 0)')
  b8.style('color', 'white')
  // b2.style('border', 'none')
  b8.style('font-size', '32px')
  b8.style('cursor', 'pointer')

  b9 = createButton('9')
  b9.position(979, 434)
  b9.mousePressed(function() {numberInput(9)})
  b9.size(75, 75)
  b9.style('background-color: rgb(232, 85, 0)')
  b9.style('color', 'white')
  // b1.style('border', 'none')
  b9.style('font-size', '32px')
  b9.style('cursor', 'pointer')

  deleteButton = createButton('Del')
  deleteButton.position(902, 511)
  deleteButton.mousePressed(deleteNumber)
  deleteButton.size(152, 75)
  deleteButton.style('background-color: rgb(232, 85, 0)')
  deleteButton.style('color', 'white')
  // b1.style('border', 'none')
  deleteButton.style('font-size', '32px')
  deleteButton.style('cursor', 'pointer')
  





  // document.addEventListener('contextmenu', event => event.preventDefault());
  const disabledKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // keys that will be disabled
  const showAlert = e => {
    e.preventDefault(); // preventing its default behaviour
    return;
  }
  document.addEventListener("contextmenu", e => {
    showAlert(e); // calling showAlert() function on mouse right click
  });
  document.addEventListener("keydown", e => {
    // calling showAlert() function, if the pressed key matched to disabled keys
    if(e.ctrlKey && disabledKeys.includes(int(e.key))) {
      showAlert(e);
    }
  });
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
  //   print("center mode")
  //   currMode = "center"
  // }
  // if (keyIsDown(SHIFT)) {
  //   print("corner mode")
  //   // currMode = "corner"
  //   holdingShift = true
  // }
  // else {
  //   holdingShift = false
  // }

  // document.onkeydown = function(e) {
  //   print("key pressed down")
  //   if (e.ctrlKey) {
  //     currMode = "center"
  //   }
  //   if (e.shiftKey) {
  //     currMode = "corner"
  //   }
  // }

  // // let tempMode = currMode
  // document.onkeyup = function(e) {
  //   if (e.key == "Control") {
  //     currMode = "main"
  //   }
  //   if (e.key == "Shift") {
  //     currMode = "main"
  //   }
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
  if (mouseX >= 725 && mouseX <= 953 && mouseY >= 220 && mouseY <= 526) {
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
// function keyTyped() {
//   print("Key typed: ", key)
//   if ((int(key) <= 9 && int(key) >= 1) || key === "!") {
//     print("Passing in a number")
//     numberInput(int(key))
//   }

// }

//handles backspace and arrow key movement
function keyPressed() {
  //translating from shifted numbers to their actual number
  switch(key) {
    case "!":
      key = 1
      break;
    case "@":
      key = 2
      break;
    case "#":
      key = 3
      break;
    case "$":
      key = 4
      break;
    case "%":
      key = 5
      break;
    case "^":
      key = 6
      break;
    case "&":
      key = 7
      break;
    case "*":
      key = 8
      break;
    case "(":
      key = 9
      break;
    default:
      // code block
  }

  if ((int(key) <= 9 && int(key) >= 1)) {
    numberInput(int(key))
  }

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
    return
  }

  if (keyCode === BACKSPACE || keyCode === DELETE) {
    deleteNumber()
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

// function keypadValue(value) {
//   // value = 1
//   if (currMode == "main") {
//     for (let i = 0; i < 81; i++) {
//       if (gameBoard.tiles[i].isSelected) {
//         gameBoard.tiles[i].mainNum = value
//       }
//     }
//   }
//   else if (currMode == "corner") {
//     for (let i = 0; i < 81; i++) {
//       if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].cornerNums.includes(value)) {
//         // also put it in order 
//         gameBoard.tiles[i].cornerNums.push(value)
//       }
//       else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].cornerNums.includes(value)) {
//         // also put it in order 
//         let index = gameBoard.tiles[i].cornerNums.indexOf(value)
//         gameBoard.tiles[i].cornerNums.splice(index, 1)
//       }
//     }
//   }
//   else if (currMode == "center") {
//     for (let i = 0; i < 81; i++) {
//       if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].centerNums.includes(value)) {
//         gameBoard.tiles[i].centerNums.push(value)
//       }
//       else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].centerNums.includes(value)) {
//         // also put it in order 
//         let index = gameBoard.tiles[i].centerNums.indexOf(value)
//         gameBoard.tiles[i].centerNums.splice(index, 1)
//       }
//     }
//   }
// }

function numberInput(num) {
  if (currMode == "main" && (!keyIsDown(SHIFT) && !keyIsDown(CONTROL))) {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isDefault) {
        continue
      }
      if (gameBoard.tiles[i].isSelected) {
        //it has a main num that is the same as the inputed number
        if (gameBoard.tiles[i].mainNum === num) {
          //want to delete the main num and show the center and corner numbers again
          gameBoard.tiles[i].mainNum = 0
        }
        //any other input other that the same main number, should override and set the mainnum to the new input num
        else {
          gameBoard.tiles[i].mainNum = num
        }
      }
    }
  }
  else if ((currMode == "corner" || keyIsDown(SHIFT)) && !keyIsDown(CONTROL)) {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isDefault) {
        continue
      }
      if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].cornerNums.includes(num)) {
        // also put it in order 
        gameBoard.tiles[i].cornerNums.push(num)
      }
      else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].cornerNums.includes(num)) {
        // also put it in order 
        let index = gameBoard.tiles[i].cornerNums.indexOf(num)
        gameBoard.tiles[i].cornerNums.splice(index, 1)
      }
    }
  }
  else if (currMode == "center" || keyIsDown(CONTROL)) {
    for (let i = 0; i < 81; i++) {
      if (gameBoard.tiles[i].isDefault) {
        continue
      }
      if (gameBoard.tiles[i].isSelected && !gameBoard.tiles[i].centerNums.includes(num)) {
        gameBoard.tiles[i].centerNums.push(num)
      }
      else if (gameBoard.tiles[i].isSelected && gameBoard.tiles[i].centerNums.includes(num)) {
        // also put it in order 
        let index = gameBoard.tiles[i].centerNums.indexOf(num)
        gameBoard.tiles[i].centerNums.splice(index, 1)
      }
    }
  }
}

function deleteNumber() {
  for (let i = 0; i < 81; i++) {
    if (gameBoard.tiles[i].isSelected) {
      if (gameBoard.tiles[i].isDefault) {
        continue
      }
      let currTile = gameBoard.tiles[i]

      //it has a main number
      if (currTile.mainNum !== 0) {
        //just delete main number
        currTile.mainNum = 0
        continue
      }

      if (currMode == "main") {
        //delete everything
        currTile.mainNum = 0
        currTile.cornerNums.length = 0
        currTile.centerNums.length = 0
      }
      else if (currMode == "corner") {
        //delete all corner markings
        currTile.cornerNums.length = 0
      }
      else if (currMode == "center") {
        //delete all corner markings
        currTile.centerNums.length = 0
      }    
    }
  }
}


