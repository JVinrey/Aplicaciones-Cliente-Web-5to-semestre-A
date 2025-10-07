import 'reflect-metadata'
import { AppDataSource } from './data-source'

async function bootstrap() {
  try {
    await AppDataSource.initialize()
    console.log('📦 Base de datos conectada y sincronizada')

    // Ejecutar semillas automáticamente si SEED=true o en entorno de desarrollo
    const shouldSeed = process.env.SEED === 'true' || process.env.NODE_ENV === 'development'
    if (shouldSeed) {
      try {
        const seeds = await import('./seeds')
        if (seeds && typeof seeds.runAllSeeds === 'function') {
          console.log('🌱 Ejecutando semillas...')
          await seeds.runAllSeeds()
        }
      } catch (err) {
        console.error('❌ Error importando/ejecutando semillas:', err)
      }
    }

    // Aquí puedes iniciar tu servidor Express, por ejemplo
  } catch (error) {
    console.error('Error al conectar la base de datos:', error)
  }
}

bootstrap()