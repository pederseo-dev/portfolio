# arquitectura **feature-based**
Cada feature contiene sus propios componentes, hooks, servicios y lógica relacionada.
Ejemplo: `auth/`, `products/`, etc.

Reglas rápidas:

* `features/` → funcionalidades completas (cada una con su lógica)

* `shared/` → componentes, hooks y utilidades reutilizables

* `app/` → configuración global (rutas, providers)

* Mantener todo lo relacionado a una feature en el mismo lugar

* Evitar carpetas globales por tipo (`components/`, `services/`, etc.)

* Pensar primero en “qué funcionalidad es” antes de “qué tipo de archivo es”

* Si algo se reutiliza mucho → moverlo a `shared/`


## init
```shell
# isntallation
npm install

# dev mode run
npm run dev

# build app
npm run build

# run build
npm run preview

# deployd changes
npm run deploy
```

# URL Deployd
- https://pederseo-dev.github.io/portfolio/

