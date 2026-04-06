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
  "deploy": "gh-pages -d dist", // agregar direccion de deploy
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

# Google FireBase stack
## auth con google oauth + firestore rules

### firebase console
1. Authentication → Sign-in method → habilitar Google
2. Firestore → Rules → restringir write por email:
   allow write: if request.auth != null && request.auth.token.email == 'tu@gmail.com';

### stack
- `firebase/auth` → signInWithPopup + GoogleAuthProvider
- `react-firebase-hooks` → useAuthState para escuchar estado del user
- JWT token guardado automático en IndexedDB por el SDK
- token se renueva cada hora, se limpia con signOut()

### flujo
1. usuario clickea acción admin
2. si no hay user → LoginOverlay → signInWithPopup
3. google retorna token → firebase lo valida
4. useAuthState detecta el cambio → user disponible en AuthContext
5. firestore valida el email del token en cada write desde el servidor
