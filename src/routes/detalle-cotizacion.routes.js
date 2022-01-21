import { Router } from 'express'
import { createDetalleCotizacion, deleteDetalleCotizacion, getAllDetalleCotizacion, getDetalleCotizacion, updateDetalleCotizacion } from '../controller/detalle-cotizacion.controller'
import * as authJWT from '../middlewares/authJWT'

const router = Router()

router.get('/', [authJWT.verifyToken], (req, res) => {
    res.json({ message: 'api/detail' })
})
router.get('/one/:id', [authJWT.verifyToken], getDetalleCotizacion)
router.get('/all', [authJWT.verifyToken], getAllDetalleCotizacion)
router.post('/', [authJWT.verifyToken], createDetalleCotizacion)
router.put('/', [authJWT.verifyToken], updateDetalleCotizacion)
router.delete('/', [authJWT.verifyToken], deleteDetalleCotizacion)

export default router