import { Router } from "express";
import { login, logup, validate } from "../controller/auth.controller";
import * as authJWT from '../middlewares/authJWT'

const router = Router()

router.post('/', login)
router.get('/', [authJWT.verifyToken], validate)

export default router