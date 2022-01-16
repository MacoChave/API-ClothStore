export const getAllCliente = async (req, res) => {
    const query = `SELECT * FROM cliente`

    res.status(200).json({ message: 'User created' })
}

export const getCliente = async (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM cliente WHERE id = `

    res.status(200).json({ message: 'User created' })
}

export const createCliente = async (req, res) => {
    const { nombre, apellido, razon, ruc, direccion, telefono, correo } = req.body

    const query = `INSERT INTO cliente (nombre, apellido, razon, ruc, direccion, telefono, correo) VALUES()`

    res.status(200).json({ message: 'User created' })
}

export const updateCliente = async (req, res) => {
    const { id, nombre, apellido, razon, ruc, direccion, telefono, correo } = req.body

    const query = `UPDATE cliente SET`

    res.status(200).json({ message: 'User updated' })
}