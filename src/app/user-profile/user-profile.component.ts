import { Component, OnInit } from '@angular/core';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavorites();
  }

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser().subscribe((response) => {
        this.user = response;
        console.log(response);
      })
    }
  }

  editUserProfile(): void {
    this.dialog.open(EditProfileFormComponent);
  }

  deleteUserProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been removed!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

  getFavorites(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavouriteMovies.includes(movie._id)) {
          this.favorites.push(movie);
        }
      });

    });
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavorite(id).subscribe((response: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favorites;
    })
  }
}



