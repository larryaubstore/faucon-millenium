export default function initContext (cb: any) {

  this.context = ( document.getElementById("viewport") as any).getContext("2d");
  this.tileWidth = this.jsonData['tileWidth'];
  this.tileHeight = this.jsonData['tileHeight'];
  this.collisionList = this.jsonData['labels'];
  this.moduloRange = Math.ceil(this.gameHeight / this.tileHeight) + 1;

  cb(null);
}
