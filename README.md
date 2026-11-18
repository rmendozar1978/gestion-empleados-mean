# Gestión de Empleados — MEAN Stack (GA8-220501096-AA1-EV02)

Arquitectura desacoplada: **Angular (4200) → Express API (3000) → MongoDB (27017)**.

## Estructura
- `backend/`  API REST (Node.js + Express + Mongoose)
- `frontend/src/` archivos de código de Angular (se copian sobre un proyecto creado con Angular CLI)
- `postman/`  colección con 14 casos de prueba de integración

## 1. Back-end
```bash
cd backend
npm install
npm run dev
```

## 2. Front-end (primera vez)
Desde la raíz del repositorio:
```bash
ng new frontend-tmp --standalone=false --routing=false --style=css --ssr=false --skip-git --skip-tests
```
Copia el contenido de `frontend/src/` sobre `frontend-tmp/src/` (reemplazando archivos),
luego elimina la carpeta `frontend/` original y renombra `frontend-tmp` a `frontend`.

Notas:
- Angular 20+: el componente raíz es `App` (`app.ts`/`app.html`). Ajusta el `import` en `app.module.ts`
  y pega el contenido de `app.component.html` en `app.html`.
- Angular 17-19: `app.component.html` incluido reemplaza al generado.
- Crea el componente y servicio con: `ng g c components/empleados --type=component` y
  `ng g s services/empleado --type=service` ANTES de copiar (para que existan los archivos base).

```bash
cd frontend
npm install
ng serve --open
```

## 3. Pruebas
Importa `postman/GA8-EV02.postman_collection.json` en Postman y ejecuta la colección en orden (Collection Runner).
