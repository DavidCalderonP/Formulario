export interface Cliente {
  id?: number;
  denominacion: string;
  asesor_id: number;
  sucursal_id: number;
  requiere_factura: boolean;
  email: string;
}
