/**
 * Constantes para los roles del sistema
 * Mantener sincronizado con backend/src/common/enums.ts
 */
export const ROLES = {
  JUGADOR: 'JUGADOR',
  ADMIN_CLUB: 'ADMIN_CLUB',
  ADMIN_SISTEMA: 'ADMIN_SISTEMA'
} as const;

/**
 * Tipo para los roles válidos
 */
export type RolUsuario = typeof ROLES[keyof typeof ROLES];
