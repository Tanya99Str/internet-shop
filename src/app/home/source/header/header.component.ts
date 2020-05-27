import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmExitComponent} from '../../../dialog/confirm-exit/confirm-exit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  confirmExit() {
    const dialogRef = this.dialog.open(ConfirmExitComponent, {
      width: '25vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  ngOnInit() {
  }

}
