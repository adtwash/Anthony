import { Component } from '@angular/core';
import { TetrisBlock } from 'src/models/tetris-block.model';
import { JPiece, LPiece, IPiece, OPiece, SPiece, TPiece, TetrisPiece, ZPiece } from 'src/models/tetris-piece.model';

@Component({
  selector: 'app-tetrisgrid',
  templateUrl: './tetrisgrid.component.html',
  styleUrls: ['./tetrisgrid.component.scss']
})
export class TetrisgridComponent {
  private gridHeight = 90; // default 14 of default tetris
  private gridWidth = 100; // default 10 for default tetris
  public grid:TetrisBlock[][] = this.generateTetrisGrid();
  public currentColor = 'blue';
  private processid: any;
  private tetriminos: TetrisPiece[] = [new IPiece(this.gridWidth, this.gridHeight)];
  private ticksSinceLastPiece: number = 0;
  private ticksBetweenPieces: number = 5;
  private blocksize:number = 10;
  private tickSpeed: number = 100;

  ngAfterViewInit(): void {
    var gridContainer = Array.from(
      document.getElementsByClassName('grid-container') as HTMLCollectionOf<HTMLElement>
    );
    gridContainer.forEach(container =>{
      container.style.width = `${this.blocksize*this.gridWidth}px`
    });
    var gridrows = Array.from(
      document.getElementsByClassName('grid-row') as HTMLCollectionOf<HTMLElement>
    );
    gridrows.forEach(row =>{
      row.style.gridTemplateColumns = `repeat(${this.gridWidth}, ${this.blocksize}px)`
      row.style.width = `${this.blocksize*this.gridWidth}px`
    }) 
    this.processid = setInterval(() => this.colorDropTest(), this.tickSpeed);
  }

  private generateTetrisGrid(): TetrisBlock[][] {
    var tempgrid: TetrisBlock[][] = [];
    for(var i:number = this.gridHeight; i>0; i--){
      var row: TetrisBlock[] = [];
      for(var n:number = 1; n<=this.gridWidth; n++){
        row.push({row: i, column: n, color: 'white', filled: false})
      }
      tempgrid.push(row);
    }
    return tempgrid;
  }

  public changeColor(column: number, row: number, color:string='blue', border: boolean = false): void {
    var id = `x${String(column)}y${String(row)}`;
    document.getElementById(id)!.style.backgroundColor= color;
    if(border){
      document.getElementById(id)!.classList.add('tetromino');
    }else{
      document.getElementById(id)!.classList.remove('tetromino');
    }
  }

  public colorDropTest(): void{
    var gameover = false;
    this.ticksSinceLastPiece += 1;
    for(var piece of this.tetriminos){
      for(var block of piece.coords){
        // if piece reaches bottom
        if(block[1] == 1){
          piece.dead = true;
        // if piece reaches another locked piece
        }else{
          // check if piece triggers game over
          if(this.pieceOutOfBounds(piece, this.gridHeight) && this.grid[this.gridHeight - block[1] + 1][block[0] -1].filled == true){
            piece.dead = true;
            gameover=true;
          }
          else if(block[1] <= this.gridHeight && this.grid[this.gridHeight - block[1] + 1][block[0] -1].filled == true){
            piece.dead = true;
          }
        }
      }
    }
    // continue dropping piece
    for(var piece of this.tetriminos){
      if(!piece.dead){
        for(var block of piece.coords){
          if(block[1] <= this.gridHeight){
            this.changeColor(block[0],block[1], '#0d151ae3');
          }
        }
        for(var block of piece.coords){
          block[1]-=1;
          this.changeColor(block[0],block[1], piece.color, true);
        }
      //otherwise lock piece in place and save to grid
      }else{ 
        if(gameover){
          this.resetGrid();
        }
        else{
          for(var block of piece.coords){
            this.grid[this.gridHeight - block[1]][block[0]-1].filled=true;
            this.tetriminos = this.tetriminos.filter((e) => e!== piece);
          }
        }
      }
    }
    // if all pieces have dropped, or enough ticks pass, generate a new piece
    if(this.ticksSinceLastPiece > this.ticksBetweenPieces){
      this.ticksSinceLastPiece = 0;
      this.tetriminos.push(this.generateRandomTetrisPiece());
    }
  }

  public stopTetris(): void {

  }

  public resetGrid(): void {
    for(var row of this.grid){
      for(var cell of row){
        this.changeColor(cell.column,cell.row, '#0d151ae3');
        cell.filled = false;
      }
    }
    this.tetriminos = [this.generateRandomTetrisPiece()];
    this.ticksSinceLastPiece = 0;
  }

  public pieceOutOfBounds(piece: TetrisPiece, maxHeight: number): boolean{
    for(var block of piece.coords){
      if(block[1] >= maxHeight + 1){
        return true;
      }
    }
    return false;
  }

