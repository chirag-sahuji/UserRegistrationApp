import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['fname','mname','lname','age','phone','street','city','state','pincode','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog,private api:ApiService) { }

  ngOnInit(): void {
    this.getAllusers()
  }
  openDialog() {
    this.dialog.open(UserFormDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'add') {
        this.getAllusers();
      }
    })
  }
  getAllusers() {
    this.api.getU().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        alert("Error while fetching employee details");
      }
    })
  }
  editUser(row: any) {
    this.dialog.open(UserFormDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllusers();
      }
    })
  }

  delUser(id: number) {
    this.api.deleteU(id)
      .subscribe({
        next: (res) => {
          alert("Deleted Employee details successfully");
          this.getAllusers();
        }, error: () => {
          alert("Error while deleting employee deatils")
        }
      })
  }

}
