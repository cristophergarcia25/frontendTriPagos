import { Component } from '@angular/core';
import { Router } from '@angular/router';   // 👈 importa Router
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  
  constructor(private router: Router) {}   

  goTo(route: string) {
    this.router.navigate([route]);         
  }

  usuario = 'Carlos';
  deudaActual = 1500;
  pagosAprobadosMes = 12;
  ingresosMes = 4500;
  egresosMes = 1200;
  saldoCaja = 3300;

  pagosRecientes = [
    { fecha: '2025-03-05', descripcion: 'Pago mantenimiento U-101', monto: 550 },
    { fecha: '2025-03-02', descripcion: 'Pago reserva salón', monto: 300 },
    { fecha: '2025-02-27', descripcion: 'Pago mantenimiento U-102', monto: 550 },
  ];

  notasPendientes = [
    { unidad: 'U-103', concepto: 'Cuota febrero 2025', monto: 550, fecha_vencimiento: '2025-03-10' },
    { unidad: 'U-104', concepto: 'Cuota extraordinaria', monto: 1200, fecha_vencimiento: '2025-03-15' },
  ];

  reservacionesProximas = [
    { amenidad: 'Salón de eventos', residente: 'Juan Pérez', fecha: '2025-03-08', horario: '18:00 - 22:00' },
    { amenidad: 'Cancha', residente: 'María López', fecha: '2025-03-09', horario: '08:00 - 10:00' },
  ];
}
