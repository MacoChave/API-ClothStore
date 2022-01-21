import { query } from './db'

export const getOne = async (id) => {
    const rows = await query(
        'SELECT * FROM producto WHERE id = ?',
        [id]
    );

    return rows;
};

export const getMultiple = async () => {
    const rows = await query(
        `SELECT * FROM producto`
    );

    return rows;
};

export const insertOne = async (producto) => {
    const result = await query(
        'INSERT INTO producto (imagen, deporte, modelo, sexo, tela, talla, costo_t, costo_a, descripcion) VALUES(?,?,?,?,?,?,?,?,?)',
        [
            producto.imagen,
            producto.deporte,
            producto.modelo,
            producto.sexo,
            producto.tela,
            producto.talla,
            producto.costo_t,
            producto.costo_a,
            producto.descripcion,
        ]
    );

    let message = 'Error in creating product'

    if (result.affectedRows) message = 'Product created successfully'

    return { message };
};

export const updateOne = async (producto) => {
    const result = await query(
        'UPDATE producto SET imagen = ?, deporte = ?, modelo = ?, sexo = ?, tela = ?, talla = ?, costo_t = ?, costo_a = ?, descripcion = ? WHERE id = ?',
        [
            producto.imagen,
            producto.deporte,
            producto.modelo,
            producto.sexo,
            producto.tela,
            producto.talla,
            producto.costo_t,
            producto.costo_a,
            producto.descripcion,
            producto.id
        ]
    );
    let message = 'Error in updating product'

    if (result.affectedRows) message = 'Product updated succesfully'

    return { message };
};
