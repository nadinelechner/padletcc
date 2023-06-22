import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {PadletStoreService} from "../shared/padlet-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";


@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: []
})
export class PadletFormComponent implements OnInit{
  padlet = PadletFactory.empty();
  padletForm: FormGroup;
  errors: {[key:string]:string} = {};
  eintrags: FormArray;
  isUpdatingPadlet = false;

  constructor(private fb: FormBuilder,
              private bs: PadletStoreService,
              private route: ActivatedRoute,
              private router:Router){
    this.padletForm = this.fb.group({});
    this.eintrags = this.fb.array([]);
  }

  ngOnInit(): void {
    //Entscheiden, ob neues Padlet angelegt werden soll oder bestehendes editiert werden soll
    //entweder es kommt Id mit, oder nicht
    const id = this.route.snapshot.params["id"];
    if(id){
      //edit
      this.isUpdatingPadlet = true;
      this.bs.getSingle(id).subscribe(padlet => {
        this.padlet = padlet;
        this.initPadlet();
      })
    }
    this.initPadlet();
  }

  //in form-html geben wir formControlName=name an und name ist hier der Schlüssel dazu
  initPadlet(){
    this.buildEintragsArray();
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name : [this.padlet.name, Validators.required],
      isprivate: [this.padlet.isprivate, Validators.required],
      erstellungsdatum: [this.padlet.erstellungsdatum, Validators.required],
      eintrags: this.eintrags
    });

    this.padletForm.statusChanges.subscribe(()=>
      this.updateErrorMessages()
    )
  }

  buildEintragsArray(){
    if(this.padlet.eintrags){
      this.eintrags = this.fb.array([]);
      for(let ein of this.padlet.eintrags){
        let fg = this.fb.group({
          id: new FormControl (ein.id),
          text: new FormControl (ein.text, [Validators.required])
        });
        this.eintrags.push(fg);
      }
    }
  }

  //beim Formular Eintrag hinzufügen
  addEintragControl(){
    this.eintrags.push(this.fb.group({id:0,text:null}));
  }

  updateErrorMessages(){
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
  }

  submitForm(){
    //mit Filter werden Werte gelöscht
    this.padletForm.value.eintrags = this.padletForm.value.eintrags.filter(
      (eintrag: {text: string;}) => eintrag.text
    );

    const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value);
    //user einfach kopieren
    padlet.users = this.padlet.users;
    if (this.isUpdatingPadlet) {
      this.bs.update(padlet).subscribe(res => {
        this.router.navigate(["../../padlets", padlet.id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(padlet);
      this.bs.create(padlet).subscribe( res => {
        console.log(res);
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../padlets"], {relativeTo: this.route});
      });

    }

  }
}
