import { Component, inject } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { countries } from '../../data/countries';
import { states } from '../../data/states';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/directives/validators';
import { LoginService } from 'src/app/services/login.service';
import { RegisterDetail } from '../../models/registerDetails.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private userService: LoginService) { }
  states: { [key: string]: { id: string; name: string; }[] } = states;
  countries = countries;
  hide = true;
  hide1 = true;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  gg = FormControl;
  signupMat = this.fb.group({
    firstName: [null, [Validators.required, Validators.maxLength(20)]],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phoneNumber: [null, [Validators.required]],
    country: [null, Validators.required],
    state: [null, Validators.required],
    gender: [null, Validators.required],
    password: [null, [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[$@$!%*?&]).{6,}$/)]],
    confirmPassword: [null, Validators.required]
  },
    {
      validator: CustomValidators.confirmPasswordValidator(),
    } as AbstractControlOptions
  );
  //func to get form values
  getControl(formControl: string) {
    return this.signupMat.get(formControl);
  }

  //func to get states list by country key
  getStates() {
    const country = this.signupMat.get('country')?.value;
    if (country) {
      return this.states[country];
    }
    return [];
  }
  onSubmit() {
    // if (this.signupMat.valid) {
    //   localStorage.clear();
    //   // const users = JSON.parse(localStorage.getItem('users') || '[]');
    //   // users.push(this.signupMat.value);
    //   var users=this.signupMat.value;
    //   localStorage.setItem('users', JSON.stringify(users));
    //   this.router.navigate(['/auth/login']);
    //   this.toastr.success('User registered successfully', 'Success!');
    // } else {
    //   this.toastr.warning('Please write again', 'Invalid Credential!');
    // }
    if (this.signupMat.valid) {
      let registerDetails: RegisterDetail = {
        userId:0,
        firstName: this.signupMat.get('firstName')?.value!,
        lastName: this.signupMat.get('lastName')?.value!,
        email: this.signupMat.get('email')?.value!,
        phoneNumber: this.signupMat.get('phoneNumber')?.value!,
        countryId: this.signupMat.get('country')?.value!,
        stateId: this.signupMat.get('state')?.value!,
        gender: this.signupMat.get('gender')?.value!,
        isDeleted: false,
        password: this.signupMat.get('password')?.value!
      };
      this.userService.register(registerDetails).subscribe(
        (res:any)=>{
          if(res>0){
            this.toastr.success('User registered successfully', 'Success!');
          }
        else{
          this.toastr.error('User already exists', 'Error!');
        }
      });
    }
    else {
        this.toastr.warning('Please write again', 'Invalid Credential!');
      }
  }
}
