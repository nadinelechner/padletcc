import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EintragFormComponent} from "./eintrag-form/eintrag-form.component";
import {LoginComponent} from "./login/login.component";
import {EintragDetailComponent} from "./eintrag-detail/eintrag-detail.component";

//pathMatch: nur wenn wirlich nix dran steht, soll Home Komponent geladen werden
//sonst wären ja Slugs dabei
//wir sagen hier, wo er uns hinleiten soll
//also zb bei slug /padlets soll  er padletlistcomponent laden bzw aufrufen
const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/:id', component:PadletDetailsComponent},
  {path: 'padlets/:id/eintrag/:eintrag_id', component: EintragDetailComponent},
  {path: 'padletbearbeiten', component: PadletFormComponent}, //canActivate:[CanNavigateToAdminGuard]},
  {path: 'padletbearbeiten/:id', component: PadletFormComponent}, //canActivate:[CanNavigateToAdminGuard]},
  {path: 'eintragbearbeiten/:eintrag_id', component: EintragFormComponent},
  {path: 'eintragerstellen', component: EintragFormComponent},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  //providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
