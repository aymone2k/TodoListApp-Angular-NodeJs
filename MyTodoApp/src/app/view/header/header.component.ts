import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

 salutationSub!: Subscription;
 welcome: string = '';
  constructor() { }

  ngOnInit() {
    const salutation = new Observable((salut)=>{
      salut.next("Bonjour");
      salut.next("User");
      salut.next("Bienvenue!");
      salut.complete();
    })

    this.salutationSub = salutation.subscribe(
      (value:any)=>{console.log(value), this.welcome = value},
      (error)=>{console.log("Error:"+error)},
      ()=>{console.log("observable complété")},)
  }

  ngOnDestroy(){
    this.salutationSub.unsubscribe();
  }
}
