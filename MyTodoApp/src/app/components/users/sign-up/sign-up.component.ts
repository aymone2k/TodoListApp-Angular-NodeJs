import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm !: FormGroup;
  imagePreview: string ="";
  constructor(private formBuilder:FormBuilder,
              private userService: UserService,
              private router: Router) {
              }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(){
    this.userForm = this.formBuilder.group({
      name:["", [Validators.required, Validators.minLength(6), ]],
      email:["", [Validators.required, Validators.email]],
      image:[null, Validators.required],
      password:["", [Validators.required, Validators.pattern('[a-zA-Z ]{6,}')]],//6min
      confirmPassword:["", Validators.required],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }) ;


  }


 get controlForm(){
  return this.userForm.controls; //reccup les champs saisies du form pour control
}

uploadImage(event: any){
 const file: File = (event.target ).files[0];
 //modif et update de image
  this.userForm.get('image')?.patchValue(file);
  this.userForm.get('image')?.updateValueAndValidity();
//affichage de l'image chargée
      const reader = new FileReader();
      reader.onload =()=>{
        if(this.userForm.get('image')?.valid){
          this.imagePreview = reader.result as string;
          console.log(this.userForm.value.image)
        }else{
        this.imagePreview = "";
        }
      }
      reader.readAsDataURL(file);
}



  onSignUp(){
  const newUser = new User();
   newUser.name = this.userForm.get('name')?.value;
   newUser.email = this.userForm.get('email')?.value;
   newUser.password = this.userForm.get('password')?.value;
   newUser.confirmPassword = this.userForm.get('confirmPassword')?.value;
   newUser.image ='';

   //save user
    this.userService.addUserToServer(newUser, this.userForm.value.image)
    .then(
      ()=>{
        this.userForm.reset();
          //  this.router.navigate(['/signin']);
      })
      .catch(
        (err)=>{
          console.log(err.message);
        }
      );

  }

}
