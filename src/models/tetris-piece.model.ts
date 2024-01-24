export interface TetrisPiece{
    coords: number[][];
    color: string;
    orientation: number;
    height: number;
    width: number;
    dead: boolean;
}


export class IPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'cyan';
    orientation = 0;
    width:number = 4;
    height: number = 1;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        if(this.orientation == 0 ||  this.orientation == 2){
            this.width = 4;
            this.height = 1;
            var start = getRandomstart(maxWidth, this.width);
            this.coords = [[start,height+1],[start+1, height+1],[start+2, height+1],[start+3, height+1]];
        }else{
            this.width = 1;
            this.height = 4;
            var start = getRandomstart(maxWidth, this.width);
            this.coords = [[start,height+1],[start, height],[start, height-1],[start, height-2]];
        }
    }
}

export class TPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'purple';
    orientation = 0;
    width:number = 3;
    height: number = 2;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        switch(this.orientation){
            case 0:{ // regular upward pointing t
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height],[start+1, height],[start+2, height],[start+1, height+1]];
                break;
            }
            case 1:{ // left facing t
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start, height],[start+1, height],[start, height-1]];
                break;
            }
            case 2:{ // downward facing t
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height],[start+1, height],[start+2, height],[start+1, height-1]];
                break;
            }
            case 3:{ // right facing t
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start+1,height+1],[start+1, height],[start, height],[start+1, height-1]];
                break;
            }
        }
    }
}

export class LPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'orange';
    orientation = 0;
    width:number = 2;
    height: number = 3;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        switch(this.orientation){
            case 0:{ // regular L
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start, height],[start, height-1],[start+1, height-1]];
                break;
            }
            case 1:{ // downward facing L
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start+1, height+1],[start+2, height+1],[start, height]];
                break;
            }
            case 2:{ // 180 L
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start+1, height+1],[start+1, height],[start+1, height-1]];
                break;
            }
            case 3:{ // upward facing L
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start+2,height+1],[start, height],[start+1, height],[start+2, height]];
                break;
            }
        }
    }
}

export class JPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'blue';
    orientation = 0;
    width:number = 2;
    height: number = 3;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        switch(this.orientation){
            case 0:{ // regular J
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start+1,height+1],[start+1, height],[start+1, height-1],[start, height-1]];
                break;
            }
            case 1:{ // upward facing J
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start, height],[start+1, height],[start+2, height]];
                break;
            }
            case 2:{ // 180 J
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start+1, height+1],[start, height],[start, height-1]];
                break;
            }
            case 3:{ // downward facing J
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start+1, height+1],[start+2, height+1],[start+2, height]];
                break;
            }
        }
    }
}

export class ZPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'red';
    orientation = 0;
    width:number = 3;
    height: number = 2;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        switch(this.orientation){
            case 0:
            case 2:{ // Z
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start+1, height+1],[start+1, height],[start+2, height]];
                break;
            }
            case 1:
            case 3:{ // 90 degress
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start+1,height+1],[start+1, height],[start, height],[start, height-1]];
                break;
            }
        }
    }
}

export class SPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'green';
    orientation = 0;
    width:number = 3;
    height: number = 2;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        switch(this.orientation){
            case 0:
            case 2:{ // S
                this.width= 3;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start+1,height+1],[start+2, height+1],[start, height],[start+1, height]];
                break;
            }
            case 1:
            case 3:{ // 90 degress
                this.width= 2;
                this.height = 3;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start, height],[start+1, height],[start+1, height-1]];
                break;
            }
        }
    }
}

export class OPiece implements TetrisPiece{
    dead: boolean = false;
    coords: number[][] = [];
    color: string = 'yellow';
    orientation = 0;
    width:number = 3;
    height: number = 2;
    constructor(maxWidth: number, height: number, orientation: number = 0) {
        this.orientation = orientation;
        switch(this.orientation){
            case 0:
            case 1:
            case 2:
            case 3:{ 
                this.width= 2;
                this.height = 2;
                var start = getRandomstart(maxWidth, this.width);
                this.coords = [[start,height+1],[start+1, height+1],[start, height],[start+1, height]];
                break;
            }
        }
    }
}

function getRandomstart(maxWidth: number, pieceWidth: number): number{
    return Math.floor(Math.random() * (maxWidth - pieceWidth + 1)) + 1;
}