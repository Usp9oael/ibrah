import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent {
  reply: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: string, sender: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendReply(): void {
    console.log('Reply:', this.reply);
    this.dialogRef.close();
  }
}
