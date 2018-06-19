import { EventLoop } from './eventLoop';


export class TileEngine {


    eventLoop: EventLoop = null;

    constructor() {
        this.eventLoop = new EventLoop();
        this.eventLoop.initialize();
    }

    render() {
        console.log('render');
    }

}
