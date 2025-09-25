import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type EstadoRecibo = 'emitido' | 'anulado';
type Moneda = 'GTQ' | 'USD';

type ReciboItem = {
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  total: number;
};

type Recibo = {
  id: string;
  numero_completo: string;
  residente_id: string;
  unidad_id: string;
  usuario_id: string;
  pago_id?: string;
  items: ReciboItem[];
  subtotal: number;
  descuento: number;
  impuestos: number;
  total: number;
  moneda: Moneda;
  estado: EstadoRecibo;
  metodo_pago: string;
  referencia_pago: string;
  fecha_emision: string;
  fecha_anulacion?: string;
};

@Component({
  selector: 'admin-recibos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-recibos.component.html',
  styleUrls: ['./admin-recibos.component.scss']
})
export class AdminRecibosComponent {
  usuario = 'Carlos';

  acciones = [
    { label: 'Nuevo Recibo', action: 'nuevo' },
    { label: 'Exportar', action: 'exportar' },
  ];

  // Mock data
  recibos: Recibo[] = [
    {
      id: 'r1',
      numero_completo: 'A-0000123',
      residente_id: 'R-55',
      unidad_id: 'U-101',
      usuario_id: 'admin1',
      items: [
        { descripcion: 'Cuota mantenimiento septiembre', cantidad: 1, precio_unitario: 500, total: 500 }
      ],
      subtotal: 500,
      descuento: 0,
      impuestos: 0,
      total: 500,
      moneda: 'GTQ',
      estado: 'emitido',
      metodo_pago: 'transferencia',
      referencia_pago: 'TXN-123',
      fecha_emision: '2025-09-05',
    },
    {
      id: 'r2',
      numero_completo: 'A-0000124',
      residente_id: 'R-56',
      unidad_id: 'U-102',
      usuario_id: 'admin1',
      items: [
        { descripcion: 'Reserva salón', cantidad: 1, precio_unitario: 300, total: 300 }
      ],
      subtotal: 300,
      descuento: 0,
      impuestos: 0,
      total: 300,
      moneda: 'GTQ',
      estado: 'anulado',
      metodo_pago: 'efectivo',
      referencia_pago: 'BOLETA-789',
      fecha_emision: '2025-09-06',
      fecha_anulacion: '2025-09-07',
    }
  ];

  onAccion(key: string) {
    if (key === 'nuevo') {
      this.addRecibo();
    }
    if (key === 'exportar') {
      console.log('Exportando recibos...');
    }
  }

  addRecibo() {
    const tmp: Recibo = {
      id: 'tmp-' + Math.random().toString(36).slice(2, 9),
      numero_completo: 'TEMP-NEW',
      residente_id: '',
      unidad_id: '',
      usuario_id: 'admin1',
      items: [],
      subtotal: 0,
      descuento: 0,
      impuestos: 0,
      total: 0,
      moneda: 'GTQ',
      estado: 'emitido',
      metodo_pago: '',
      referencia_pago: '',
      fecha_emision: new Date().toISOString().slice(0, 10),
    };
    this.recibos = [tmp, ...this.recibos];
  }

  verDetalle(r: Recibo) {
    console.log('Detalle recibo:', r);
    // aquí podrías abrir un modal para ver detalle completo
  }

  anular(r: Recibo) {
    r.estado = 'anulado';
    r.fecha_anulacion = new Date().toISOString().slice(0, 10);
    console.log('Recibo anulado:', r);
  }
}
