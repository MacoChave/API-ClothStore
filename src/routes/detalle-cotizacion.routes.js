import { Router } from 'express'
import { createDetalleCotizacion, createDetallesCotizacion, deleteDetalleCotizacion, getAllDetalleCotizacion, getDetalleCotizacion, updateDetalleCotizacion } from '../controller/detalle-cotizacion.controller'
import * as authJWT from '../middlewares/authJWT'

const router = Router()

router.get('/', [authJWT.verifyToken], (req, res) => {
    res.json({ message: 'api/detail' })
})
router.get('/one/:id/:id_detalle', [authJWT.verifyToken], getDetalleCotizacion)
router.get('/all/:id', [authJWT.verifyToken], getAllDetalleCotizacion)
router.post('/', [authJWT.verifyToken], createDetalleCotizacion)
router.post('/all', [authJWT.verifyToken], createDetallesCotizacion)
router.put('/', [authJWT.verifyToken], updateDetalleCotizacion)
router.delete('/:id', [authJWT.verifyToken], deleteDetalleCotizacion)

export default router