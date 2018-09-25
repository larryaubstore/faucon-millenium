export default function isPaused(cb) {
  if (this.isPaused === true) {
    cb("SKIP");
  } else {
    cb(null);
  }
}
