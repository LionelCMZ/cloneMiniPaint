import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LienzoComponent } from './components/lienzo/lienzo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LienzoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-paint';
}
