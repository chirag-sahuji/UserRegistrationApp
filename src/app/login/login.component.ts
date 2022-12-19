import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  isAdmin !: Boolean;
  constructor(public fb:FormBuilder,private http:HttpClient,private route:Router,private api:ApiService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }
  LogIn() {
    if (this.loginForm.value.email === "admin@admin.com") {
      this.api.getadminCred().subscribe(res => {
        const admin = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (admin) {
          this.toast.success({ detail: 'Admin Login Successfull', duration: 3000 });
          this.loginForm.reset();
          this.route.navigate(['/home'])
        } else {
          this.toast.error({ detail: 'Admin Login Unsuccessfull', duration: 3000 });
        }
      })
    } else {
      this.api.getU().subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email;
        });
        if (user) {
          this.toast.success({ detail: `Hello ${user.fname}, you are logged-in successfully`, duration: 3000 })
          this.loginForm.reset();
          this.route.navigate(['/user-home'])
          // console.log(user);
          let User = JSON.stringify(user);
          localStorage.setItem('currentUser', User);
          // let P_User = JSON.parse(User);
          // let userId = User && P_User.id;
          // console.log(userId);
          // P_User.userId = userId;
          // console.log(P_User);
        } else {
          this.toast.error({ detail: 'User login Unsuccessfull', duration: 3000 })
        }
      })
    }
  }

}
