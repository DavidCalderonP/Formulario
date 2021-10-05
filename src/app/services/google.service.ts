import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private auht2 : gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor(private api: ApiService) {
    gapi.load('auth2', () =>{
      this.auht2 = gapi.auth2.init({
        client_id: '428039099069-2u20ibqhma0bfbbduqvcr3ic1c6rv82q.apps.googleusercontent.com',

      })
    })
  }

  public signIn(){
    this.auht2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    })
      .then(user=>{
        console.log(user)
        this.subject.next(user);
        console.log(this.subject)
      })
      .catch(()=>{
        this.subject.next(undefined);
      })
  }


  public signOut(){
    this.auht2.signOut()
      .then((user:gapi.auth2.GoogleUser)=>{
        this.subject.next(undefined);
      })
  }

  public getObservable():Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable();
  }

}
