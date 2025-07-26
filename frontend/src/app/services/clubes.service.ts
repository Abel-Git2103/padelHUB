import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club, SolicitudCrearClub, SolicitudActualizarClub } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioClubes {
  private readonly URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  obtenerTodosClubes(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.URL_API}/clubes`);
  }

  obtenerClubPorId(id: string): Observable<Club> {
    return this.http.get<Club>(`${this.URL_API}/clubes/${id}`);
  }

  crearClub(datosClub: SolicitudCrearClub): Observable<Club> {
    return this.http.post<Club>(`${this.URL_API}/clubes`, datosClub);
  }

  actualizarClub(id: string, datosClub: SolicitudActualizarClub): Observable<Club> {
    return this.http.put<Club>(`${this.URL_API}/clubes/${id}`, datosClub);
  }

  eliminarClub(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/clubes/${id}`);
  }
}
