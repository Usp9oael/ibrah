import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateuserdialogComponent } from '../../shared/createuserdialog/createuserdialog.component';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
constructor ( private router:Router, public dialog: MatDialog) {}

navigate ( path: string) {
  this.router.navigate([path])
}
  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateuserdialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
