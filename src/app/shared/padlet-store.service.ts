import { Injectable } from '@angular/core';
import {Eintrag, Padlet, User} from "./padlet";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";


//brauchen wir, weil komponentenübergreifender Datentyp Padlet
//dependcy injection ist unser freund

@Injectable({
  providedIn: 'root'
})
export class PadletStoreService {
  private api = 'http://padlet.s2010456019.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {
  }

  //Da kommt ein Array (Datenstrom) mit Padlets zurück, obersavble weil asynchron
  //für REST: private.api, httpclient, getAll..
  //bei http funktionieren jetzt alle http-verben
  getAll() : Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      //wir versuchens 3 mal
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:number) : Observable<Padlet>{
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      //wir versuchens 3 mal
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //Functions für das Padlet-Formular
  //Observables weil asynchrone Daten (damit kann man mit Ergebnis umgehen und Daten
  //weiter verarbeiten

  create(padlet: Padlet): Observable<any>{
    return this.http.post(`${this.api}/padlets`,padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(padlet: Padlet): Observable<any>{
    return this.http.put(`${this.api}/padlets/${padlet.id}`,padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error:Error | any):Observable<any> {
    return throwError(error);
  }

  remove(id:number) : Observable<any>{
    return this.http.delete(`${this.api}/padlets/${id}`)
      //wir versuchens 3 mal
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleEintrag(padlet_id:number, eintrag_id:number) : Observable<Eintrag>{
    return this.http.get<Eintrag>(`${this.api}/padlet/${padlet_id}/eintrag/${eintrag_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createEintrag(id:number, eintrag: Eintrag) : Observable<any>{
    return this.http.post(`${this.api}/eintrag/${id}`,eintrag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateEintrag(eintrag: Eintrag) : Observable<any>{
    return this.http.put(`${this.api}/eintrag/${eintrag.id}`,eintrag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeEintrag(id:number) : Observable<any>{
    return this.http.delete(`${this.api}/eintrag/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }






}
