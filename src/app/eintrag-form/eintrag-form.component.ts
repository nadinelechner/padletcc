import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {EintragFactory} from "../shared/eintrag-factory";
import {EintragStoreService} from "../shared/eintrag-store.service";
import {Eintrag} from "../shared/eintrag";


@Component({
  selector: 'bs-eintrag-form',
  templateUrl: './eintrag-form.component.html',
  styles: [
  ]
})

export class EintragFormComponent{

  eintrag = EintragFactory.empty();
  eintragForm: FormGroup;
  errors: {[key:string]:string} = {};
  ratings: FormArray;
  kommentars: FormArray;
  isUpdatingEintrag = false;

  constructor(private fb: FormBuilder,
              private bs: PadletStoreService,
              private route: ActivatedRoute,
              private router:Router){
    this.eintragForm = this.fb.group({});
    this.ratings = this.fb.array([]);
    this.kommentars = this.fb.array([]);
  }

  ngOnInit() {
    //Entscheiden, ob neuer Eintrag angelegt werden soll oder bestehender editiert werden soll
    //entweder es kommt eine ID mit, oder nicht
    let url = this.router.url;
    let url_list = url.split('/');
    let action = url_list[3];


    //funzt nicht, weil getSingleEintrag zwei Parameter erwartet??
//auskommentieren = PROBLEM
    if(action == "eintragbearbeiten") {
      //edit
      let url = this.router.url;
      let url_list = url.split('/');
      let eintrag_id = url_list[4];
      let padlet_id = url_list[2];

      this.isUpdatingEintrag = true;
      this.bs.getSingleEintrag(Number(padlet_id), Number(eintrag_id)).subscribe(eintrag => {
        this.eintrag = eintrag;
        this.initEintrag();
      })
    }
    this.initEintrag();
  }

  //in form-html geben wir formControlName=name an und name ist hier der Schlüssel dazu
  initEintrag(){
    this.eintragForm = this.fb.group({
      id: this.eintrag.id,
      text: this.eintrag.text,
      ratings: this.ratings,
      kommentars: this.kommentars
    });

    this.eintragForm.statusChanges.subscribe(
    )
  }

  /*updateErrorMessages(){
    this.errors = {};
    //geh in die Errormessages und such die richtige
    //dirty: überprüft, dass die Fehlermeldug nicht schon kommt obwohl der User
    //noch gar nicht mit dem Feld interagiert hat
    for(const message of PadletFormErrorMessages){
      const control = this.padletForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }*/

  submitForm(){
    let url = this.router.url;
    let url_list = url.split('/');
    const padlet_id = url_list[2];

    console.log("padletid");
    console.log(padlet_id);

    const eintrag: Eintrag = EintragFactory.fromObject(this.eintragForm.value);

    if(this.isUpdatingEintrag){
      this.bs.updateEintrag(eintrag).subscribe(res => {
        this.router.navigate(["../../"], {
          relativeTo: this.route
        });
      });
    } else {
      console.log("Eintrag");
      console.log(eintrag);
      this.eintrag.user_id = 1;

      console.log("padletid");
      console.log(padlet_id);

      this.bs.createEintrag(Number(padlet_id), eintrag).subscribe(res => {
        this.eintrag = EintragFactory.empty();
        this.eintragForm.reset(EintragFactory.empty());


        this.router.navigate(["../"], {relativeTo: this.route});
      });
    }
  }

}
