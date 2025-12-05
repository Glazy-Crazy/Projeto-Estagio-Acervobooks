import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = signal(true);
  isVisible = signal(true);

  constructor(
    public router: Router, 
    public auth: AuthService,
    public themeService: ThemeService
  ) {
    // Atualiza as classes do body quando o estado da sidebar muda
    effect(() => {
      if (typeof document !== 'undefined') {
        const body = document.body;
        body.classList.remove('sidebar-open', 'sidebar-collapsed');
        
        if (this.isVisible() && this.isOpen()) {
          body.classList.add('sidebar-open');
        } else if (this.isVisible() && !this.isOpen()) {
          body.classList.add('sidebar-collapsed');
        }
      }
    });
  }

  toggleSidebar() {
    this.isOpen.update(value => !value);
  }

  hideSidebar() {
    this.isVisible.set(false);
  }

  showSidebar() {
    this.isVisible.set(true);
    this.isOpen.set(true);
  }

  isLoggedIn(): boolean {
    return !!this.auth.getToken();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout() {
    this.auth.logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}
