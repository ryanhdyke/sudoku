class Tile {
    constructor(mainNum, cornerNums, centerNums, x, y) {
        this.mainNum = mainNum
        this.cornerNums = cornerNums
        this.centerNums = centerNums
        this.column = x
        this.row = y
        this.isConflicting = false
        this.isSelected = false
        if (x <= 3 && y <= 3) {
            this.box = 1
        }
        else if (x <= 6 && y <= 3) {
            this.box = 2
        }
        else if (x <= 9 && y <= 3) {
            this.box = 3
        }
        else if (x <= 3 && y <= 6) {
            this.box = 4
        }
        else if (x <= 6 && y <= 6) {
            this.box = 5
        }
        else if (x <= 9 && y <= 6) {
            this.box = 6
        }
        else if (x <= 3 && y <= 9) {
            this.box = 7
        }
        else if (x <= 6 && y <= 9) {
            this.box = 8
        }
        else {
            this.box = 9
        }

        //create rectangle here
    }

    displayMainNumber() {
        textAlign(CENTER, CENTER)
        textFont('Helvetica')
        textSize(48)
        strokeWeight(1)

        
        text(str(this.mainNum), (this.column - 1) * tileSize + tileSize / 2, (this.row - 1) * tileSize + tileSize / 2)
    }

    displayCornerNumbers() {
        textAlign(LEFT, TOP)
        textFont('Helvetica')
        textSize(14)
        strokeWeight(0)

        let cornerNumString = ""

        if (this.cornerNums.includes(1)) {
            cornerNumString = cornerNumString + "1"
        }
        if (this.cornerNums.includes(2)) {
            cornerNumString = cornerNumString + "2"
        }
        if (this.cornerNums.includes(3)) {
            cornerNumString = cornerNumString + "3"
        }
        if (this.cornerNums.includes(4)) {
            cornerNumString = cornerNumString + "4"
        }
        if (this.cornerNums.includes(5)) {
            cornerNumString = cornerNumString + "5"
        }
        if (this.cornerNums.includes(6)) {
            cornerNumString = cornerNumString + "6"
        }
        if (this.cornerNums.includes(7)) {
            cornerNumString = cornerNumString + "7"
        }
        if (this.cornerNums.includes(8)) {
            cornerNumString = cornerNumString + "8"
        }
        if (this.cornerNums.includes(9)) {
            cornerNumString = cornerNumString + "9"
        }


        //the + 10 is to get it a little bit out of the corner
        text(cornerNumString, (this.column - 1) * tileSize + 2, (this.row - 1) * tileSize + 2)
    }

    displayCenterNumbers() {
        textAlign(CENTER, CENTER)
        textFont('Helvetica')
        textSize(14)
        strokeWeight(0)

        let centerNumString = ""

        if (this.centerNums.includes(1)) {
            centerNumString = centerNumString + "1"
        }
        if (this.centerNums.includes(2)) {
            centerNumString = centerNumString + "2"
        }
        if (this.centerNums.includes(3)) {
            centerNumString = centerNumString + "3"
        }
        if (this.centerNums.includes(4)) {
            centerNumString = centerNumString + "4"
        }
        if (this.centerNums.includes(5)) {
            centerNumString = centerNumString + "5"
        }
        if (this.centerNums.includes(6)) {
            centerNumString = centerNumString + "6"
        }
        if (this.centerNums.includes(7)) {
            centerNumString = centerNumString + "7"
        }
        if (this.centerNums.includes(8)) {
            centerNumString = centerNumString + "8"
        }
        if (this.centerNums.includes(9)) {
            centerNumString = centerNumString + "9"
        }

        //the + 10 is to get it a little bit out of the corner
        text(centerNumString, (this.column - 1) * tileSize + tileSize / 2, (this.row - 1) * tileSize + tileSize / 2)
    }

    // highlightTile() {        
    //     // selectedX = this.column
    //     // selectedY = this.row
    //     if (this.isSelected) {

    //     }
    // }
    
}