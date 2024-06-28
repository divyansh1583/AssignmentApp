import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import{countries} from '../../data/countries';
import{states} from '../../data/states';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signupMat-material',
  templateUrl: './signup-material.component.html',
  styleUrls: ['./signup-material.component.scss']
})
export class SignupMaterialComponent {
  states: { [key: string]: { id: string; name: string; }[] } = states;
  countries=countries;
  hide = true;
  hide1 = true;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  signupMat = this.fb.group({
    firstName: [null, [Validators.required,Validators.maxLength(20)]],
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
      validators: this.passwordMatchValidator
    }
  );
  //func to get form values
  getControl(formControl: string) {
    return this.signupMat.get(formControl);
  }

  //passwordmatcher validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  //func to get states list by country key
  getStates(){
    const country = this.signupMat.get('country')?.value;
    if (country) {
      return this.states[country];
    }
    return [];
  }
  onSubmit() {
    if( this.signupMat.valid) {
      localStorage.clear();
      console.log(this.signupMat.value);
      localStorage.setItem('email', this.signupMat.get('email')?.value!);
      localStorage.setItem('password', this.signupMat.get('password')?.value!);
      this.router.navigate(['/auth/login']);
    } else {
      alert('Please fill out all the required fields.');
    }
  }
}
