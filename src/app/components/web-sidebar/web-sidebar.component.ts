import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'web-sidebar',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './web-sidebar.component.html',
  styleUrls: ['./web-sidebar.component.scss'],
})
export class WebSidebarComponent {
  @Output() toggle = new EventEmitter<void>();
  appName = 'TriPagos';
  items = [
 { label: 'Dashboard', icon: 'dashboard', route: '/admin-dashboard' },

  { label: 'Condominios', icon: 'apartment', route: '/condominios' },
  { label: 'Amenidades', icon: 'holiday_village', route: '/admin-areascomunales' },
  { label: 'Reservaciones', icon: 'event', route: '/reservaciones' },
  { label: 'Residentes', icon: 'people', route: '/residentes' },

  { label: 'Pagos', icon: 'receipt_long', route: '/admin-pagos' },
  { label: 'Notas de Cobro', icon: 'description', route: '/admin-notascobro' },
  { label: 'Recibos', icon: 'receipt', route: '/admin-recibos' },
  { label: 'Movimientos de Caja', icon: 'account_balance_wallet', route: '/admin-movimientoscaja' },
  // { label: 'Cierres de Caja', icon: 'lock', route: '/cierres-caja' },

  { label: 'Reportes', icon: 'bar_chart', route: '/admin-reportes' },

  { label: 'Notificaciones', icon: 'notifications', route: '/admin-notificaciones' },
  { label: 'Configuración', icon: 'settings', route: '/admin-configuracion' },

     { label: 'Usuarios', icon: 'user', route: '/admin-usuarios' },

  { label: 'Cerrar Sesión', icon: 'logout', route: '/login' }
  ];

  constructor(private auth: AuthService) {}

  clearLocalhost(): void {
    localStorage.clear();
  }

  onNavClick(route: string): void {
    if (route === '/login') {
      this.auth.setRole(null);

      // location.href = route;
    }
  }
}
