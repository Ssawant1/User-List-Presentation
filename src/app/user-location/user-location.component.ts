import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {    
  }
  closePopup() {
    this.activeModal.close();
  }
}
