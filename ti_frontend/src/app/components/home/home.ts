import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Slidebar } from "../slidebar/slidebar";

@Component({
  selector: 'app-home',
  imports: [ButtonModule, Slidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
