import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reviews-add',
  templateUrl: './reviews-add.component.html',
  styleUrls: ['./reviews-add.component.scss']
})
export class ReviewsAddComponent implements OnInit {
  reviewform!: FormGroup;
  type: string[] = [];
  types$: Observable<any>;
  username: String = '';
  user_id!: number;
  myDate!: Date;
  today: String = '';
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.reviewform = this.fb.group({
      name: [''],
      type: [''],
      rating: [''],
      comments : ['']
    })
    this.types$ = this.api.getcategory();
    if (localStorage.getItem('currentUser')) {
      let user = localStorage.getItem('currentUser');
      let p_user = user && JSON.parse(user);
      this.user_id = p_user.id;
      this.username = p_user.fname;
    }
  }
  submit() {
    let rf = this.reviewform.value;
    this.myDate = new Date();
    this.today = formatDate(this.myDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    // console.log(this.today);
    if (this.reviewform.valid) {
      if (localStorage.getItem('currentUser') && rf) {
        rf.userId = this.user_id;
        rf.userName = this.username;
        rf.timestamp = this.today;
        this.api.postReviews(rf).subscribe({
          next: (res) => {
            this.toast.success({ detail: "Review Added Successfully", duration: 3000 })
            this.reviewform.reset()
            this.router.navigate(['/review']);
          }, error: () => {
            this.toast.error({ detail: "Failed to add review", duration: 3000 });
          }
        })
      } else {
        this.toast.error({ detail: "Please Log In as User to add review", duration: 3000 });
      }
    }
  }
}
