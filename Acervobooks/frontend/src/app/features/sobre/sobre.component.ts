import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {
  livrosDestaque = [
    {
      titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
      autor: 'J.R.R. Tolkien',
      capa: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654215925i/61215351.jpg'
    },
    {
      titulo: 'O Pequeno Príncipe',
      autor: 'Antoine de Saint-Exupéry',
      capa: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1367545443i/157993.jpg'
    },
    {
      titulo: 'Harry Potter e a Pedra Filosofal',
      autor: 'J.K. Rowling',
      capa: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY466_.jpg'
    },
    {
      titulo: 'Percy Jackson e o Ladrão de Raios',
      autor: 'Rick Riordan',
      capa: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400602609i/28187.jpg'
    }
  ];

  depoimentos = [
    {
      nome: 'Maria Silva',
      foto: 'https://ui-avatars.com/api/?name=Maria+Silva&background=60a5fa&color=fff&size=128',
      comentario: 'O Acervobooks transformou a forma como organizo minha biblioteca pessoal. Simples, intuitivo e muito útil!',
      estrelas: 5
    },
    {
      nome: 'João Santos',
      foto: 'https://ui-avatars.com/api/?name=Joao+Santos&background=34d399&color=fff&size=128',
      comentario: 'Excelente para controlar empréstimos! Nunca mais perdi o controle de quem pegou meus livros emprestados.',
      estrelas: 5
    },
    {
      nome: 'Ana Oliveira',
      foto: 'https://ui-avatars.com/api/?name=Ana+Oliveira&background=f59e0b&color=fff&size=128',
      comentario: 'A funcionalidade de sugestões de leitura me ajudou a descobrir livros incríveis que eu não conhecia!',
      estrelas: 5
    }
  ];

  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
