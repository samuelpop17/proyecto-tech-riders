import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  public role!: string | null;

  title = 'proyectotechriders';

  ngDoCheck(): void {
    this.role = localStorage.getItem('role');
  }
}
