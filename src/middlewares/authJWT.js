import jwt from 'jsonwebtoken'
import config from '../config'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if (!token) return res.status(403).json({ message: 'No token provided' })

        const decoded = jwt.verify(token, config.SECRET)

        if (decoded.id !== 'admin') return res.status(404).json({ message: 'No user found' })
        next()
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}