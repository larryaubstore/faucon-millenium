export default function isPaused(cb) {
  if (this.isPaused === true) {
    cb("isPaused");
  } else {
    cb(null);
  }
}
