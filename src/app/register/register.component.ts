import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup;
  post: any;
  
  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
        'email':
          [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
        'pass':
          [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        'passRep':
          [null, Validators.compose([Validators.required, Validators.minLength(5)])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  addPost(post: { email: any; pass: any; passRep: any; }) {
    alert(`Post: ${post.email} ${post.pass} ${post.passRep}`);
  }
}

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [p: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    // @ts-ignore
    const password: string = control.get('pass').value; // get password from our password form control
    // @ts-ignore
    const confirmPassword: string = control.get('passRep').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      // @ts-ignore
      control.get('passRep').setErrors({ NoPassswordMatch: true });
    }
  }
}