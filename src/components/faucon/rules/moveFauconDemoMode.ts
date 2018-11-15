export default function moveFauconDemoMode(cb) {
  if (!this.isPaused && this.isOverlay) {
    this.moveHorizontally(2);
    cb(null);
  } else {
    cb(null);
  } 
}
