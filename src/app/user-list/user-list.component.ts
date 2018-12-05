import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, Subject, from } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { UserDetailsService } from '../user-details.service';
import { UserLocationComponent } from '../user-location/user-location.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  latitude: string;
  longitude: string;
  numbers: {};
  private searchTerms = new Subject<string>();

  constructor(
    private userDetailsService: UserDetailsService
    , private route: ActivatedRoute
    , private BootstrapModal: NgbModal
  ) {
    route.params.subscribe(val => {
      this.getUserDetails();
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.numbers = Array(5).fill(0).map((x, i) => i + 1);
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userDetailsService.searchUsers(term))
    ).subscribe(users => {

      this.users = users;
    });
  }

  getUserDetails(): void {
    const pageNumber = +this.route.snapshot.paramMap.get('pageNumber');
    this.userDetailsService.getUsers(pageNumber)
      .subscribe(users => {
        this.users = users;
        localStorage.setItem('UserSearchData', JSON.stringify(users));
      }
      );
  }

  getDuration(registrationDate: Date) {
    return this.userDetailsService.getDuration(registrationDate);
  }

  mouseEnter(userName: string, latitude: string, longitude: string) {
    const BModal = this.BootstrapModal.open(UserLocationComponent);
    BModal.componentInstance.userName = userName;
    BModal.componentInstance.latitude = latitude;
    BModal.componentInstance.longitude = longitude;
  }

  mouseLeave() {
    this.BootstrapModal.dismissAll();
  }

}
