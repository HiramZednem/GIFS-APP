import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'PUT YOUR OWN API KEY FROM https://developers.giphy.com/';
  private api: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
  }

  buscarGifs( query: string = '' ) {
    query = query.trim().toLowerCase();

    if( !this._historial.includes(query) ) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    // Esta en usa forma de optimizar los parametros de la api y que no se vea tan horrible ese trozo de codigo
    const params = new  HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',query);

    this.http.get<SearchGIFResponse>(`${ this.api }/search`, {params: params})
      .subscribe( ( response: any ) => {
        this.resultados = response.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      })
  }
}
