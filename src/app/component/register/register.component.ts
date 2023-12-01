import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/login-lottie.json',
  };
  error: String = '';
  username: String = '';
  name:String = '';
  password: String = '';
  cpassword:String = '';

  uservalidator:Boolean = false;
  passvalidator:Boolean = false;

  constructor(private authService:AuthService){}
 
  validate():void{
    let pattern= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}");
    if(this.password.match(pattern)){
      this.passvalidator = true;
    }
    console.log(this.passvalidator);
    
  }
  register(form: NgForm): void {
    if(this.password!==this.cpassword){
      this.error = "Password Missmatch"
    } else {
      let body = {
        username:this.username,
        password:this.password,
        name:this.name
      }
      this.authService.register(body).subscribe({
        next:(resp:any)=>{
          console.log(resp);
        },
        error:(err)=>{
          let message: String = err.error.error.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
        complete:()=>{
          form.reset()
          this.error = "Resitration Successful!!!"
        }
      })
    }
  }
}
