import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //Aqui meti este operador -> ! -> y significa 'confia en mi papi esto aunque no este inicializado si existe'

  constructor( private gifsService: GifsService  ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim().length === 0 ) {
      return;
    }
    this.txtBuscar.nativeElement.value = '';
    this.gifsService.buscarGifs(valor);
  }


}
