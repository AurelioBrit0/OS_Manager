import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slidebar } from './components/slidebar/slidebar';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Slidebar,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ti_frontend');

  constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
}
}
