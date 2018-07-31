import { EventLoop } from './eventLoop';


export class TileEngine {


    eventLoop: EventLoop = null;

    constructor(containerWidth: number, containerHeight: number) {
        this.eventLoop = new EventLoop(containerWidth, containerHeight);
        this.eventLoop.initialize();
    }

    render() {
        console.log('render');
    }


    pause() {
      this.eventLoop.pause();
    }

}
