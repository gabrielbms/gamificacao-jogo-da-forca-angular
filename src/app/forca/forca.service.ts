import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForcaService {

  palavra!: Observable<Object>;

  constructor(public http:HttpClient) {}

  buscarPalavraAleatoria(){
    this.palavra = this.http.get('https://api.dicionario-aberto.net/random');
    return this.palavra;
  }

}
