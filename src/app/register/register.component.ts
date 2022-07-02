import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
// import { CrudService } from '../service/crud.service';
// import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( 
    public formBuilder: FormBuilder,
    private router : Router,
    private ngZone: NgZone,
    private http :HttpClient,
    private User: UserService
    ) {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        prenom: ['', [Validators.required, Validators.minLength(3)]],
        email: ['',[Validators.required, Validators.email]],
        password:['',[ Validators.required, Validators.minLength(8)]],
        // password1:['',[ Validators.required, Validators.minLength(8)]]
      })
     }

  ngOnInit(): void {  }

  get name(): any {
    return this.registerForm.get('name');
  }
  get prenom(): any {
    return this.registerForm.get('prenom');
  }
  get email(): any {
    return this.registerForm.get('email');
  }
  get password(): any {
    return this.registerForm.get('password');
  }
  get password1(): any {
    return this.registerForm.get('password1');
  }

  registerFormSubmit(form: FormGroup): void {

    this.User.createNewUser(this.registerForm.value).subscribe({
      next: (v) => console.log('User ajouté avec succès :', v),
      error: (e) => console.error('error createNewUser :',e),
      complete: () => this.ngZone.run(() => this.router.navigateByUrl('/login'))
    })

  }

  cancel() {
    this.router.navigateByUrl('/home')
  }

}
