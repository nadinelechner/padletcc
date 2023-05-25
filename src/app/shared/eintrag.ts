
import {Rating} from "./rating";
export {Rating} from "./rating";
import {Kommentar} from "./kommentar";
export {Kommentar} from "./kommentar";
import {Padlet} from "./padlet";
export {Padlet} from "./padlet";

export class Eintrag {
  constructor(public id:number,
              public text:string,
              public user_id:number,
              public padlet_id:number,
              public ratings?: Rating[],
              public kommentars?: Kommentar[],
              )

  {

  }
}
