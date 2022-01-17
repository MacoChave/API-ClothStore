import { Router } from "express"
import { createProducto, getAllProducto, getProducto, updateProducto } from "../controller/producto.controller"
import * as authJWT from '../middlewares/authJWT'

const router = Router()

router.get('/', [authJWT.verifyToken], (req, res) => { res.json({ route: 'api/products/' }) })
router.get('/one/:id', [authJWT.verifyToken], getProducto)
router.get('/all', [authJWT.verifyToken], getAllProducto)
router.post('/', [authJWT.verifyToken], createProducto)
router.put('/', [authJWT.verifyToken], updateProducto)

export default router