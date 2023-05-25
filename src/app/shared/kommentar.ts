import {User} from "./user";
export {User} from "./user";
import {Eintrag} from "./eintrag";
export {Eintrag} from "./eintrag";
import {Padlet} from "./padlet";
export {Padlet} from "./padlet";

export class Kommentar {
  constructor(public id:number,
              public text:string,
              public user_id:number,
              public eintrag_id:number)
  {

  }
}
