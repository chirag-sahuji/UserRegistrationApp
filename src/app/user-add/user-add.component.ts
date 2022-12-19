import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  id!: number
  isInAddMode!: boolean
  userform !: FormGroup
  states: string[] = []
  countrycodes: string[] = []
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute, private router: Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      fname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      mname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      lname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      age: ['', Validators.compose([Validators.required, Validators.min(18), Validators.max(60)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      cc:['',Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])]
    })
    this.id = this.route.snapshot.params['id'];
    this.isInAddMode = !this.id

    if (!this.isInAddMode) {
      this.api.getUById(this.id).subscribe(x => this.userform.patchValue(x));
    }
    this.api.getStates().subscribe(data => {
      this.states = data
    })
    this.api.getCountryCode().subscribe(data => {
      this.countrycodes = data
    })
  }

  get fname() {
    return this.userform.get('fname');
  }
  get mname() {
    return this.userform.get('mname');
  }
  get lname() {
    return this.userform.get('lname');
  }
  get age() {
    return this.userform.get('age');
  }
  get email() {
    return this.userform.get('email');
  }
  get cc() {
    return this.userform.get('cc');
  }
  get phone() {
    return this.userform.get('phone');
  }
  get street() {
    return this.userform.get('street');
  }
  get city() {
    return this.userform.get('city');
  }
  get state() {
    return this.userform.get('state');
  }
  get pincode() {
    return this.userform.get('pincode')
  }


  submit(): any {
    if (this.userform.invalid) {
      return;
    }
    if (this.isInAddMode) {
      this.add()
    } else {
      this.update()
    }
  }
  add(): any {
    if (this.userform.valid) {
      this.api.postU(this.userform.value)
        .subscribe({
          next: (res) => {
            this.toast.success({ detail:'Employee Details Added Successfully',duration:3000})
            //alert("Employee Details Added Successfully");
            this.userform.reset();
            this.router.navigate(['/users'])
          }
          , error: () => {
            this.toast.error({ detail: 'Error while adding employee details', duration: 3000 })
            //alert("Error while adding employee details")
          }
        })
    }
  }
  update(): any {
    this.api.updateU(this.userform.value, this.id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: 'Employee details updated successfully', duration: 3000 })
          //alert("Employee details updated successfully");
          this.userform.reset();
          this.router.navigate(['/users'])
        },
        error: () => {
          this.toast.error({ detail: 'Error while updating the employee details', duration: 3000 })         
          //alert("Error while updating the employee details")
        }
      })
  }

}



