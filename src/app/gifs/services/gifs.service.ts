import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'PUT YOUR OWN API KEY FROM https://developers.giphy.com/';
  private _historial: string[] = [];

  public resultados: any[] = []

  get historial(): string[] {
    return [...this._historial]
  }

  constructor( private http: HttpClient) {}

  buscarGifs( query: string = '' ) {
    query = query.trim().toLowerCase();

    if( !this._historial.includes(query) ) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`)
      .subscribe( ( response: any ) => {
        console.log( response.data );
        this.resultados = response.data;
      })
  }
}
