import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { formatDate } from '@angular/common';
import { By } from '@angular/platform-browser';
@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {
  isUser: boolean = false;
  username: String = '';
  displayedColumns: string[] = ['Review For', 'Review By', 'Review Type', 'Rating', 'Comments','Date and Time'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: ApiService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllReviews();
    if (localStorage.getItem('currentUser')) {
      this.isUser = true
      let useritem = localStorage.getItem('currentUser');
      let P_User = useritem && JSON.parse(useritem);
      this.username = P_User.fname;
    }
    else {
      this.isUser = false;
    }
  }
  getAllReviews() {
    this.api.getReviews().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: () => {
        this.toast.error({detail:'Error while fetching user reviews',duration:3000})
      }
    }) 
  }
  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }
  allreviews() {
    this.getAllReviews();
  }
  filterUser() {
    if (localStorage.getItem('currentUser')) {
      let userItem = localStorage.getItem('currentUser');
      let p_user = userItem && JSON.parse(userItem);
      this.dataSource.filter = p_user.fname;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
