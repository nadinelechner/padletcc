import {Component, OnInit} from '@angular/core';
import {Eintrag} from "../shared/eintrag";
import {EintragFactory} from "../shared/eintrag-factory";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'bs-eintrag-detail',
  templateUrl: './eintrag-detail.component.html',
  styles: [
  ]
})
export class EintragDetailComponent implements OnInit{
  eintrag: Eintrag = EintragFactory.empty();

  constructor(private bs: PadletStoreService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    //damit holen wir uns die id aus der URL
    let url = this.router.url;
    let url_list = url.split('/');
    let padlet_id = url_list[2];
    let eintrag_id = url_list[4];

    //Problem???
    this.bs.getSingleEintrag(Number(padlet_id), Number(eintrag_id)).subscribe(
      (e:Eintrag)=>this.eintrag=e
    );
  }


  removeEintrag() {
    if (confirm('Willst du den Eintrag wirklich löschen?')) {
      this.bs.removeEintrag(this.eintrag?.id).subscribe(
        (res: any) => {
          this.router.navigate(['../../'],
            {relativeTo: this.route});
          this.toastr.success("Der Eintrag wurde gelöscht", "Löschen");
        }
      );
    }
  }
}
