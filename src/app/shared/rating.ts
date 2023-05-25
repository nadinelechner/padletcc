import {User} from "./user";
export {User} from "./user";
import {Eintrag} from "./eintrag";
export {Eintrag} from "./eintrag";


export class Rating {
  constructor(public id:number,
              public rating:number,
              public user_id:number,
              public eintrag_id:number)
  {

  }
}
