# flujo de cambios en el proyecto
## configuracion inicial

```shell
# iniciar proyecto
npm create vite@latest . 

# crear rama para deployd /dist en rama gh-pages
npm install gh-pages --save-dev
```

```javascript
// configuracion de vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/' // reemplaza por el nombre exacto de tu repo
})

```

```json
"scripts": {
  "dev": "vite",
  "deploy": "gh-pages -d dist", // agregar direccion de deplod
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
},

```

## configuracion por cada cambio nuevo
```shell
# comandos por cada nuevo cambio en el proyecto
git add .
git commit -m "Actualización del portfolio"
git push origin main
npm run deploy

```

