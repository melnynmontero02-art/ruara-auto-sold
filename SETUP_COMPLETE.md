# 🚗 RUARA AUTO SOLD - SETUP COMPLETO

Dealer premium de autos en República Dominicana con admin panel integrado.

## 📋 Tabla de Contenidos

1. [Instalación Local](#instalación-local)
2. [Configuración Supabase](#configuración-supabase)
3. [Setup Final](#setup-final)
4. [Deploy a Vercel](#deploy-a-vercel)
5. [Admin Panel](#admin-panel)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Instalación Local

### **Paso 1: Clonar/Descargar Proyecto**

```bash
cd /tu/carpeta/ruara-auto-sold
npm install
```

### **Paso 2: Verificar .env.local**

El archivo `.env.local` ya existe con tus credenciales Supabase. Verifica:

```bash
cat .env.local
```

Debe verse así:
```
NEXT_PUBLIC_SUPABASE_URL=https://hujiprwgpwqisjfzjwjm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vBVtaB-f7vqLT6hZMwWEdg_Jehw3ahW
SUPABASE_SERVICE_KEY=eyJhbGci...
```

---

## 🔧 Configuración Supabase

### **Paso 1: Crear Tablas**

1. Ve a: **https://supabase.com/dashboard**
2. Selecciona tu proyecto `ruara-auto-sold`
3. Click en **SQL Editor** (izquierda)
4. Click en **New Query**
5. Copia el contenido de `SUPABASE_SETUP.sql`
6. Pégalo en el editor
7. **Click "Run"**

Espera a que termine (unos 5 segundos).

### **Paso 2: Verificar Tablas**

Ve a **Table Editor** y verifica que existan:
- ✅ `vehicles`
- ✅ `leads`
- ✅ `stats`

---

## 🎯 Setup Final

### **Paso 1: Ejecutar Localmente**

```bash
npm run dev
```

Abre **http://localhost:3000**

Deberías ver el sitio funcionando normalmente.

### **Paso 2: Probar Admin Panel**

1. Ve a **http://localhost:3000/admin**
2. Login:
   - **Email:** `admin@ruara.com`
   - **Contraseña:** `Ruara2024!Admin`

3. Deberías ver:
   - ✅ Dashboard con stats
   - ✅ Gestor de vehículos
   - ✅ Leads recibidos
   - ✅ Editor de estadísticas

### **Paso 3: Crear Primer Vehículo**

1. En admin panel → **Vehículos**
2. Click **Agregar vehículo**
3. Completa el formulario
4. Click **Guardar**
5. El vehículo aparece en el inventario del sitio

---

## 📤 Deploy a Vercel

### **Paso 1: Push a GitHub**

```bash
git add .
git commit -m "Setup Supabase + Admin panel"
git push origin main
```

### **Paso 2: Deploy en Vercel**

1. Ve a: **https://vercel.com/dashboard**
2. Click **Add New Project**
3. Importa tu repo de GitHub `ruara-auto-sold`
4. **Framework:** Next.js (detección automática)
5. **Environment Variables:** Copia estas 3:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://hujiprwgpwqisjfzjwjm.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vBVtaB-f7vqLT6hZMwWEdg_Jehw3ahW
   SUPABASE_SERVICE_KEY=eyJhbGci...
   ```
6. Click **Deploy**

Espera ~3 minutos.

### **Paso 3: Verificar Deploy**

1. Tu sitio estará en: `https://ruara-auto-sold.vercel.app`
2. Verifica:
   - ✅ Página principal carga
   - ✅ Inventario muestra vehículos
   - ✅ `/admin` funciona
   - ✅ Formularios guardan leads en BD

---

## 🔐 Admin Panel

### **Acceso**

- **URL:** `https://tudominio.com/admin`
- **Email:** `admin@ruara.com`
- **Contraseña:** `Ruara2024!Admin`

⚠️ **IMPORTANTE:** Cambia estas credenciales después del primer acceso (en BD, tabla `admin_users`).

### **Features**

#### **1️⃣ Vehículos**
- ✅ Ver todos los vehículos activos
- ✅ Agregar nuevo vehículo
- ✅ Editar información
- ✅ Eliminar vehículos (marcar como inactivo)
- ✅ Subir imágenes

#### **2️⃣ Leads**
- ✅ Ver todas las consultas/leads
- ✅ Marcar como leído
- ✅ Ver teléfono y email
- ✅ Contactar directamente (links a WhatsApp/Email)

#### **3️⃣ Estadísticas**
- ✅ Editar: Total vendidos, Bancos aliados, % Aprobación, Años de experiencia
- ✅ Cambios se reflejan en el sitio al instante

---

## 🔄 Flujo de Trabajo

### **Agregar un Nuevo Vehículo**

1. **En Admin Panel:**
   - Vehículos → Agregar vehículo
   - Completa: Marca, Modelo, Año, Precio, etc.
   - Pega URL de imagen
   - Click Guardar

2. **En el Sitio:**
   - Aparece en `/inventario`
   - Filtrable por marca, tipo, precio
   - Clickeable para ver detalles

### **Recibir un Lead**

1. **Cliente llena formulario** en el sitio
   - "Quiero vender mi auto" o "Consultar financiamiento"
2. **Lead se guarda en BD automáticamente**
3. **Ves en Admin Panel → Leads**
4. **Contacta al cliente** por WhatsApp o Email

---

## 🛠️ Troubleshooting

### **Problema: Admin no carga/error de autenticación**

**Solución:**
1. Verifica `.env.local` en tu proyecto
2. Limpia cache: `npm run build && npm run dev`
3. Borra localStorage en el navegador

### **Problema: Vehículos no aparecen en BD**

**Solución:**
1. Ve a Supabase → Table Editor → `vehicles`
2. Verifica que la tabla tenga datos
3. Si está vacía, agrega un vehículo desde admin

### **Problema: Imágenes no cargan**

**Solución:**
1. Verifica que el URL de imagen sea válido
2. Para imágenes locales: `/images/cars/car-01.jpg`
3. Para URLs externas: `https://ejemplo.com/foto.jpg`

### **Problema: Deploy en Vercel falla**

**Solución:**
1. Verifica que `.env.local` esté en `.gitignore`
2. Agrega variables en Vercel → Settings → Environment Variables
3. Redeploy: `vercel --prod`

---

## 📊 Base de Datos

### **Tabla: vehicles**
```sql
id, created_at, brand, model, year, price, initial, 
fuel, transmission, mileage, type, image, fallback, 
tag, color, seats, verified, is_active
```

### **Tabla: leads**
```sql
id, created_at, name, phone, email, vehicle_interest, 
message, is_read
```

### **Tabla: stats**
```sql
id, created_at, key (total_sold, partner_banks, etc), value
```

---

## 📱 Responsive

El sitio es completamente responsive:
- ✅ Desktop: Toda la experiencia completa
- ✅ Tablet: Optimizado para pantallas medianas
- ✅ Mobile: Botones grandes, menú hamburguesa, formularios simplificados

---

## 🎨 Personalización

### **Cambiar colores:**
- Edita `/app/globals.css` (variables CSS)

### **Cambiar textos:**
- `/lib/data.ts` (información general)
- Componentes en `/components/sections`

### **Cambiar credenciales admin:**
- `/app/admin/page.tsx` (líneas 8-11)
- ⚠️ También actualiza en BD después

---

## 🚨 Security Notes

1. **Las credenciales admin están en el código** ← CAMBIAR en producción
2. **Usar Supabase Auth** en lugar de credentials hardcodeados
3. **RLS está habilitado** en la BD (ver `SUPABASE_SETUP.sql`)
4. **API routes validan input** antes de guardar

---

## 📞 Soporte

Si hay problemas:
1. Verifica que Supabase esté online
2. Revisa los logs de Vercel
3. Prueba localmente con `npm run dev`

---

**Última actualización:** Junio 2026  
**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind + Supabase
