import { Utils }					from '../utils';

const utils = new Utils();

export default function loadMapJson(cb: any) {
    utils.loadJSON('./assets/json/map.json', (data: any) => {
      this.jsonData = data;
      cb(null);
    });
}
