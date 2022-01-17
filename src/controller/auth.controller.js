import jwt from 'jsonwebtoken'
import config from '../config'

export const login = async (req, res) => {
    const { user, pass } = req.body

    if (user !== 'amenas') return res.status(400).json({ token: null, message: 'User not found' })

    if (pass !== 'amenas') return res.status(401).json({ token: null, message: 'Invalid password' })

    const token = jwt.sign({ id: 'admin' }, config.SECRET, { expiresIn: "12h" })

    res.json({ token })
}

export const validate = async (req, res) => {
    res.json({ token: null, message: 'authorized' })
}
