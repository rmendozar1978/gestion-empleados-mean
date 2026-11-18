// Interfaz = contrato de datos. Debe coincidir con el Schema de Mongoose del back-end.
export interface Empleado {
  _id?: string;            // lo asigna MongoDB; opcional porque al crear aún no existe
  nombre: string;
  cargo: string;
  departamento: string;
  salario: number | null;  // null mientras el formulario está vacío
  createdAt?: string;
  updatedAt?: string;
}
