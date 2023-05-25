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

  ngOnInit(){
    //Entscheiden, ob neuer Eintrag angelegt werden soll oder bestehender editiert werden soll
    //entweder es kommt eine ID mit, oder nicht
    const id = this.route.snapshot.params["id"];
    if(id){
      //edit
      this.isUpdatingEintrag = true;
      this.bs.getSingleEintrag(id).subscribe(eintrag => {
        this.eintrag = eintrag;
        this.initEintrag();
      })
    }
    this.initEintrag();
  }

  //in form-html geben wir formControlName=name an und name ist hier der Schlüssel dazu
  initEintrag(){
    this.buildRatingsArray();
    this.buildKommentarsArray();
    this.eintragForm = this.fb.group({
      id: this.eintrag.id,
      text: this.eintrag.text,
      ratings: this.ratings,
      kommentars: this.kommentars
    });

    this.eintragForm.statusChanges.subscribe(
    )
  }

  buildRatingsArray(){
    if(this.eintrag.ratings){
      this.ratings = this.fb.array([]);
      for(let ein of this.eintrag.ratings){
        let fg = this.fb.group({
          id: ein.id,
          rating: ein.rating
        });
        this.ratings.push(fg);
      }
    }
  }

  buildKommentarsArray(){
    if(this.eintrag.kommentars){
      this.kommentars = this.fb.array([]);
      for(let ein of this.eintrag.kommentars){
        let fg = this.fb.group({
          id: ein.id,
          text: ein.text
        });
        this.kommentars.push(fg);
      }
    }
  }


  //beim Formular Rating hinzufügen
  addRatingControl(){
    this.ratings.push(this.fb.group({id:0,rating:0}));
  }

  //beim Formular Kommentar hinzufügen
  addKommentarControl(){
    this.kommentars.push(this.fb.group({id:0,kommentar:null}));
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

    //Filter: leert Daten
    this.eintragForm.value.kommentars = this.eintragForm.value.kommentars.filter(
      (kommentar: {text: string;}) => kommentar.text
    );

    this.eintragForm.value.ratings = this.eintragForm.value.ratings.filter(
      (rating: {rating: number;}) => rating.rating
    );

    const eintrag: Eintrag = EintragFactory.fromObject(this.eintragForm.value);

    if(this.isUpdatingEintrag){
      this.bs.updateEintrag(eintrag).subscribe(res => {
        this.router.navigate(["../../padlets", eintrag.padlet_id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(eintrag);
      this.bs.createEintrag(eintrag).subscribe(res => {
        this.eintrag = EintragFactory.empty();
        this.eintragForm.reset(EintragFactory.empty());
        this.router.navigate(["../eintrags"], {relativeTo: this.route});
      });
    }
  }

}
