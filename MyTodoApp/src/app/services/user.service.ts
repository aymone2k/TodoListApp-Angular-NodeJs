import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.api;

  constructor(private httpClient: HttpClient) { }

  addUserToServer(user:User){
    this.httpClient
      .post(this.api+'/user/signup', user)
     // .post(this.api+'/user/signup.json', user)
      .subscribe(
        ()=>{
          console.log(user)
        },
        (error)=>{
          console.log(error)
        }
      )

  }
}
