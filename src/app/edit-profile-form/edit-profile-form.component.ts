/**
 * used to render the edit-profile form
 * @module EditProfileFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {

  user: any = {};

  // bind input values to the userData object
  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(response);
      return this.user
    });
  }

  editUserProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('user', response.Username);
      this.snackBar.open('Your profile was updated successfully.', 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
