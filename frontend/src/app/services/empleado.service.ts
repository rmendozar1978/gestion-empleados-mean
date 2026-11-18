import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({ providedIn: 'root' }) // una sola instancia disponible en toda la app
export class EmpleadoService {
  // URL base de la API del back-end (Express).
  private readonly URL_API = 'http://localhost:3000/api/empleados';

  // Angular entrega HttpClient mediante inyección de dependencias.
  constructor(private http: HttpClient) {}

  // GET /api/empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // GET /api/empleados/:id
  getEmpleado(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(this.URL_API + '/' + id);
  }

  // POST /api/empleados
  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.URL_API, empleado);
  }

  // PUT /api/empleados/:id
  editarEmpleado(id: string, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(this.URL_API + '/' + id, empleado);
  }

  // DELETE /api/empleados/:id
  eliminarEmpleado(id: string): Observable<{ status: string; mensaje: string }> {
    return this.http.delete<{ status: string; mensaje: string }>(this.URL_API + '/' + id);
  }
}
