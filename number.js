class Number {
    constructor(num, x, y) {
        this.num = num
        this.column = x
        this.row = y
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
    }

    displayNumber() {
        textAlign(CENTER, CENTER)
        textSize(32)
        text(str(this.num), (this.column - 1) * tileSize + tileSize / 2, (this.row - 1) * tileSize + tileSize / 2)
    }
}