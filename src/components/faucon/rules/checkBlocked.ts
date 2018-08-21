export default function checkBlocked(cb) {

  if (this.isBlocked()) {
    // ne rien faire
  } else {
    this.offsetY = (this.offsetY + 1)
    if (this.offsetY > this.tileHeight) {
      this.offsetY = 0;
      this.moduloTile = (this.moduloTile + 1 ) % this.moduloRange;
      this.verticalIndex = this.verticalIndex + 1;
    }
  }
  cb(null);
}
