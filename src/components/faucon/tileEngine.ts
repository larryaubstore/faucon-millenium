import { EventLoop }  from './eventLoop';
import { Faucon }     from './faucon';
import { Storage }    from '@ionic/storage';


export class TileEngine {


    eventLoop: EventLoop = null;

    constructor(containerWidth: number, 
                containerHeight: number, 
                faucon: Faucon,
                storage: Storage) {
        this.eventLoop = new EventLoop(containerWidth, containerHeight, faucon, storage);
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
