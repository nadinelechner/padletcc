
import {User} from "./user";
import {Eintrag} from "./eintrag";
export {User} from "./user";
export {Eintrag} from "./eintrag";

export class Padlet {
  //die mit Fragezeichen sind optional deklariert
  constructor(public id:number,
              public name:string,
              public erstellungsdatum:Date,
              public isprivate:boolean,
              public users?: User[],
              public eintrags?: Eintrag[],
              ) {
    //
  }
}
