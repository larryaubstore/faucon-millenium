export default function moveFauconDemoMode(cb) {

  if (!this.isPaused && this.isOverlay) {
    var random = Math.floor(Math.random() * 40) + 1;

    if (random < 10 && random > 30) {


    } else {

      random = random - 20;
      random = random / 160;

      random = this.horizontalIndex + random;

      this.frameCounter++;
      if ( (this.frameCounter % 10) === 0) {
        this.frameCounter = 0;
        this.moveHorizontally(2);
      }
    }
    cb(null);
  } else {
    cb(null);
  } 
}
