import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';



@Component({
  selector: 'app-aniadirtecnologia',
  templateUrl: './aniadirtecnologia.component.html',
  styleUrls: ['./aniadirtecnologia.component.css']
})
export class AniadirtecnologiaComponent implements OnInit{
  public role!: number | null;

  ngOnInit(): void {
    if (this.role != localStorage.getItem('role'))
      this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) {
      
    } else {
      this._router.navigate(['/']);
    }
  }
  constructor(private _service: ServicePrincipal, private _router: Router) { }

}
