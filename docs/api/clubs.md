# Clubes

## 📋 Descripción
Gestión de clubes de pádel

## 🛠️ Endpoints


### POST /clubs
**Crear nuevo club**


**Body:**
```json
{
  "nombre": "Club de Pádel XYZ",
  "descripcion": "Club de pádel en el centro",
  "ubicacion": {
    "direccion": "Calle Principal 123",
    "ciudad": "Madrid",
    "coordenadas": {
      "lat": 40.4168,
      "lng": -3.7038
    }
  }
}
```






---

### GET /clubs
**Listar todos los clubs**







---

### GET /clubs/:id
**Obtener club por ID**








---
*Generado automáticamente - 2025-08-29T11:11:39.096Z*
