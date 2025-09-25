import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Estado = 'Activo' | 'Inactivo';
type CostoTipo = 'gratis' | 'monto_fijo' | 'por_hora';

type Amenidad = {
  id: string;
  nombre: string;
  descripcion?: string;
  ubicacion?: string;
  abre?: string;
  cierra?: string;
  requiereReserva: boolean;
  capacidad?: number;
  costo_tipo: CostoTipo;
  costo_valor?: number;
  deposito_requerido?: number;
  reglas?: string[];
  estado: Estado;
};

@Component({
  selector: 'admin-areas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-areascomunales.component.html',
  styleUrls: ['./admin-areascomunales.component.scss']
})
export class AdminAreascomunalesComponent {
  usuario = 'Carlos';

  acciones = [
    { label: 'Nueva Área', action: 'nueva' },
    { label: 'Exportar', action: 'exportar' },
  ];

  areas: Amenidad[] = [
    {
      id: 'a1',
      nombre: 'Salón de eventos',
      descripcion: 'Ideal para reuniones grandes',
      ubicacion: 'Torre A - PB',
      abre: '09:00',
      cierra: '21:00',
      requiereReserva: true,
      capacidad: 60,
      costo_tipo: 'monto_fijo',
      costo_valor: 500,
      deposito_requerido: 200,
      reglas: ['No fumar', 'Dejar limpio'],
      estado: 'Activo',
    },
    {
      id: 'a2',
      nombre: 'Cancha',
      descripcion: 'De fútbol 5',
      ubicacion: 'Patio central',
      abre: '06:00',
      cierra: '22:00',
      requiereReserva: false,
      capacidad: 10,
      costo_tipo: 'gratis',
      estado: 'Activo',
    },
  ];

  amenidadSeleccionada: Amenidad | null = null;
  modo: 'ver' | 'editar' | 'nuevo' | null = null;
  reglasStr = '';

  onAccion(key: string) {
    if (key === 'nueva') this.agregar();
  }

  verDetalles(a: Amenidad) {
    this.amenidadSeleccionada = { ...a };
    this.reglasStr = a.reglas?.join('; ') || '';
    this.modo = 'ver';
  }

  editar(a: Amenidad) {
    this.amenidadSeleccionada = { ...a };
    this.reglasStr = a.reglas?.join('; ') || '';
    this.modo = 'editar';
  }

  agregar() {
    this.amenidadSeleccionada = {
      id: 'tmp-' + Math.random().toString(36).slice(2, 9),
      nombre: '',
      requiereReserva: true,
      capacidad: 1,
      costo_tipo: 'gratis',
      estado: 'Activo',
    };
    this.reglasStr = '';
    this.modo = 'nuevo';
  }

  cerrarModal() {
    this.amenidadSeleccionada = null;
    this.modo = null;
    this.reglasStr = '';
  }

  guardarCambios() {
    if (!this.amenidadSeleccionada) return;

    this.amenidadSeleccionada.reglas = this.reglasStr
      .split(';')
      .map(r => r.trim())
      .filter(r => r);

    const existe = this.areas.find(a => a.id === this.amenidadSeleccionada?.id);

    if (existe && this.modo === 'editar') {
      this.areas = this.areas.map(a =>
        a.id === this.amenidadSeleccionada?.id ? this.amenidadSeleccionada! : a
      );
    } else if (this.modo === 'nuevo') {
      this.areas = [...this.areas, this.amenidadSeleccionada];
    }

    this.cerrarModal();
  }

  eliminar(a: Amenidad) {
    this.areas = this.areas.filter(x => x.id !== a.id);
  }
}
