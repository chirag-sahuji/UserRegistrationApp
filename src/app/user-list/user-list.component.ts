import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
//import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age','email', 'phone', 'address', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: ApiService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.getAllusers()
  }
  getAllusers() {
    this.api.getU().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        this.toast.error({ detail: 'Error while fetching employee details', duration: 3000 })
        //alert("Error while fetching employee details");
      }
    })
  }
  delUser(id: number) {
    this.api.deleteU(id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: 'Deleted Employee details successfully', duration: 3000 })
          //alert("Deleted Employee details successfully");
          this.getAllusers();
        }, error: () => {
          this.toast.error({ detail: 'Error while deleting employee deatils', duration: 3000 })
          //alert("Error while deleting employee deatils")
        }
      })
  }

}
