import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 isAuth:boolean = true;
  constructor(private userService: UserService) {

   }

  ngOnInit() {
    this.userService.isAuth$.subscribe(
      (bool: boolean)=>{
        this.isAuth = bool
      } )
   }

  logout(){
    this.userService.logout();
  }


}
