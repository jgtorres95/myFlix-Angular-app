/**
 * used to render the navbar
 * @module NavbarComponent
 */

import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) { }

  ngOnInit(): void {
  }

  openProfile(): void {
    this.router.navigate(['profile']);
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }

  logoutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

}
