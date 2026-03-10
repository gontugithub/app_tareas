# 📝 App de Tareas Avanzada

Una aplicación web moderna de gestión de tareas con interfaz intuitiva, animaciones fluidas y características avanzadas. Construida con React 19, Vite y Tailwind CSS.

https://tareas-orcin.vercel.app/

## ✨ Características Principales

### 🎯 CRUD Completo de Tareas
- ✅ **Agregar tareas**: Crea nuevas tareas con un formulario intuitivo
- ✅ **Marcar completadas**: Marca tareas como completadas/incompletas con un clic
- ✅ **Editar tareas**: Edita el texto de tareas directamente en la lista
- ✅ **Eliminar tareas**: Borra tareas individuales o todas las completadas de una vez
- ✅ **Limpiar completadas**: Botón para eliminar todas las tareas marcadas como completadas

### 🔥 Prioridades Visuales
- **Baja** (📌): Tareas de baja prioridad
- **Media** (⭐): Tareas de prioridad normal
- **Alta** (🔥): Tareas urgentes
- Los indicadores son visuales con colores y emojis para fácil identificación

### 📅 Gestión de Fechas
- Establece fechas límite para cada tarea
- Las tareas vencidas se resaltan en rojo con advertencia (⚠️ VENCIDA)
- Formateo automático de fechas en español

### 🏷️ Categorización
- **Trabajo** (💼): Tareas laborales
- **Personal** (👤): Asuntos personales
- **Hogar** (🏠): Tareas del hogar
- **Salud** (⚕️): Temas de salud
- **Otros** (📌): Categoría general

### 🔍 Búsqueda Inteligente
- Busca en tiempo real por:
  - Texto de la tarea
  - Categoría
  - Fecha
- **Debounce de 300ms** para mejor rendimiento (custom hook `useDebounce`)

### 👁️ Filtros y Controles
- **Ocultar completadas**: Toggle para mostrar/ocultar tareas completadas (custom hook `useToggle`)
- **Estadísticas en vivo**: Muestra total, completadas y pendientes

### 💾 Persistencia en localStorage
- Todas las tareas se guardan automáticamente en el navegador
- Las tareas persisten incluso después de cerrar el navegador
- Custom hook `useLocalStorage` para sincronización bidireccional

### 🎨 Interfaz Visual Mejorada
- **Animaciones fluidas** con Motion for React
- **Gradientes** sutiles en fondo y tarjetas
- **Tarjetas interactivas** que responden al hover
- **Indicador visual de guardado**
- **Estadísticas animadas** (Total, Completadas, Pendientes)

### 🎯 Drag & Drop
- Reordena tareas arrastrando y soltando
- Feedback visual durante el arrastre
- Integración con `@hello-pangea/dnd`

### 🔧 Controles Adicionales
- **Resetear app**: Botón para limpiar todo con confirmación
- **Indicador de guardado**: Muestra mensaje cuando se guarda
- **Responsivo**: Funciona en escritorio, tablet y móvil

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.2.0**: Framework de UI
- **Vite 7.3.1**: Bundler rápido y dev server
- **Tailwind CSS 4.2.1**: Utilidades CSS

### Librerías
- **motion 11.7.0**: Animaciones suaves (Motion for React)
- **@hello-pangea/dnd 16.6.0**: Drag & Drop accesible

### Herramientas
- **ESLint 9.39.1**: Linting de código
- **Node.js**: Runtime de JavaScript

## 📦 Estructura del Proyecto

```
app_tareas/
├── src/
│   ├── components/
│   │   ├── AddTaskInput.jsx          # Formulario para agregar tareas
│   │   ├── TaskItem.jsx               # Componente de tarea individual
│   │   ├── TaskList.jsx               # Lista de tareas (opcional)
│   │   ├── ClearCompletedButton.jsx   # Botón limpiar completadas
│   │   ├── HideCompletedCheckbox.jsx  # Toggle ocultar completadas
│   │   ├── SavedIndicator.jsx         # Indicador de guardado
│   │   ├── ResetAppButton.jsx         # Botón resetear app
│   │   └── Layout.jsx                 # Componentes reutilizables
│   ├── hooks/
│   │   ├── useLocalStorage.js         # Persistencia en localStorage
│   │   ├── useDebounce.js             # Debounce para búsqueda
│   │   └── useToggle.js               # Toggle boolean
│   ├── App.jsx                        # Componente principal
│   ├── App.css                        # Estilos globales
│   ├── index.css                      # Tailwind imports
│   └── main.jsx                       # Entry point
├── public/
├── vite.config.js                     # Configuración Vite
├── eslint.config.js                   # Configuración ESLint
├── package.json                       # Dependencias
├── index.html                         # HTML principal
└── README.md                          # Este archivo
```

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+ y npm

