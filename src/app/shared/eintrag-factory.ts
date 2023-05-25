import {Eintrag} from "./eintrag";

export class EintragFactory {
  static empty():Eintrag {

    return new Eintrag(0, '', 0,0,
      [{id: 0, rating:0, user_id:0, eintrag_id:0}],
      [{id: 0, text:'', user_id:0, eintrag_id:0}])
  }

  static fromObject(rawEintrag:any): Eintrag{
    return new Eintrag(
      rawEintrag.id,
      rawEintrag.text,
      rawEintrag.user_id,
      rawEintrag.padlet_id,
      rawEintrag.ratings,
      rawEintrag.kommentars
    );
  }
}
