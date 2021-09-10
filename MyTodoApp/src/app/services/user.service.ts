import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.api;
  token: string = '';
  userId:string = '';
  isAuth$ = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient) {
    this.initAuth();
  }
//pour verifier si on a des données en local
initAuth(){
  if(typeof localStorage !== "undefined"){
    const data = JSON.parse(localStorage.getItem('userLogin')||'{}');
    if(data){
      if(data.userId && data.token){
        this.userId = data.userId;
        this.token = data.token;
        this.isAuth$.next(true);
      }
    }
  }
}
//création d'un user
  addUserToServer(user: User, image: File){
    //creation de l'objet userData contenant l'image
        return new Promise((resolve, reject)=>{
        let userData: FormData = new FormData();
        userData.append('user', JSON.stringify(user));
        userData.append('image', image);

    //gestion de la requete http
        this.httpClient
          .post(this.api+'/user/signup', userData)
          .subscribe(

            (signupData:Data)=>{
              console.log(signupData)
              if(signupData.status === 201){
                resolve(signupData)
             /*  this.getUserToServer(user.email, user.password)
                .then(()=>{
                  resolve(true);})
                .catch(err=>{reject(err)})
              }else{
                reject(signupData.message)
              } */
            }
              },
            (error)=>{
              reject(error)
            }
          )
      })
    }

//mise à jour d'un user
  updateUserToServer(id: string, user: User, image: File|string){
    return new Promise((resolve, reject)=>{
      let userData: FormData = new FormData();
      if(typeof image === 'string'){
        user.image = image;
      }else{
        userData.append('image', image);
      }
      userData.append('user', JSON.stringify(user))


      this.httpClient.put(this.api+'/user/updateuser/' +id, userData).subscribe(
        (data:Data)=>{
          if(data.status === 200){
            resolve(data);
          }else{
            reject(data);
          }

        },
        (err)=>{
          reject(err)
        }
      )
    })

  }

//connection d'un user

getUserToServer(email:string, password: string){
  return new Promise((resolve, reject)=>{
    this.httpClient.post(this.api+'/user/signin', {email: email, password: password}).subscribe(
      (authData:Data)=>{
        this.token = authData.token;
        this.userId = authData.userId;
        console.log(authData);
        this.isAuth$.next(true);
        //save authData in localStorage
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('userLogin', JSON.stringify(authData))
          }
        resolve(true);
      },
      (error)=>{
        reject(error)
      })
  })

}

logout(){
  this.isAuth$.next(false);
  this.userId = "";
  this.token = "";
  if(typeof localStorage !== "undefined"){
    localStorage.setItem('userLogin', '')
  }
}

}
