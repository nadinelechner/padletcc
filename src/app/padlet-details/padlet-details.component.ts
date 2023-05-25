import {Component, OnInit} from '@angular/core';
import {Eintrag, Padlet} from "../shared/padlet";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrService} from "ngx-toastr";
import {EintragFactory} from "../shared/eintrag-factory";
//import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})

export class PadletDetailsComponent implements OnInit {
  //brauchts mitn Routing auch nicht mehr
  //über den parameternamen padlet bekommst du das Padlet
  //@Input() padlet:Padlet | undefined;
  //Events
  //@Output() showListEvent = new EventEmitter<any>();
  //showPadletList() {
  //this.showListEvent.emit();}

  //asynchron, deswegen kanns sein das Padlets null sind
  padlet: Padlet = PadletFactory.empty();

  constructor(private bs: PadletStoreService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService)
              /*public authService: AuthenticationService)*/ {}

  ngOnInit() {
    //Auslesen des Parameters aus der Route
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['id']).subscribe(
      (p: Padlet) => this.padlet = p
    );
    //console.log(this.padlet);
  }

  removePadlet() {
    if (confirm('Willst du das Padlet wirklich löschen?')) {
      this.bs.remove(this.padlet?.id).subscribe(
        (res: any) => {
          this.router.navigate(['../'],
            {relativeTo: this.route});
          this.toastr.success("Das Padlet wurde gelöscht", "Löschen");
        }
      );
    }
  }
}