### Instalación

```bash
# 1. Navega al directorio del proyecto
cd app_tareas

# 2. Instala dependencias (con legacy-peer-deps por compatibilidad)
npm install --legacy-peer-deps

# 3. Inicia el servidor de desarrollo
npm run dev
```

### Compilar para Producción

```bash
npm run build
```

### Previsualizar Build

```bash
npm run preview
```

## 🎮 Cómo Usar

### Agregar una Tarea
1. Escribe el texto en el campo "¿Qué necesitas hacer?"
2. (Opcional) Selecciona una fecha límite
3. (Opcional) Elige una categoría
4. Selecciona la prioridad (Baja, Media, Alta)
5. Haz clic en "➕ Añadir" o presiona Enter

### Editar una Tarea
1. Haz clic en el icono ✏️ en la tarea
2. Modifica el texto
3. Haz clic en 💾 o presiona Enter para guardar

### Marcar como Completada
- Haz clic en el checkbox de la tarea

### Eliminar una Tarea
- Haz clic en el icono 🗑️

### Buscar Tareas
- Usa el campo de búsqueda (aparece si hay más de una tarea)
- Busca por nombre, categoría o fecha

### Ocultar Completadas
- Activa el checkbox "Ocultar completadas" (si hay tareas completadas)

### Reordenar Tareas
- Arrastra cualquier tarea a la posición deseada

### Resetear Todo
- Haz clic en "🔄 Resetear" (con confirmación)

## 🎨 Características de Diseño

### Paleta de Colores
- **Indigo**: Color principal (botones, acentos)
- **Rojo**: Alertas, tareas vencidas
- **Verde**: Completadas, confirmaciones
- **Gradientes**: Fondos sutiles

### Animaciones
- Entrada/salida de tareas con `AnimatePresence`
- Hover effects en tarjetas y botones
- Transiciones suaves en todos los elementos
- Feedback visual al arrastrar

### Accesibilidad
- Botones con tamaño adecuado (área de clic grande)
- Contraste de colores suficiente
- Etiquetas claras en todos los controles
- Atributos ARIA donde corresponde

## 🧩 Custom Hooks

### `useLocalStorage(key, initialValue)`
Sincroniza estado con localStorage automáticamente.

```javascript
const [tasks, setTasks] = useLocalStorage('tasks', []);
```

### `useDebounce(value, delay)`
Debouncea un valor (útil para búsqueda).

```javascript
const debouncedSearch = useDebounce(searchTerm, 300);
```

### `useToggle(initialValue)`
Toggle booleano simple.

```javascript
const [hideCompleted, toggleHideCompleted] = useToggle(false);
```

## 📊 Estadísticas

La app muestra en tiempo real:
- **Total**: Número total de tareas
- **Completadas**: Cuántas tareas están hechas
- **Pendientes**: Cuántas tareas quedan por hacer

## 🐛 Resolución de Problemas

### npm install falla con dependencias
```bash
npm install --legacy-peer-deps
```

### La app no carga en el navegador
1. Abre la consola (F12)
2. Verifica si hay errores
3. Limpia el localStorage: `localStorage.clear()`
4. Recarga la página (Ctrl + R o Cmd + R)

### Las tareas no se guardan
- Verifica que el navegador permite localStorage
- Comprueba en DevTools → Application → Storage → LocalStorage

## 📝 Funcionalidades Futuras

- [ ] Subtareas o checklist dentro de tareas
- [ ] Etiquetas personalizadas (tags)
- [ ] Filtrado avanzado
- [ ] Temas oscuro/claro
- [ ] Exportar/importar tareas (JSON, CSV)
- [ ] Notificaciones para tareas vencidas
- [ ] Historial de cambios
- [ ] Colaboración en tiempo real

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como parte de un ejercicio de React avanzado.

---

**¡Esperamos que disfrutes usando la app de tareas! 🎉**
