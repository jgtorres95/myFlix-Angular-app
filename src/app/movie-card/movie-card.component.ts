import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  addToFavorites(movieID: any): void {
    const token = localStorage.getItem('token');
    console.log(movieID);
    console.log(token)
    this.fetchApiData.addFavorite(movieID).subscribe((response: any) => {
      this.snackBar.open('Added to your favourites!', 'OK', {
        duration: 3000,
      });
      console.log(response);
      this.ngOnInit();
    });
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log(resp)
      const currentUser = resp.Username
      console.log(currentUser)
      this.favoriteMovies = resp.FavoriteMovies
      console.log(this.favoriteMovies);
    });
  }

  goToGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  goToDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }

