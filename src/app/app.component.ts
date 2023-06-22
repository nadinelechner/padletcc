import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";
import {Padlet} from "./shared/padlet";

@Component({
  selector: 'bs-root',

  //wenn die app.component kommt, soll ein Template gerendert werden
  //template: `<bs-padlet-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-padlet-list>
  //<bs-padlet-details *ngIf="detailsOn" [padlet]="padlet" (showListEvent)="showList()"></bs-padlet-details>`,
  templateUrl: './app.component.html',

  styleUrls: []
    //['./app.component.css']
})

export class AppComponent {

  constructor(private authService: AuthenticationService) { }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

  //brauchts nimma wegen Routing
  /*list ist auf true also soll angezeigt werden und detail nicht, wäre beides auf true
  würde beides angezeigt werden
  listOn = true;
  detailsOn = false;
  padlet: Padlet | undefined;
  showList(){
    this.listOn = true;
    this.detailsOn = false;}
    showDetails(padlet:Padlet){
    this.padlet = padlet;
    this.listOn = false;
    this.detailsOn = true;
  }*/
}
