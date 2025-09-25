import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TipoMovimiento = 'apertura' | 'ingreso' | 'egreso' | 'cierre';
type EstadoMovimiento = 'pendiente' | 'confirmado' | 'anulado';
type Moneda = 'GTQ' | 'USD';

type MovimientoCaja = {
  id: string;
  tipo: TipoMovimiento;
  fecha: string;
  monto: number;
  moneda: Moneda;
  descripcion?: string;
  usuario_id: string;
  estado: EstadoMovimiento;
  edit?: boolean; // UI only
};

@Component({
  selector: 'admin-movimientoscaja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-movimientoscaja.component.html',
  styleUrls: ['./admin-movimientoscaja.component.scss']
})
export class AdminMovimientoscajaComponent {
  usuario = 'Carlos';

  acciones = [
    { label: 'Nuevo Movimiento', action: 'nuevo' },
    { label: 'Guardar Cambios', action: 'guardar' },
    { label: 'Exportar', action: 'exportar' },
  ];

  movimientos: MovimientoCaja[] = [
    {
      id: 'm1',
      tipo: 'apertura',
      fecha: '2025-09-01',
      monto: 1000,
      moneda: 'GTQ',
      descripcion: 'Apertura de caja inicial',
      usuario_id: 'admin1',
      estado: 'confirmado'
    },
    {
      id: 'm2',
      tipo: 'ingreso',
      fecha: '2025-09-05',
      monto: 500,
      moneda: 'GTQ',
      descripcion: 'Pago mantenimiento U-101',
      usuario_id: 'admin1',
      estado: 'pendiente'
    },
    {
      id: 'm3',
      tipo: 'egreso',
      fecha: '2025-09-06',
      monto: 200,
      moneda: 'GTQ',
      descripcion: 'Compra material limpieza',
      usuario_id: 'admin2',
      estado: 'anulado'
    }
  ];

  onAccion(key: string) {
    if (key === 'nuevo') this.addMovimiento();
    if (key === 'guardar') this.saveAll();
    if (key === 'exportar') console.log('Exportando movimientos...', this.movimientos);
  }

  addMovimiento() {
    const tmp: MovimientoCaja = {
      id: 'tmp-' + Math.random().toString(36).slice(2, 9),
      tipo: 'ingreso',
      fecha: new Date().toISOString().slice(0, 10),
      monto: 0,
      moneda: 'GTQ',
      descripcion: '',
      usuario_id: 'admin1',
      estado: 'pendiente',
      edit: true,
    };
    this.movimientos = [tmp, ...this.movimientos];
  }

  toggleEdit(m: MovimientoCaja) {
    m.edit = !m.edit;
  }

  remove(m: MovimientoCaja) {
    this.movimientos = this.movimientos.filter(x => x.id !== m.id);
  }

  saveRow(m: MovimientoCaja) {
    if (m.monto <= 0) return;
    m.descripcion = m.descripcion?.trim();
    m.edit = false;
  }

  cancelRow(m: MovimientoCaja) {
    if (m.id.startsWith('tmp-')) {
      this.remove(m);
    } else {
      m.edit = false;
    }
  }

  saveAll() {
    const payload = this.movimientos.map(({ edit, ...api }) => api);
    console.log('Guardar en backend:', payload);
    this.movimientos = this.movimientos.map(m => ({ ...m, edit: false }));
  }
}
