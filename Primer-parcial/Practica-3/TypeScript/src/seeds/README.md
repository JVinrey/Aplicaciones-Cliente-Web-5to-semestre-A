Este archivo contiene la semilla (AllSeed.ts) para poblar la base de datos con datos de ejemplo.

Cómo ejecutar:

1. Asegúrate de tener configurado `AppDataSource` y la base de datos según `src/data-source.ts`.
2. Compila/ejecuta TypeScript (por ejemplo con `ts-node` o `npm run seed` si lo configuras).

Ejemplo con ts-node:

# Instala ts-node si no lo tienes
npm i -D ts-node typescript

# Ejecuta la semilla
npx ts-node ./src/seeds/AllSeed.ts

Nota: El script intenta no duplicar registros comprobando campos clave (email, url, etc.).
