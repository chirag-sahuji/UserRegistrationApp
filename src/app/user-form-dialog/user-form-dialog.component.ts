import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent implements OnInit {
  actionbtn : string="Add User"
  states: string[] = ['Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal']
  userform !: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UserFormDialogComponent>) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
        fname: ['', Validators.required],
        mname: ['', Validators.required],
        lname: ['',Validators.required],
        age: ['', Validators.required],
        phone:['',Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['',Validators.required]
    })
    if (this.editData) {
      this.actionbtn = "Update"
      this.userform.controls['fname'].setValue(this.editData.fname)
      this.userform.controls['mname'].setValue(this.editData.mname)
      this.userform.controls['lname'].setValue(this.editData.lname)
      this.userform.controls['age'].setValue(this.editData.age)
      this.userform.controls['phone'].setValue(this.editData.phone)
      this.userform.controls['street'].setValue(this.editData.street)
      this.userform.controls['city'].setValue(this.editData.city)
      this.userform.controls['state'].setValue(this.editData.state)
      this.userform.controls['pincode'].setValue(this.editData.pincode)
    }
  }
  
  add(): any {
    if (!this.editData) {
      if (this.userform.valid) {
        this.api.postU(this.userform.value)
          .subscribe({
            next: (res) => {
              alert("Employee Details Added Successfully");
              this.userform.reset();
              this.dialogRef.close('add')
            }
            , error: () => { alert("Error while adding employee details") }
          })
      }
    } else {
      this.update();
    }
  }
  update(): any{
    this.api.updateU(this.userform.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Employee details updated successfully");
          this.userform.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the employee details")
        }
      })
  }

}
