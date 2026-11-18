import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

// 'M' es la variable global de Materialize (CDN en index.html).
declare const M: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  standalone: false
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];                // lista que se muestra en la tabla
  empleado: Empleado = this.nuevoEmpleado(); // objeto enlazado al formulario
  editando = false;                          // false = creando, true = editando
  cargando = false;                          // controla la barra de progreso

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  private nuevoEmpleado(): Empleado {
    return { nombre: '', cargo: '', departamento: '', salario: null };
  }

  // READ
  cargarEmpleados(): void {
    this.cargando = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (datos) => {
        this.empleados = datos;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        this.mostrarError(err, 'No se pudo cargar la lista. ¿Está encendido el back-end?');
      }
    });
  }

  // CREATE o UPDATE según el valor de 'editando'
  guardar(form: NgForm): void {
    if (form.invalid) {
      M.toast({ html: 'Completa todos los campos correctamente', classes: 'orange' });
      return;
    }

    if (this.editando && this.empleado._id) {
      this.empleadoService.editarEmpleado(this.empleado._id, this.empleado).subscribe({
        next: () => {
          M.toast({ html: 'Empleado actualizado', classes: 'green' });
          this.cancelar(form);
          this.cargarEmpleados();
        },
        error: (err) => this.mostrarError(err, 'No se pudo actualizar')
      });
    } else {
      this.empleadoService.crearEmpleado(this.empleado).subscribe({
        next: () => {
          M.toast({ html: 'Empleado creado', classes: 'green' });
          this.cancelar(form);
          this.cargarEmpleados();
        },
        error: (err) => this.mostrarError(err, 'No se pudo crear')
      });
    }
  }

  // Carga los datos de una fila en el formulario.
  editar(empleado: Empleado): void {
    this.empleado = { ...empleado }; // copia, para no modificar la tabla hasta guardar
    this.editando = true;
    setTimeout(() => M.updateTextFields()); // sube las etiquetas flotantes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // DELETE con confirmación
  eliminar(empleado: Empleado): void {
    if (!empleado._id) return;
    if (!confirm('¿Eliminar a ' + empleado.nombre + '?')) return;

    this.empleadoService.eliminarEmpleado(empleado._id).subscribe({
      next: () => {
        M.toast({ html: 'Empleado eliminado', classes: 'green' });
        this.cargarEmpleados();
      },
      error: (err) => this.mostrarError(err, 'No se pudo eliminar')
    });
  }

  // Limpia el formulario y vuelve al modo crear
  cancelar(form?: NgForm): void {
    this.editando = false;
    this.empleado = this.nuevoEmpleado();
    if (form) form.resetForm(this.nuevoEmpleado());
    setTimeout(() => M.updateTextFields());
  }

  // Muestra el mensaje que envía la API (400, 404...) o uno genérico
  private mostrarError(err: any, mensajePorDefecto: string): void {
    const detalles = err?.error?.detalles;
    const mensaje = Array.isArray(detalles) ? detalles.join('. ') : err?.error?.mensaje || mensajePorDefecto;
    M.toast({ html: mensaje, classes: 'red' });
  }
}
