import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import clienteRoutes from './routes/cliente.routes'
import productoRoutes from './routes/producto.routes'
import pkgjson from '../package.json'

const app = express()

app.set('package-json', pkgjson)
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 4)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}))

// WELCOME TO ROUTES
app.get('/', (req, res) => {
    res.json({
        name: pkgjson.name,
        description: pkgjson.description,
        license: pkgjson.license,
        author: pkgjson.author,
        version: pkgjson.version,
    })
})

// ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/clients', clienteRoutes)
app.use('/api/products', productoRoutes)
// app.use('/api/cuotes', cuoteRoutes)

export default app