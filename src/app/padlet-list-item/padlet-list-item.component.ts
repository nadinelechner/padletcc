import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {Eintrag} from "../shared/eintrag";
import {User} from "../shared/user";

@Component({
  selector: 'a.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit{
  @Input() padlet : Padlet | undefined;
  //neu - relevant?
  @Input() eintrag: Eintrag | undefined;
  @Input() user: User | undefined;

  ngOnInit() {
    console.log(this.padlet);
  }
}
