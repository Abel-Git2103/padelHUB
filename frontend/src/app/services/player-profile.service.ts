import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { 
  PlayerProfile, 
  PlayerStats, 
  PlayerHistoricalStats, 
  MatchHistory, 
  Achievement, 
  PlayerSettings 
} from '../models/player-stats.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerProfileService {
  // Detectar automáticamente si estamos en dev tunnels
  private readonly URL_API = window.location.hostname.includes('devtunnels.ms') 
    ? window.location.origin.replace('4200', '3000') + '/api'
    : 'http://localhost:3000/api';
  
  private apiUrl = `${this.URL_API}/player`;
  private playerProfileSubject = new BehaviorSubject<PlayerProfile | null>(null);
  public playerProfile$ = this.playerProfileSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el perfil completo del jugador
   */
  getPlayerProfile(userId: string): Observable<PlayerProfile> {
    return this.http.get<PlayerProfile>(`${this.apiUrl}/${userId}/profile`);
  }

  /**
   * Obtiene las estadísticas actuales del jugador
   */
  getPlayerStats(userId: string): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${this.apiUrl}/${userId}/stats`);
  }

  /**
   * Obtiene las estadísticas históricas del jugador
   */
  getPlayerHistoricalStats(userId: string): Observable<PlayerHistoricalStats> {
    return this.http.get<PlayerHistoricalStats>(`${this.apiUrl}/${userId}/historical-stats`);
  }

  /**
   * Obtiene el historial de partidos del jugador
   */
  getMatchHistory(userId: string, limit: number = 10, offset: number = 0): Observable<MatchHistory[]> {
    return this.http.get<MatchHistory[]>(`${this.apiUrl}/${userId}/match-history`, {
      params: { limit: limit.toString(), offset: offset.toString() }
    });
  }

  /**
   * Obtiene los logros del jugador
   */
  getPlayerAchievements(userId: string): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.apiUrl}/${userId}/achievements`);
  }

  /**
   * Obtiene la configuración del jugador
   */
  getPlayerSettings(userId: string): Observable<PlayerSettings> {
    return this.http.get<PlayerSettings>(`${this.apiUrl}/${userId}/settings`);
  }

  /**
   * Actualiza la configuración del jugador
   */
  updatePlayerSettings(userId: string, settings: PlayerSettings): Observable<PlayerSettings> {
    return this.http.put<PlayerSettings>(`${this.apiUrl}/${userId}/settings`, settings);
  }

  /**
   * Actualiza la imagen de perfil del jugador
   */
  updateProfileImage(userId: string, imageFile: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/${userId}/profile-image`, formData);
  }

  /**
   * Actualiza los datos básicos del perfil
   */
  updateBasicProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/basic-profile`, profileData);
  }

  /**
   * Solicita cambio de contraseña
   */
  requestPasswordChange(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  /**
   * Solicita cambio de email
   */
  requestEmailChange(userId: string, newEmail: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/change-email`, {
      newEmail
    });
  }

  /**
   * Verifica el teléfono del usuario
   */
  verifyPhone(userId: string, phoneNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/verify-phone`, {
      phoneNumber
    });
  }

  /**
   * Solicita cambio de club
   */
  requestClubChange(userId: string, newClubId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/change-club`, {
      newClubId
    });
  }

  /**
   * Desactiva la cuenta del usuario
   */
  deactivateAccount(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/deactivate`, {});
  }

  /**
   * Elimina la cuenta del usuario
   */
  deleteAccount(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/delete`);
  }

  /**
   * Actualiza el perfil del jugador en el estado local
   */
  updateLocalPlayerProfile(profile: PlayerProfile): void {
    this.playerProfileSubject.next(profile);
  }

  /**
   * Limpia el perfil del jugador del estado local
   */
  clearPlayerProfile(): void {
    this.playerProfileSubject.next(null);
  }

  /**
   * Obtiene datos mock para desarrollo
   */
  getMockPlayerProfile(): PlayerProfile {
    return {
      usuario: {
        id: '1',
        nombreCompleto: 'Abel Jornet',
        email: 'juan.perez@email.com',
        telefono: '+34 666 123 456',
        rangoActual: 'PLATINO',
        posicionJuego: 'DRIVE',
        club: {
          id: 'club1',
          nombre: 'Procenter Padel Club'
        },
        imagenPerfil: '/assets/images/avatars/default-avatar.png'
      },
      estadisticas: {
        victorias: 15,
        empates: 8,
        derrotas: 5,
        totalPartidos: 28,
        efectividad: 53.6,
        rachaActual: {
          tipo: 'victorias',
          cantidad: 3
        },
        rankingClub: {
          posicion: 8,
          total: 127
        },
        rankingGlobal: {
          posicion: 234,
          total: 1200
        },
        progresoObjetivos: {
          torneoVictoriasRestantes: 2,
          ascensoVictoriasRestantes: 8
        }
      },
      estadisticasHistoricas: {
        temporadasJugadas: 3,
        totalVictorias: 47,
        totalPartidos: 89,
        ascensosConseguidos: 1,
        torneosGanados: 2,
        estadisticasPorTemporada: [
          { temporada: '2024-25', victorias: 15, empates: 8, derrotas: 5, esActual: true },
          { temporada: '2023-24', victorias: 22, empates: 6, derrotas: 4, esActual: false },
          { temporada: '2022-23', victorias: 10, empates: 12, derrotas: 8, esActual: false }
        ]
      },
      historialPartidos: [
        {
          id: '1',
          fecha: '2025-07-31T11:00:00',
          resultado: 'victoria',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Gerard' },
            equipo2: { jugador1: 'Raul', jugador2: 'Jose' }
          },
          sets: { set1: '7-6', set2: '7-6', set3: '7-6' }
        },
        {
          id: '2',
          fecha: '2025-07-29T10:30:00',
          resultado: 'victoria',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Maria' },
            equipo2: { jugador1: 'Pedro', jugador2: 'Ana' }
          },
          sets: { set1: '6-4', set2: '6-3' }
        },
        {
          id: '3',
          fecha: '2025-07-27T09:00:00',
          resultado: 'derrota',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Luis' },
            equipo2: { jugador1: 'Carlos', jugador2: 'Miguel' }
          },
          sets: { set1: '4-6', set2: '3-6' }
        },
        {
          id: '4',
          fecha: '2025-07-25T12:30:00',
          resultado: 'victoria',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Patricia' },
            equipo2: { jugador1: 'Sergio', jugador2: 'Elena' }
          },
          sets: { set1: '6-2', set2: '6-4' }
        },
        {
          id: '5',
          fecha: '2025-07-23T11:00:00',
          resultado: 'empate',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Roberto' },
            equipo2: { jugador1: 'Juan', jugador2: 'Marta' }
          },
          sets: { set1: '6-4', set2: '4-6', set3: '6-6' }
        },
        {
          id: '6',
          fecha: '2025-07-21T10:00:00',
          resultado: 'victoria',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Sofia' },
            equipo2: { jugador1: 'David', jugador2: 'Laura' }
          },
          sets: { set1: '7-5', set2: '6-4' }
        },
        {
          id: '7',
          fecha: '2025-07-19T09:30:00',
          resultado: 'derrota',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Alejandro' },
            equipo2: { jugador1: 'Fernando', jugador2: 'Isabel' }
          },
          sets: { set1: '3-6', set2: '5-7' }
        },
        {
          id: '8',
          fecha: '2025-07-17T11:30:00',
          resultado: 'victoria',
          jugadores: {
            equipo1: { jugador1: 'Abel Jornet', jugador2: 'Carmen' },
            equipo2: { jugador1: 'Javier', jugador2: 'Rosa' }
          },
          sets: { set1: '6-3', set2: '6-2' }
        }
      ],
      logros: [
        {
          id: '1',
          nombre: 'Primer Victoria',
          descripcion: 'Gana tu primer partido',
          icono: '🏆',
          desbloqueado: true,
          fechaConseguido: '2023-03-15'
        },
        {
          id: '2',
          nombre: 'Racha de Fuego',
          descripcion: '5 victorias consecutivas',
          icono: '🔥',
          desbloqueado: true,
          fechaConseguido: '2024-11-28'
        },
        {
          id: '3',
          nombre: 'Campeón de Torneo',
          descripcion: 'Gana tu primer torneo',
          icono: '🎖️',
          desbloqueado: false,
          progreso: { actual: 1, total: 1, unidad: 'inscrito' }
        }
      ]
    };
  }
}
