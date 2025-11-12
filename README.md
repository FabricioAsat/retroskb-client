# 🖥️ Retroskb — Frontend

El frontend de **Retroskb** está desarrollado con **React.js** y **Vite**, utilizando **TailwindCSS** para los estilos, **React Router** para la navegación y **Framer Motion** para animaciones suaves y modernas.  
Su objetivo es ofrecer una interfaz rápida, intuitiva y atractiva para la gestión de mangas dentro del ecosistema Retroskb.

---

## ⚙️ Tecnologías principales

| Tecnología | Descripción |
|-------------|-------------|
| **React.js** | Librería principal para la construcción de interfaces de usuario. |
| **Vite** | Entorno de desarrollo ultrarrápido y herramienta de build. |
| **Bun** | Gestor de paquetes y runtime alternativo, veloz y moderno. |
| **TailwindCSS** | Framework CSS utility-first para un diseño responsivo y consistente. |
| **React Router** | Manejador de rutas SPA (Single Page Application). |
| **Framer Motion** | Librería para animaciones fluidas y transiciones elegantes. |

---

## 🚀 Ejecución del proyecto

### 🔧 Requisitos previos

- Tener instalado **Bun** → [https://bun.sh](https://bun.sh)  
  (También podés usar **npm** o **yarn**, pero el proyecto está optimizado para Bun)

---

### ▶️ Modo desarrollo

```bash
cd web
bun install
bun dev

Esto levantará el servidor en:  
👉 [http://localhost:5173](http://localhost:5173)

---

### 🏗️ Build de producción

```bash
bun run build

El resultado se generará en la carpeta `dist/`, lista para ser servida por el backend de Go en modo producción.
[Aquí el backend](https://github.com/FabricioAsat/retroskb-server)

---

## 🎨 Diseño y animaciones

- El diseño utiliza **TailwindCSS** con un enfoque **responsive-first**.  
- Las animaciones están implementadas con **Framer Motion**, lo que le da fluidez y dinamismo a la UI.  
- El modo oscuro/claro puede controlarse mediante contexto global o el `ThemeContext` del proyecto.


## 🧠 Principales características

- Navegación SPA con **React Router**.  
- Transiciones animadas entre páginas con **Motion**.  
- Sistema de **tema dinámico (dark/light)**.  
- Consumo de la **API backend de Retroskb**. 
- Diseño **limpio, moderno y rápido** con **TailwindCSS**.  
- Uso de **Bun** para mayor velocidad en desarrollo y build.  

---

## 🧰 Scripts disponibles

| Comando | Descripción |
|----------|-------------|
| `bun run dev` | Inicia el servidor de desarrollo |
| `bun run build` | Genera el build de producción |
| `bun install` | Instala las dependencias |

---

## 👨‍💻 Autor

**Fabricio Asat**  
💻 Proyecto personal — desarrollado con React, Vite, Bun, TailwindCSS y Framer Motion.  
📧 [fabricioasat00@gmail.com]  
🔗 [LinkedIn](https://www.linkedin.com/in/fabricio-daniel-asat-780127237/)

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.
