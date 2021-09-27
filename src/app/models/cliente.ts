export interface Cliente {
  id?: number;
  denominacion: string;
  asesor_id: number;
  sucursal_id: number;
  requiere_factura: boolean;
  email: string;
  nombre?: string;
  nombre_usuario?: string;
  apellido_paterno?: string;
}
