import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number;

  constructor () {
    const currentDate = new Date()

    this.currentYear = currentDate.getFullYear()
  }


}
