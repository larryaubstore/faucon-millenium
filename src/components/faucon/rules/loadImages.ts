import * as async     from 'async';
import * as debug			from 'debug';

const log = debug('rules:loadImages');

export default function loadImages(cb: any) {

   let total = 0;
   for (var name in this.jsonData['images']) {
       if (this.jsonData['images'].hasOwnProperty(name)) {
           this.aliasMap[name] = { 
             begin: total, 
             end: total + this.jsonData['images'][name]['files'].length
           };


           this.aliasMap[name].length = this.aliasMap[name].end - this.aliasMap[name].begin;

           total = total + this.jsonData['images'][name]['files'].length;


           for (var i = 0; i < this.jsonData['images'][name]['files'].length; i++) {
             this.srcList.push(this.jsonData['images'][name]['files'][i]);
           }
       }
   } 

   let count = 0;
   async.whilst( () => {

     log( 'count ==> ' + count);
     log( 'total ==> ' +  (total));
     return count < (total);
   }, 
   (eachCb: any) => {
     var imagePtr: any = null;


     if (count < total) {
       imagePtr = new Image();
       imagePtr.onload = async.apply(function(cb) { cb(null); }, eachCb);
       imagePtr.src = this.srcList[count];
       this.imageList.push(imagePtr);
     } 
     count++;

  }, (err: any, n: number) => {
     if (err) {
       cb(err);
     } else {
       cb(null);
     }
  });
}
