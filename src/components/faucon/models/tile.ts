export class Tile {

  imagePtr: any;
  xPos: number;
  yPos: number;
  width: number;
  height: number;
  offset: number;

  context: any;

  initialYPos: number;

  constructor(imagePtr: any, 
              xPos: number, 
              yPos: number, 
              width: number, 
              height: number,
              offset: number, 
              context: any) {
    this.imagePtr = imagePtr;
    this.xPos = xPos;
    this.yPos = yPos;
    this.initialYPos = yPos;
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.context = context;
  }

  setYPos(yPos: number) {
    this.yPos = yPos;
  }


}
