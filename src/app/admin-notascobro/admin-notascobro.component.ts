import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Estado = 'pendiente' | 'parcial' | 'pagado' | 'vencido' | 'anulado';
type TipoNota = 'mantenimiento' | 'amenidad' | 'Mora' | 'convenio de pago' | 'cuota extraordinaria' | 'Multa';
type Moneda = 'GTQ' | 'USD';

type NotaCobro = {
  id: string;
  unidad_id: string;
  residente_id: string;
  tipo: TipoNota;
  concepto: string;
  periodo?: string;        // "YYYY-MM"
  monto: number;
  moneda: Moneda;
  fecha_emision: string;   // YYYY-MM-DD
  fecha_vencimiento: string;
  estado: Estado;
  saldo_pendiente: number;
  edit?: boolean;          // UI only
};

@Component({
  selector: 'admin-notascobro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-notascobro.component.html',
  styleUrls: ['./admin-notascobro.component.scss']
})
export class AdminNotascobroComponent {
  usuario = 'Carlos';

  acciones = [
    { label: 'Nueva Nota', action: 'nueva' },
    { label: 'Guardar Cambios', action: 'guardar' },
    { label: 'Exportar', action: 'exportar' },
  ];

  // Mock data
  notas: NotaCobro[] = [
    {
      id: 'n1',
      unidad_id: 'U-101',
      residente_id: 'R-55',
      tipo: 'mantenimiento',
      concepto: 'Cuota mantenimiento 2025-09',
      periodo: '2025-09',
      monto: 500,
      moneda: 'GTQ',
      fecha_emision: '2025-09-01',
      fecha_vencimiento: '2025-09-10',
      estado: 'pendiente',
      saldo_pendiente: 500,
    },
    {
      id: 'n2',
      unidad_id: 'U-102',
      residente_id: 'R-56',
      tipo: 'amenidad',
      concepto: 'Reserva salón 2025-09-15',
      monto: 300,
      moneda: 'GTQ',
      fecha_emision: '2025-09-05',
      fecha_vencimiento: '2025-09-15',
      estado: 'pagado',
      saldo_pendiente: 0,
    }
  ];

  onAccion(key: string) {
    if (key === 'nueva') this.addNota();
    if (key === 'guardar') this.saveAll();
  }

  addNota() {
    const tmp: NotaCobro = {
      id: 'tmp-' + Math.random().toString(36).slice(2, 9),
      unidad_id: '',
      residente_id: '',
      tipo: 'mantenimiento',
      concepto: '',
      periodo: '',
      monto: 0,
      moneda: 'GTQ',
      fecha_emision: new Date().toISOString().slice(0, 10),
      fecha_vencimiento: new Date().toISOString().slice(0, 10),
      estado: 'pendiente',
      saldo_pendiente: 0,
      edit: true,
    };
    this.notas = [tmp, ...this.notas];
  }

  toggleEdit(n: NotaCobro) {
    n.edit = !n.edit;
  }

  remove(n: NotaCobro) {
    this.notas = this.notas.filter(x => x.id !== n.id);
  }

  saveRow(n: NotaCobro) {
    if (!n.concepto?.trim()) return;
    n.concepto = n.concepto.trim();

    // Ajusta saldo pendiente automáticamente
    if (n.estado === 'pagado') {
      n.saldo_pendiente = 0;
    } else {
      n.saldo_pendiente = n.monto;
    }

    n.edit = false;
  }

  cancelRow(n: NotaCobro) {
    if (n.id.startsWith('tmp-')) {
      this.remove(n);
    } else {
      n.edit = false;
    }
  }

  saveAll() {
    const payload = this.notas.map(({ edit, ...api }) => api);
    console.log('Guardar en backend:', payload);
    this.notas = this.notas.map(n => ({ ...n, edit: false }));
  }
}
