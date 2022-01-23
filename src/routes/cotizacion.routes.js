const { Router } = require("express");
import { createCotizacion, createPDF, deleteCotizacion, getAllCotizacion, getCotizacion, getPDF, updateCotizacion } from '../controller/cotizacion.controller';
import * as authJWT from '../middlewares/authJWT'

const router = Router()

router.get('/', [authJWT.verifyToken], (req, res) => {
    res.json({ message: 'api/cuotes' })
})
router.get('/one/:id', [authJWT.verifyToken], getCotizacion)
router.get('/all', [authJWT.verifyToken], getAllCotizacion)
router.post('/', [authJWT.verifyToken], createCotizacion)
router.get('/reporte/:id', [authJWT.verifyToken], createPDF)
router.get('pdf', [authJWT.verifyToken], getPDF)
router.put('/', [authJWT.verifyToken], updateCotizacion)
router.delete('/:id', [authJWT.verifyToken], deleteCotizacion)

export default router