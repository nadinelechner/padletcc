export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const PadletFormErrorMessages = [
  new ErrorMessage ('name', 'required', 'Dein Padlet braucht einen Namen!'),
  new ErrorMessage ('isprivate', 'required', 'Bitte gib an, ob dein Padlet öffentlich oder privat sein soll!'),
  new ErrorMessage('erstellungsdatum', 'required', 'Es muss ein Erstellungsdatum angegeben werden!'),
  new ErrorMessage('text', 'required', 'Dein Eintrag braucht einen Text!')
];

