import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Club, SolicitudCrearClub, SolicitudActualizarClub, RestrictionType, ClubRestriction } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioClubes {
  private readonly URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  obtenerTodosClubes(): Observable<Club[]> {
    return this.http.get<{ clubs: Club[], total: number, totalPages: number }>(`${this.URL_API}/clubs`)
      .pipe(
        map(response => response.clubs)
      );
  }

  obtenerClubPorId(id: string): Observable<Club> {
    return this.http.get<Club>(`${this.URL_API}/clubs/${id}`);
  }

  crearClub(datosClub: SolicitudCrearClub): Observable<Club> {
    return this.http.post<Club>(`${this.URL_API}/clubs`, datosClub);
  }

  actualizarClub(id: string, datosClub: SolicitudActualizarClub): Observable<Club> {
    return this.http.put<Club>(`${this.URL_API}/clubs/${id}`, datosClub);
  }

  eliminarClub(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/clubs/${id}`);
  }

  // Métodos para sistema de restricciones
  aplicarRestriccion(clubId: string, restrictionType: RestrictionType, reason: string, appliedBy: string): Observable<Club> {
    const payload = {
      type: restrictionType,
      reason: reason,
      appliedBy: appliedBy
    };
    return this.http.post<Club>(`${this.URL_API}/clubs/${clubId}/restrictions`, payload);
  }

  quitarRestriccion(clubId: string, restrictionType: RestrictionType): Observable<Club> {
    return this.http.delete<Club>(`${this.URL_API}/clubs/${clubId}/restrictions/${restrictionType}`);
  }

  obtenerRestricciones(clubId: string): Observable<ClubRestriction[]> {
    return this.http.get<ClubRestriction[]>(`${this.URL_API}/clubs/${clubId}/restrictions`);
  }

  // Método para obtener estadísticas de restricciones (para dashboards)
  obtenerEstadisticasRestricciones(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/clubs/restrictions/stats`);
  }
}
