import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
errorMessage!: string;
signInForm !: FormGroup;

  constructor(private userService : UserService,
              private formBuilder : FormBuilder,
              private router :Router) {}

  ngOnInit(): void {
    this.initSignInForm();
  }

  initSignInForm(){
    this.signInForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.pattern('[a-zA-Z ]{6,}')]],//6min
    })
  }

  get controlForm(){
    return this.signInForm.controls; //reccup les champs saisies du form pour control
  }

  onSignIn(){
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.userService.getUserToServer(email, password).then(
      ()=>{
        this.router.navigate(['/welcome']);
      }
    ).catch(
      (err)=>{
        this.errorMessage = err.message;

      })

  }

}
