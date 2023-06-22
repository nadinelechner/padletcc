import {Padlet} from "./padlet";
import {Eintrag, Kommentar, Rating} from "./eintrag";
import {User} from "./user";


//für REST!! - leere Padlets für Umwandeln von JSON Objekte
//kann versch. Datentypen behandeln
//Zustandslosigkeit: sErver speichert nämlich keine Infos über Zustand vom Client


export class PadletFactory {
  static empty():Padlet {
    return new Padlet(0, '', new Date(), false,
      0,
      [new User(
        0, '', '', '')],
      [new Eintrag(
        0, '', 0, 0,
        [new Rating (0,0,0,0)],
        [new Kommentar(0,'',0,0)])
      ], );
  }


  static fromObject(rawPadlet: any): Padlet {
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
      rawPadlet.user_id,
      rawPadlet.users,
      eintrags,
      //eintrags war vorher ohne rawPadlet?
    );
  }
}
