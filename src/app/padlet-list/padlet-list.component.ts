import {Component, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
})

//hier legen wir Instanz der Variable an
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  //schickt die Daten wieder weg, wenn es das Event verlangt
  //@Output() showDetailsEvent = new EventEmitter<Padlet>();

  //wir rufen Padlets auf
  constructor(private bs:PadletStoreService) {
  }

  //showDetails(padlet: Padlet){
    //this.showDetailsEvent.emit(padlet);
  //}

  //getAll ist jetzt ein Observable, also das kann er nicht mehr direkt zuweisen
  //wie lösen wir das auf?
  //von unserm padletstoreserver rufen wir die getAll Methode auf, und an den Observables
  //müssma sich anmelden -> der braucht an Callback (das Ergebnis holen wir dann ab
  //und weisen das denn padlets zu
  //das ist asynchron
  ngOnInit() {
    this.bs.getAll().subscribe(
    res => this.padlets = res
    );
  }
}






