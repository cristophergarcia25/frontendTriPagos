import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Estado = 'Activo' | 'Inactivo';

type Condominio = {
  nombre: string;
  alias: string;
  direccion: string;
  unidades: number;
  administrador: string;
  telefono?: string;
  email?: string;

  tipo?: string;
  razonSocial?: string;
  nit?: string;
  cuotaMantenimiento?: number;
  moneda?: string;
  periodicidad?: string;
  diasCorte?: number;
  diasVencimiento?: number;
  diasGracia?: number;
  recargoTipo?: string;
  recargoValor?: number;
  estado: Estado;
};

@Component({
  selector: 'admin-condominios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-condominios.component.html',
  styleUrls: ['./admin-condominios.component.scss']
})
export class AdminCondominiosComponent {
  usuario = 'Carlos';

  acciones = [
    { label: 'Agregar Condominio', action: 'nuevo' },
    { label: 'Importar CSV', action: 'importar' },
    { label: 'Exportar', action: 'exportar' },
    { label: 'Configurar Cuotas', action: 'cuotas' },
    { label: 'Historial', action: 'historial' },
  ];

  condominios: Condominio[] = [
    {
      nombre: 'AMI Apartamentos',
      alias: 'AMI',
      direccion: 'Calz. Central 12-34, Zona 4',
      unidades: 180,
      administrador: 'Laura Méndez',
      telefono: '5555-1234',
      email: 'admin@ami.com',
      tipo: 'Residencial',
      razonSocial: 'AMI S.A.',
      nit: '123456-7',
      cuotaMantenimiento: 550,
      moneda: 'GTQ',
      periodicidad: 'Mensual',
      diasCorte: 5,
      diasVencimiento: 10,
      diasGracia: 3,
      recargoTipo: 'Porcentaje',
      recargoValor: 5,
      estado: 'Activo'
    },
    {
      nombre: 'Jardines del Sol',
      alias: 'JDS',
      direccion: 'Av. Reforma 5-10, Zona 9',
      unidades: 96,
      administrador: 'Mario Ruiz',
      telefono: '5555-5678',
      email: 'contacto@jds.com',
      tipo: 'Residencial',
      razonSocial: 'JDS Condominios',
      nit: '987654-3',
      cuotaMantenimiento: 600,
      moneda: 'GTQ',
      periodicidad: 'Mensual',
      diasCorte: 5,
      diasVencimiento: 12,
      diasGracia: 2,
      recargoTipo: 'Fijo',
      recargoValor: 25,
      estado: 'Activo'
    },
    {
      nombre: 'Torres Verona',
      alias: 'VER',
      direccion: '6a Av 10-22, Mixco',
      unidades: 124,
      administrador: 'Ana Gómez',
      telefono: '5555-9012',
      email: 'admin@verona.com',
      tipo: 'Mixto',
      razonSocial: 'Torres Verona Ltda.',
      nit: '567890-1',
      cuotaMantenimiento: 500,
      moneda: 'GTQ',
      periodicidad: 'Mensual',
      diasCorte: 1,
      diasVencimiento: 8,
      diasGracia: 5,
      recargoTipo: 'Porcentaje',
      recargoValor: 10,
      estado: 'Inactivo'
    }
  ];

  condominioSeleccionado: Condominio | null = null;
  modo: 'ver' | 'editar' | 'nuevo' | null = null;

  onAccion(key: string) {
    if (key === 'nuevo') this.agregar();
  }

  verDetalles(c: Condominio) {
    this.condominioSeleccionado = { ...c };
    this.modo = 'ver';
  }

  editar(c: Condominio) {
    this.condominioSeleccionado = { ...c };
    this.modo = 'editar';
  }

  agregar() {
    this.condominioSeleccionado = {
      nombre: '',
      alias: '',
      direccion: '',
      unidades: 0,
      administrador: '',
      telefono: '',
      email: '',
      tipo: '',
      razonSocial: '',
      nit: '',
      cuotaMantenimiento: 0,
      moneda: 'GTQ',
      periodicidad: 'Mensual',
      diasCorte: 1,
      diasVencimiento: 5,
      diasGracia: 0,
      recargoTipo: 'Porcentaje',
      recargoValor: 0,
      estado: 'Activo'
    };
    this.modo = 'nuevo';
  }

  cerrarDetalles() {
    this.condominioSeleccionado = null;
    this.modo = null;
  }

  guardarCambios() {
    if (!this.condominioSeleccionado) return;

    const existe = this.condominios.find(c => c.alias === this.condominioSeleccionado?.alias);

    if (existe && this.modo === 'editar') {
      this.condominios = this.condominios.map(c =>
        c.alias === this.condominioSeleccionado?.alias ? this.condominioSeleccionado! : c
      );
    } else if (this.modo === 'nuevo') {
      this.condominios = [...this.condominios, this.condominioSeleccionado];
    }

    this.cerrarDetalles();
  }
}
