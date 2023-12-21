export class Charla {
  constructor(
    public idCharla: number,
    public descripcion: string,
    public idEstadoCharla: number,
    public fechaCharla: string,
    public fechaSolicitud: string,
    public turno: string,
    public idCurso: number,
    public idProvincia: number,
    public modalidad?: string,
    public observaciones?: string,
    public idTechRider?: number,
    public acreditacionLinkedIn?: string
  ) {}
}
