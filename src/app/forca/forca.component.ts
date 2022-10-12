import { Component, HostListener, OnInit } from '@angular/core';
import { ForcaService } from './forca.service';

const VAZIO = '';

@Component({
  selector: 'app-forca',
  templateUrl: './forca.component.html',
  styleUrls: ['./forca.component.css'],
})
export class ForcaComponent implements OnInit {
  letras: string[] = [];
  palavra: string = VAZIO;
  primeiraLetra: string = VAZIO;
  segundaLetra: string = VAZIO;
  digitadas: string[] = [];
  alfabeto: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V','X',  'W', 'Y', 'Z'];
  erros: number = 0;
  tentativas: number = 6;

  constructor(public forcaService: ForcaService) {}

  ngOnInit(): void {
    this.proximaPalavra();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    let letra = event.key.toUpperCase();
    for (let index = 0; index < this.alfabeto.length; index++) {
      const element = this.alfabeto[index];
      if (letra === element) {
        if (this.erros < this.tentativas && !this.digitadas.includes(letra)) {
          this.digitadas.push(letra);
          if (this.isErrado(letra)) {
            this.erros = this.erros + 1;
          }
        }
      }
    }
  }

  apresenta(letra: string) {
    if (this.digitadas.includes(letra)) {
      return letra;
    }
    return VAZIO;
  }

  isCorreta(letra: string): boolean {
    return this.letras.includes(letra) && this.digitadas.includes(letra);
  }

  isErrado(letra: string): boolean {
    return !this.letras.includes(letra) && this.digitadas.includes(letra);
  }

  isVencedor(): boolean {
    return (
      !!this.letras.length &&
      !this.letras.filter((letra) => !this.digitadas.includes(letra)).length
    );
  }

  dicaPrimeiraLetra() {
    this.primeiraLetra = this.palavra.substring(0, 1);
  }

  dicaSegundaLetra() {
    this.segundaLetra = this.palavra.substring(1, 2);
  }

  proximaPalavra() {
    this.letras = [];
    this.digitadas = [];
    this.erros = 0;
    this.primeiraLetra = VAZIO;
    this.segundaLetra = VAZIO;

    this.forcaService.buscarPalavraAleatoria().subscribe((resposta: any) => {
      this.palavra = resposta.word
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
      this.letras = this.palavra.split('');
    });
  }
}
