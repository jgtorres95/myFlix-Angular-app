/**
 * Used to make HTTP requests to the myFlix API
 * @module FetchApiDataService
 */

import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


// Declaring the api url that will provide data for the client app
const apiUrl = 'https://cf-myflix-app.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /** 
   * API call for the user registration endpoint
   * @param userDetails 
   * @returns object containing data about registered user
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /** 
   * API call for the user login endpoint
   * @param userDetails 
   * @returns object containing data about registered user
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  /** 
   * API call to retrieve all movies
   * @returns the movies array
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  /** 
   * API call to retrieve data about a single movie by title
   * @returns object containing data about the requested movie
   */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to retrieve data about a single director
   * @returns object containing data about the requested director
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to retrieve data about a single genre
   * @returns object containing data about the requested genre
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to retrieve data about a single user
   * @returns object containing data about the requested user
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log(username);
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to retrieve data about a user's favorites
   * @returns array containing user's favorite movies
   */
  getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:ID', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to add a movie to a user's favorites
   * @param id for the movie being added
   * @returns object containing data about updated user
   */
  public addFavorite(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${id}`, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to update a user's profile
   * @param userData
   * @returns object containing data about updated user
   */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to delete a user
   * @param username for the user being deleted
   * @returns a text response confirming successful/unsuccessful deletion
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/:Username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** 
   * API call to remove a movie from a user's favorites
   * @param id for the movie being deleted
   * @returns object containing data about updated user
   */
  deleteFavorite(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non-typed response extraction
   * @param data {any}
   * @retuns data || {} 
   */
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  /** 
   * Handles error responses for HTTP requests above
   * @param error returned from the response
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened: please try again later.');
  }
}
