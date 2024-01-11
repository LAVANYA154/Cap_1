import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
// ... Import statements

// ... Import statements
function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const cnfrmpassword = control.get('cnfrmpassword');

  if (password?.value !== cnfrmpassword?.value) {
    return { 'mustMatch': true };
  }

  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  //registerService: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private registerService: RegisterService) {
    // Your component initialization code here
  
      this.registerForm = this.formBuilder.group({
      firstName:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      lastName: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$')
      ])
      ,
      cnfrmpassword: new FormControl('',[Validators.required]), // Match the password
      employeeID: new FormControl('',[Validators.required, Validators.pattern('^[Pp][0-9]{4}$')]),
      contactNumber: new FormControl('',[Validators.required, Validators.pattern('^[6-9]\\d{9}$')])
    },{
      validator: passwordMatchValidator

    });
  }

  ngOnInit() {}
  

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = this.registerForm.value;
    // console.log(this.registerForm.value.firstName)
    // console.log(registerData)
    this.registerService.createRegister(registerData).subscribe(
      (response) => {
        // console.log(registerData.cnfrmpassword)
        console.log('Registration successful:', response);
        // After successful registration, you can navigate to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        // Handle registration failure here
      }
    );
  }
}
