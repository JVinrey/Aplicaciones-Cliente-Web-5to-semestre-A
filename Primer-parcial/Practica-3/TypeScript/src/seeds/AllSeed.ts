import { AppDataSource } from '../data-source'
import { Usuario } from '../model/Usuarios'
import { Categoria } from '../model/Categoria'
import { Servicio } from '../model/Servicio'
import { Proveedor } from '../model/Proveedor'
import { Reserva } from '../model/Reserva'
import { Pago } from '../model/Pago'
import { Comentario } from '../model/Comentario'
import { Calificacion } from '../model/Calificacion'
import { Ubicacion } from '../model/Ubicacion'
import { Foto } from '../model/FotoServicio'
import { ReservaServicio } from '../model/ReservaServicio'
import { ServicioUbicacion } from '../model/ServicioUbicacion'

export async function runAllSeeds() {
  const createdConnection = !AppDataSource.isInitialized
  try {
    if (createdConnection) {
      await AppDataSource.initialize()
      console.log('🔌 Base de datos conectada (AllSeed)')
    } else {
      console.log('ℹ️ AppDataSource ya estaba inicializada, usando conexión existente')
    }

    const userRepo = AppDataSource.getRepository(Usuario)
    const categoriaRepo = AppDataSource.getRepository(Categoria)
    const ubicacionRepo = AppDataSource.getRepository(Ubicacion)
    const proveedorRepo = AppDataSource.getRepository(Proveedor)
    const servicioRepo = AppDataSource.getRepository(Servicio)
    const fotoRepo = AppDataSource.getRepository(Foto)
    const clienteRepo = AppDataSource.getRepository((await import('../model/Ciente')).Cliente)
    const reservaRepo = AppDataSource.getRepository(Reserva)
    const reservaServicioRepo = AppDataSource.getRepository(ReservaServicio)
    const pagoRepo = AppDataSource.getRepository(Pago)
    const comentarioRepo = AppDataSource.getRepository(Comentario)
    const calificacionRepo = AppDataSource.getRepository(Calificacion)
    const servicioUbicacionRepo = AppDataSource.getRepository(ServicioUbicacion)

    async function saveAndLog<T>(repo: any, entity: T, label: string): Promise<T> {
      const saved = await repo.save(entity)
      console.log(`✅ ${label} guardado id=${(saved as any).id ?? '(sin id)'}`)
      return saved as T
    }

    const admin = await userRepo.findOneBy({ email: 'admin@admin.com' })
    if (!admin) {
      const u = userRepo.create({ nombre: 'admin', email: 'admin@admin.com', username: 'admin', password: '1234', rol: 'admin' })
      await saveAndLog(userRepo, u, 'Usuario admin')
    }

    const user1 = await userRepo.findOneBy({ email: 'cliente1@example.com' })
    if (!user1) {
      const u = userRepo.create({ nombre: 'Cliente Uno', email: 'cliente1@example.com', username: 'cliente1', password: 'password', rol: 'cliente' })
      await saveAndLog(userRepo, u, 'Usuario cliente')
    }

    const cat = await categoriaRepo.findOneBy({ nombre_categoria: 'Belleza' })
    let categoria
    if (!cat) {
      categoria = categoriaRepo.create({ nombre_categoria: 'Belleza', descripcion: 'Servicios de belleza y cuidado personal' })
      categoria = await saveAndLog(categoriaRepo, categoria, 'Categoria')
    } else categoria = cat

    const ubi = await ubicacionRepo.findOneBy({ Direccion: 'Av. Principal 123' })
    let ubicacion
    if (!ubi) {
      ubicacion = ubicacionRepo.create({ Direccion: 'Av. Principal 123', Ciudad: 'CiudadX', Provincia: 'ProvinciaY', Pais: 'PaisZ' })
      ubicacion = await saveAndLog(ubicacionRepo, ubicacion, 'Ubicacion')
    } else ubicacion = ubi

    const provUser = await userRepo.findOneBy({ email: 'proveedor1@example.com' })
    let proveedorUser
    if (!provUser) {
      proveedorUser = userRepo.create({ nombre: 'Proveedor Uno', email: 'proveedor1@example.com', username: 'prove1', password: 'provpass', rol: 'proveedor' })
      proveedorUser = await saveAndLog(userRepo, proveedorUser, 'Usuario proveedor')
    } else proveedorUser = provUser

    const provExists = await proveedorRepo.findOne({ where: { descripcion: 'Proveedor demo' }, relations: ['Usuario'] })
    let proveedor
    if (!provExists) {
      proveedor = proveedorRepo.create({ telefono: '555-0001', descripcion: 'Proveedor demo', Usuario: proveedorUser, Ubicacion: ubicacion })
      proveedor = await saveAndLog(proveedorRepo, proveedor, 'Proveedor')
    } else proveedor = provExists

    const servExists = await servicioRepo.findOneBy({ nombre_servicio: 'Corte de cabello' })
    let servicio
    if (!servExists) {
      servicio = servicioRepo.create({ nombre_servicio: 'Corte de cabello', descripcion: 'Corte de cabello profesional', duracion: '30m', Categoria: categoria, Proveedor: proveedor })
      servicio = await saveAndLog(servicioRepo, servicio, 'Servicio')
    } else servicio = servExists

    const fotoExists = await fotoRepo.findOneBy({ url: 'https://example.com/corte.jpg' })
    if (!fotoExists) {
      const foto = fotoRepo.create({ url: 'https://example.com/corte.jpg', descripcion: 'Foto demo', Servicio: servicio })
      await saveAndLog(fotoRepo, foto, 'Foto de servicio')
    }

    const clienteUser = await userRepo.findOneBy({ email: 'cliente1@example.com' })
    const clienteExists = await clienteRepo.findOne({ where: { telefono: '999-0001' }, relations: ['Usuario'] })
    let cliente
    if (!clienteExists && clienteUser) {
      cliente = clienteRepo.create({ telefono: '999-0001', Usuario: clienteUser, Ubicacion: ubicacion })
      cliente = await saveAndLog(clienteRepo, cliente, 'Cliente')
      console.log('✅ Cliente creado')
    } else cliente = clienteExists

    const reserva1 = await reservaRepo.findOneBy({ total: 25 })
    let reserva
    if (!reserva1 && cliente) {
      reserva = reservaRepo.create({ fecha: new Date(), hora: '10:00', estado: 'pendiente', total: 25 })
      reserva = await saveAndLog(reservaRepo, reserva, 'Reserva')
      console.log('✅ Reserva creada')
    } else reserva = reserva1

    if (reserva && servicio) {
      const rsExists = await reservaServicioRepo.findOneBy({ Subtotal: 25 })
      if (!rsExists) {
        const rs = reservaServicioRepo.create({ Cantidad: 1, PrecionUnitario: 25, Subtotal: 25, Reserva: reserva, Servicio: servicio })
        await saveAndLog(reservaServicioRepo, rs, 'ReservaServicio')
        console.log('✅ ReservaServicio creada')
      }
    }

    if (reserva) {
      const pagoExists = await pagoRepo.findOneBy({ referencia: 'PAY123' })
      if (!pagoExists) {
        const pago = pagoRepo.create({ monto: 25, metodo_pago: 'tarjeta', estado: 'completado', referencia: 'PAY123', fecha_de_pago: new Date(), Reserva: reserva })
        await saveAndLog(pagoRepo, pago, 'Pago')
        console.log('✅ Pago creado')
      }
    }

    if (servicio && cliente) {
      const comExists = await comentarioRepo.findOneBy({ titulo: 'Buen servicio' })
      if (!comExists) {
        const com = comentarioRepo.create({ titulo: 'Buen servicio', descripcion: 'Me gustó el corte', fecha: new Date(), Servicio: servicio, Cliente: cliente as any })
        await saveAndLog(comentarioRepo, com, 'Comentario')
        console.log('✅ Comentario creado')
      }
    }

    if (servicio && cliente) {
      const calExists = await calificacionRepo.findOneBy({ puntuacion: 5 })
      if (!calExists) {
        const cal = calificacionRepo.create({ fecha: new Date(), puntuacion: 5, Cliente: cliente, Servicio: servicio })
        await saveAndLog(calificacionRepo, cal, 'Calificacion')
        console.log('✅ Calificacion creada')
      }
    }

    const suExists = await servicioUbicacionRepo.findOne({ where: { Servicio: servicio, Ubicacion: ubicacion } })
    if (!suExists) {
      const su = servicioUbicacionRepo.create({ Servicio: servicio, Ubicacion: ubicacion })
      await servicioUbicacionRepo.save(su)
      console.log('✅ ServicioUbicacion creada')
    }

    console.log('🌱 All seeds completed')
  } catch (err) {
    console.error('❌ Error ejecutando AllSeed:', err)
  } finally {
    if (createdConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy()
      console.log('🔌 Conexión cerrada (AllSeed)')
    } else if (!createdConnection) {
      console.log('ℹ️ No se cerró la conexión porque no fue creada por la semilla')
    }
  }
}
