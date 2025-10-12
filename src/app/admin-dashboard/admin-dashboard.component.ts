import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements AfterViewInit {
  constructor(private router: Router) {}

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
// 🧾 Resumen de notas de cobro
notasProcesadas = 8;
notasPendientesCount = 2;

  ngAfterViewInit() {
    // 📊 1. Resumen Financiero
    new Chart('chartFinanciero', {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
          { label: 'Ingresos (Q)', data: [1200, 1800, 900, 2200, 1700, 2500], backgroundColor: '#007bff' },
          { label: 'Egresos (Q)', data: [600, 800, 700, 900, 1000, 1100], backgroundColor: '#dc3545' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'top' } }
      }
    });

    // 💰 2. Distribución General (con porcentajes)
    const distribucionData = [this.ingresosMes, this.egresosMes, this.saldoCaja];
    new Chart('chartDistribucion', {
      type: 'doughnut',
      data: {
        labels: ['Ingresos', 'Egresos', 'Saldo de Caja'],
        datasets: [{
          data: distribucionData,
          backgroundColor: ['#007bff', '#dc3545', '#28a745']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          datalabels: {
            color: '#fff',
            font: { weight: 'bold' },
            formatter: (value: number) => {
              const total = distribucionData.reduce((a, b) => a + b, 0);
              const porcentaje = ((value / total) * 100).toFixed(1);
              return porcentaje + '%';
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    // 🧾 3. Estado General (con porcentajes)
    const estadoData = [
      this.notasPendientes.length,
      this.pagosRecientes.length,
      this.reservacionesProximas.length
    ];
    new Chart('chartEstado', {
      type: 'pie',
      data: {
        labels: ['Notas Pendientes', 'Pagos Recientes', 'Reservaciones'],
        datasets: [{
          data: estadoData,
          backgroundColor: ['#ffc107', '#17a2b8', '#20c997']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          datalabels: {
            color: '#fff',
            font: { weight: 'bold' },
            formatter: (value: number) => {
              const total = estadoData.reduce((a, b) => a + b, 0);
              const porcentaje = ((value / total) * 100).toFixed(1);
              return porcentaje + '%';
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    // 📈 4. Saldos pagados y pendientes en el mes
new Chart('chartPagosMes', {
  type: 'bar',
  data: {
    labels: ['Torre 1', 'Torre 2', 'Torre 3'],
    datasets: [
      { label: 'Cobrado', data: [70, 40, 92], backgroundColor: '#28a745' },
      { label: 'Pendiente', data: [30, 60, 8], backgroundColor: '#dc3545' }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold' },
        formatter: (value: number) => value + '%'
      }
    },
    scales: { y: { beginAtZero: true, max: 100 } }
  },
  plugins: [ChartDataLabels]
});

// 📊 5. Saldos pendientes y pagados acumulados
new Chart('chartPagosAcumulados', {
  type: 'bar',
  data: {
    labels: ['Torre 1', 'Torre 2', 'Torre 3'],
    datasets: [
      { label: 'Cobrado', data: [73, 81, 6], backgroundColor: '#007bff' },
      { label: 'Pendiente', data: [27, 19, 94], backgroundColor: '#ffc107' }
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: {
        color: '#000',
        font: { weight: 'bold' },
        formatter: (value: number) => value + '%'
      }
    },
    scales: { x: { beginAtZero: true, max: 100 } }
  },
  plugins: [ChartDataLabels]
});

// 📉 6. Comportamiento de pago mensual
new Chart('chartComportamiento', {
  type: 'line',
  data: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Torre 1',
        data: [5, 45, 35, 15],
        borderColor: '#007bff',
        backgroundColor: '#007bff22',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Torre 2',
        data: [6, 50, 25, 19],
        borderColor: '#28a745',
        backgroundColor: '#28a74522',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Torre 3',
        data: [10, 55, 25, 10],
        borderColor: '#ffc107',
        backgroundColor: '#ffc10722',
        fill: true,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true, max: 60 } }
  }
});

// 📊 7. Tasa de cumplimiento de pago
new Chart('chartCumplimiento', {
  type: 'bar',
  data: {
    labels: ['Torre 1', 'Torre 2', 'Torre 3'],
    datasets: [
      { label: 'En tiempo', data: [45, 40, 60], backgroundColor: '#17a2b8' },
      { label: 'Atrasado', data: [55, 60, 40], backgroundColor: '#dc3545' }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold' },
        formatter: (value: number) => value + '%'
      }
    },
    scales: { y: { beginAtZero: true, max: 100 } }
  },
  plugins: [ChartDataLabels]
});
// 📘 8. Notas de Cobro (procesadas vs pendientes)
new Chart('chartNotasCobro', {
  type: 'doughnut',
  data: {
    labels: ['Procesadas', 'Pendientes'],
    datasets: [
      {
        data: [this.notasProcesadas, this.notasPendientesCount],
        backgroundColor: ['#28a745', '#ffc107']
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold' },
        formatter: (value: number) => {
          const total = this.notasProcesadas + this.notasPendientesCount;
          const porcentaje = ((value / total) * 100).toFixed(1);
          return porcentaje + '%';
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});

  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
