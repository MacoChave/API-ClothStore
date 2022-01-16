import { Router } from "express";
import { createCliente, getAllCliente, getCliente, updateCliente } from "../controller/cliente.controller";
import * as authJWT from '../middlewares/authJWT'

const router = Router()

router.get('/', [authJWT.verifyToken], (req, res) => { res.json({ message: 'api/clients/' }) })
router.get('/one:id', [authJWT.verifyToken], getCliente)
router.get('/all', [authJWT.verifyToken], getAllCliente)
router.post('/create', [authJWT.verifyToken], createCliente)
router.put('/update', [authJWT.verifyToken], updateCliente)

export default router