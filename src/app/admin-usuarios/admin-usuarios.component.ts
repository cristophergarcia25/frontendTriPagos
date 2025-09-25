import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Usuario = {
  nombre: string;
  email: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
  ultimoAcceso?: string; // ISO datetime
};

@Component({
  selector: 'admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent {
  usuario = 'Carlos';

  acciones = [
    { label: 'Agregar Usuario', action: 'nuevo' },
    { label: 'Exportar', action: 'exportar' },
  ];

  usuarios: Usuario[] = [
    { nombre: 'Laura Méndez', email: 'laura@condo.com', rol: 'Administrador', estado: 'Activo', ultimoAcceso: '2025-03-01T10:15' },
    { nombre: 'Mario Ruiz', email: 'mario@condo.com', rol: 'Supervisor', estado: 'Activo', ultimoAcceso: '2025-03-03T18:40' },
    { nombre: 'Ana Gómez', email: 'ana@condo.com', rol: 'Residente', estado: 'Inactivo' }
  ];

  modalOpen = false;
  saving = false;
  mode: 'create' | 'edit' = 'create';
  form: Partial<Usuario> = {};

  onAccion(action: string) {
    if (action === 'nuevo') this.openCreate();
  }

  openCreate() {
    this.form = { estado: 'Activo', rol: 'Residente' };
    this.mode = 'create';
    this.modalOpen = true;
  }

  openEdit(u: Usuario) {
    this.form = { ...u };
    this.mode = 'edit';
    this.modalOpen = true;
  }

  closeModal() {
    if (!this.saving) this.modalOpen = false;
  }

  save() {
    if (!this.form.nombre || !this.form.email) return;
    this.saving = true;

    if (this.mode === 'create') {
      this.usuarios = [...this.usuarios, this.form as Usuario];
    } else {
      this.usuarios = this.usuarios.map(u =>
        u.email === this.form.email ? (this.form as Usuario) : u
      );
    }

    this.saving = false;
    this.modalOpen = false;
  }

  delete(u: Usuario) {
    if (confirm(`¿Eliminar usuario ${u.nombre}?`)) {
      this.usuarios = this.usuarios.filter(x => x !== u);
    }
  }
}
