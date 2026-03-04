import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-produto',
  imports: [FloatLabelModule, InputTextModule, FormsModule, CardModule, ButtonModule, DialogModule],
  templateUrl: './produto.html',
  standalone: true,
  styleUrl: './produto.css',
})
export class Produto {
value1: string | undefined;
    value2: string | undefined;
    value3: string | undefined;

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  }
