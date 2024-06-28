import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import{states} from '../../data/states';
import{countries} from '../../data/countries';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})

export class SignupFormComponent {
  states: { [key: string]: { id: string; name: string; }[] } = states;
  countries=countries;
  

  constructor(private fb: FormBuilder, private router:Router) { }

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    country: ['', Validators.required],
    state: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validators: this.passwordMatchValidator
  });

  getControl(formControl:string){
    return this.signupForm.get(formControl);
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  
  getStates(){
    const country = this.signupForm.get('country')?.value;
    if (country) {
      return this.states[country];
    }
    return [];
  }
  onSubmit() {
    if( this.signupForm.valid) {
      console.log(this.signupForm.value);
      localStorage.setItem('email', this.signupForm.get('email')?.value!);
      localStorage.setItem('password', this.signupForm.get('password')?.value!);
      this.router.navigate(['/auth/login']);
    } else {
      alert('Please fill out all the required fields.');
    }
    
      // const formData = this.signupForm.value;
      // alert(
      //   `Form submitted successfully! Here are the form values:\n\n` +
      //   `First Name: ${formData.firstName}\n` +
      //   `Last Name: ${formData.lastName}\n` +
      //   `Email: ${formData.email}\n` +
      //   `Phone Number: ${formData.phoneNumber}\n` +
      //   `Country: ${formData.country}\n` +
      //   `State: ${formData.state}\n` +
      //   `Gender: ${formData.gender}\n`
      // );
  }
}
