export const getProducto = async (req, res) => {
    const { id } = req.query

    const query = `SELECT * FROM producto WHERE id = `

    res.status(200).json({ message: 'Product created' })
}

export const getAllProducto = async (req, res) => {
    const query = `SELECT * FROM producto`

    res.status(200).json({ message: 'Product created' })
}

export const createProducto = async (req, res) => {
    const { imagen, deporte, modelo, sexo, tela, talla, costo_t, costo_a, descripcion } = req.body

    const query = `INSERT INTO producto(imagen, deporte, modelo, sexo, tela, talla, costo_t, costo_a, descripcion) VALUES()`

    res.status(200).json({ message: 'Product created' })
}

export const updateProducto = async (req, res) => {
    const { id, imagen, deporte, modelo, sexo, tela, talla, costo_t, costo_a, descripcion } = req.body

    const query = `UPDATE producto SET`

    res.status(200).json({ message: 'Product created' })
}