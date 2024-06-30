import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private router:Router,private toastr: ToastrService) { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  getControl(value: string) {
    return this.loginForm.get(value);
  }
  saveForm() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // const user = users.find((user: any) => user.email === email && user.password === password);
    if(users.email==email && users.password==password && this.loginForm.valid){
      localStorage.setItem('login_token', 'token');
      this.router.navigate(['/user']);
    }
    else{
      this.toastr.warning('Please write again', 'Invalid Credential!');
    }
    
  }
}
