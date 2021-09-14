import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
userImage!:string;
userEmail!:string;
userName!:string;
modifProfil : boolean=false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userEmail=this.userService.userEmail;
    this.userImage= this.userService.userImage;
    this.userName= this.userService.user;
  }

  OnModif(){
    this.modifProfil = true
  }
}
