import {Padlet} from "./padlet";
import {Eintrag, Kommentar, Rating} from "./eintrag";

export class PadletFactory {
  static empty():Padlet {
    return new Padlet(0, '', new Date(), false,
      [{id:0, name:'', email:'', password:''}],
      [new Eintrag(
        0, '', 0, 0,
        [new Rating (0,0,0,0)],
        [new Kommentar(0,'',0,0)])
      ], );
  }

  static fromObject(rawPadlet:any): Padlet {
    const eintrags: Eintrag[] = rawPadlet.eintrags?.map((rawEintrag: any) => {
      return new Eintrag(
        rawEintrag.id,
        rawEintrag.text,
        rawEintrag.user_id,
        rawEintrag.padlet_id,
        rawEintrag.kommentars?.map((rawKommentar: any) => new Kommentar(0,'',0,0)),
        rawEintrag.ratings?.map((rawRating: any) => new Rating(0,0,0,0))
      );
    });
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      typeof(rawPadlet.erstellungsdatum)==='string'? new Date(rawPadlet.erstellungsdatum):rawPadlet.erstellungsdatum,
      rawPadlet.isprivate,
      rawPadlet.users,
      eintrags,
    );
  }
}