  public generateRandomTetrisPiece(): TetrisPiece{
    var orientation = Math.floor(Math.random() * (4));
    var tetrominoSelect = Math.floor(Math.random() * (7));
    var tetrominoes: string[] = ['o', 's', 'z', 'l', 'i', 'j', 't' ];
    switch(tetrominoes[tetrominoSelect]){
      case 'o':{
        return new OPiece(this.gridWidth, this.gridHeight, orientation);
      }
      case 's':{
        return new SPiece(this.gridWidth, this.gridHeight, orientation);
      }
      case 'z':{
        return new ZPiece(this.gridWidth, this.gridHeight, orientation);
      }
      case 'l':{
        return new LPiece(this.gridWidth, this.gridHeight, orientation);
      }
      case 'i':{
        return new IPiece(this.gridWidth, this.gridHeight, orientation);
      }
      case 'j':{
        return new JPiece(this.gridWidth, this.gridHeight, orientation);
      }
      case 't':{
        return new TPiece(this.gridWidth, this.gridHeight, orientation);
      }
      default:{
        return new OPiece(this.gridWidth, this.gridHeight, orientation);
      }
    }
  }

  public expandModal(): void {
    var modal = document.getElementById('modal');
    var start = document.getElementById('start');
    var about = document.getElementById('about');
    var contact = document.getElementById('contact');
    var work = document.getElementById('work');

    about?.classList.add('blinkingBriefly');
    contact?.classList.add('blinkingBriefly');
    work?.classList.add('blinkingBriefly');
    modal?.classList.remove('blinking');
    modal?.classList.add('expanded');
    modal?.classList.add('paused');
    start!.style.display = 'none';
    this.typeTest();
  }

  public typeTest(): void {
    var name = document.getElementById('name');
    var position = document.getElementById('position');
    var position2 = document.getElementById('position2');
    name?.classList.add('animateName');
    //name?.classList.remove('hidden');
    position?.classList.add('animatePosition');
    position2?.classList.add('animatePosition2');
  }

  public expandAbout(): void {
    var modal = document.getElementById('modal');
    var personalInfo = document.getElementById('personalInfoContainer');
    var work = document.getElementById('work');
    var contact = document.getElementById('contact');
    var about = document.getElementById('about');
    var aboutMe = document.getElementById('aboutMe');
    var workInfo = document.getElementById('workInfo');
    var contactInfo = document.getElementById('contactInfo');
    modal?.classList.toggle('expandAbout');
    personalInfo?.classList.toggle('verticalCollapse');
    work?.classList.toggle('horizontalCollapse');
    contact?.classList.toggle('horizontalCollapse');
    about?.classList.toggle('center');
    aboutMe?.classList.remove('remove');
    workInfo?.classList.add('remove');
    contactInfo?.classList.add('remove');
  }

  public expandWork(): void {
    var modal = document.getElementById('modal');
    var personalInfo = document.getElementById('personalInfoContainer');
    var work = document.getElementById('work');
    var contact = document.getElementById('contact');
    var about = document.getElementById('about');
    var aboutMe = document.getElementById('aboutMe');
    var workInfo = document.getElementById('workInfo');
    var contactInfo = document.getElementById('contactInfo');
    modal?.classList.toggle('expandAbout');
    personalInfo?.classList.toggle('verticalCollapse');
    work?.classList.toggle('center');
    contact?.classList.toggle('horizontalCollapse');
    about?.classList.toggle('horizontalCollapse');
    aboutMe?.classList.add('remove');
    workInfo?.classList.remove('remove');
    contactInfo?.classList.add('remove');
  }

  public expandContact(): void {
    var modal = document.getElementById('modal');
    var personalInfo = document.getElementById('personalInfoContainer');
    var work = document.getElementById('work');
    var contact = document.getElementById('contact');
    var about = document.getElementById('about');
    var aboutMe = document.getElementById('aboutMe');
    var workInfo = document.getElementById('workInfo');
    var contactInfo = document.getElementById('contactInfo');
    modal?.classList.toggle('expandContact');
    personalInfo?.classList.toggle('verticalCollapse');
    work?.classList.toggle('horizontalCollapse');
    contact?.classList.toggle('center');
    about?.classList.toggle('horizontalCollapse');
    aboutMe?.classList.add('remove');
    workInfo?.classList.add('remove');
    contactInfo?.classList.remove('remove');
  }

  public openWillowtreeLink(): void {
    window.open('https://www.willowtreeapps.com/', '_blank');
  }

  public openKinsaleLink(): void {
    window.open('https://www.kinsaleins.com/', '_blank');
  }

  public openCFALink(): void {
    window.open('https://www.cfainstitute.org/', '_blank');
  }

  public openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/anthony-wash-9b365380/', '_blank');
  }

  public openGithub(): void {
    window.open('https://github.com/adtwash', '_blank');
  }

  public email(): string {
    return "mailto:adtwash@gmail.com?subject=Hi%20Anthony!";
  }
}
