import { EventLoop } from './eventLoop';
import { Faucon } from './faucon';


export class TileEngine {


    eventLoop: EventLoop = null;

    constructor(containerWidth: number, containerHeight: number, faucon: Faucon) {
        this.eventLoop = new EventLoop(containerWidth, containerHeight, faucon);
        this.eventLoop.initialize();
    }

    render() {
        console.log('render');
    }


    isPaused() {
      return this.eventLoop.isPaused();
    }

    isOverlay() {
      return this.eventLoop.isOverlay();
    }

    isInitialMode() {
      return this.eventLoop.isInitialMode();
    }

    pause() {
      this.eventLoop.pause();
    }

    hideOverlay() {
      this.eventLoop.hideOverlay();
    }

    explosion() {
      this.eventLoop.explosion();
    }

}
