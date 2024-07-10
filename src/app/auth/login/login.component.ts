import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { LoginDetails } from '../../models/login.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginDetails: LoginDetails = { email: '', password: '' };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService

  ) { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  getControl(value: string) {
    return this.loginForm.get(value);
  }
  // saveForm() {
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   const email = this.loginForm.value.email;
  //   const password = this.loginForm.value.password;
  //   // const user = users.find((user: any) => user.email === email && user.password === password);
  //   if(users.email==email && users.password==password && this.loginForm.valid){
  //     this.toastr.clear();
  //     localStorage.setItem('login_token', 'token');
  //     this.router.navigate(['/user']);
  //     this.toastr.success('Login Successful', 'Success!');
  //   }
  //   else{
  //     this.toastr.error('Invalid Credential!','Error');
  //   }

  // }
  login() {
    this.loginDetails.email = this.loginForm.value.email!;
    this.loginDetails.password = this.loginForm.value.password!;
    this.loginService.login(this.loginDetails).subscribe((res: any) => {
      if (res.isSuccess) {
        localStorage.setItem('login_token', 'token');
        this.router.navigate(['/user']);
        this.toastr.success(res.message);
      }
      else {
        this.toastr.error('Invalid Credential!', 'Error');
      }
    });
  }
}
