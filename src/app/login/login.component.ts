import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faLock = faLock; // Use the faLock icon
  invalid:string='';
  loginForm: FormGroup;
  adminUsername: string='admin@prodapt.com';
  adminPassword: string='admin@123';
  constructor(private router: Router, private formBuilder: FormBuilder, public service: LoginService,private route: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }

  s: boolean = false;
 
  onSubmit() {
    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');

    if (usernameControl && passwordControl) {
      const username = usernameControl.value;
      const password = passwordControl.value;

      if (username === this.adminUsername && password === this.adminPassword) {
        // Admin login, navigate to a different router link
        this.router.navigate(['/home']); 
      } else {
        // Not admin, check credentials using your service
        this.service.check(username, password).subscribe(
          (res) => {
            if (res == true) {
              this.s = true;
              this.router.navigate(['/userview',username]);
              
            }
            else{
              this.invalid="Invalid credentials";
            }
          }
        );
      }
    }
  }
}
