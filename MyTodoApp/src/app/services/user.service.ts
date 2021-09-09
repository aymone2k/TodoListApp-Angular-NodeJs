import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.api;

  constructor(private httpClient: HttpClient) { }
//création d'un user
  addUserToServer(user: User, image: File){
    //creation de l'objet userData contenant l'image
        return new Promise((resolve, reject)=>{
        let userData: FormData = new FormData();
        userData.append('user', JSON.stringify(user));
        userData.append('image', image);
        console.log(userData)

    //gestion de la requete http
        this.httpClient
          .post(this.api+'/user/signup', userData)
          .subscribe(
            (data:Data)=>{
              console.log(data)
              if(data.status === 201){
                resolve(data)
              }else{
                reject(data.message)
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

getUserToServer(user: User){

}

}
