class Board {
  //pass in an array of arrays with each interior one containing [mainNum, x, y] for preset numbers
    constructor(defaultNums) {
      // if (defaultNums === null)
      this.tiles = [];
      for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
          let defaultTile = false
          for (let c = 0; c < defaultNums.length; c++) {
            if (defaultNums[c][1] === j && defaultNums[c][2] === i) {
              // print("adding a default num")
              this.tiles.push(new Tile(defaultNums[c][0], j, i, true))
              defaultTile = true
              break
            }
          }
          if (!defaultTile) {
            this.tiles.push(new Tile(0, j, i, false))
          }
        }
      }
    }
  
    showTiles() {      
      for (var i = 0; i < this.tiles.length; i++) {

        //show main numbers
        if (this.tiles[i].mainNum !== 0) {
          //checking if it is a conflict and coloring based on that
          if (this.tiles[i].isConflicting) {
            fill(255, 0, 0)
          }
          else if (this.tiles[i].isDefault) {
            fill(0)
          }
          else {
            fill(0, 0, 255)
            stroke(0, 0, 255)
          }
          this.tiles[i].displayMainNumber()
        }
        else {
          // show corner numbers
          fill(0, 0, 255)
          this.tiles[i].displayCornerNumbers()

          // show center numbers
          this.tiles[i].displayCenterNumbers()
        }        
      }
      fill(0)
      stroke(0)
    }

    // selectTile(x, y) {
    //   var tile = this.getTileAt(x, y)
    //   if (tile === null) {
    //     selectedX = -1
    //     selectedY = -1
    //     return
    //   }
    //   tile.highlightTile()
    // }

    getTileAt(x, y) {

      for (let i = 0; i < 81; i++) {
        if (this.tiles[i].column === x && this.tiles[i].row === y) {
          // print("got tile at (x, y): (", this.tiles[i].column, ", ", this.tiles[i].row, ")")
          return this.tiles[i]
        }
      }
      // print("couldnt get tile")
      return null
    }

    checkAllTiles() {
      for (let i = 0; i < 81; i++) {
        this.tiles[i].isConflicting = false
      }

      for (let i = 0; i < 80; i++) {
        let currTile = this.tiles[i]
        // this.checkConflict(currTile)
        for (let j = i + 1; j < 81; j++) {
          if (((this.tiles[j].column === currTile.column || this.tiles[j].row === currTile.row || this.tiles[j].box === currTile.box)
            && this.tiles[j].mainNum === currTile.mainNum) && this.tiles[j].mainNum !== 0) {
            // if it is a conflict
            currTile.isConflicting = true
            this.tiles[j].isConflicting = true
            
            // print("CONFLICT with (x, y): (", currTile.column, ", ", currTile.row, ") and (", this.tiles[j].column, ", ", this.tiles[j].row, ")")
          }
        }
      }
    }

    checkGameWin() {
      for (let i = 0; i < 81; i++) {
        if (this.tiles[i].mainNum === 0 || this.tiles[i].isConflicting) {
          return false
        }
      }
      return true
    }

    amountOfSelectedTiles() {
      let total = 0
      for (let i = 0; i < 81; i++) {
        if (this.tiles[i].isSelected) {
          total += 1
        }
      }
      return total
    }
    
}