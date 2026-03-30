import { Component, inject } from '@angular/core';
import { House, LucideAngularModule, Package, Tag, Wrench } from 'lucide-angular';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './slidebar.html',
  styleUrl: './slidebar.css',
})
export class Slidebar {
 
 readonly package = Package;
 readonly house = House;
 readonly tag = Tag;
 readonly wrench = Wrench;
  

}
