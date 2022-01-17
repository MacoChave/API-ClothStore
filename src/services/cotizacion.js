import { query } from '../services/db'

export const getOne = async (id) => {
    const rows = await query(
        'SELECT * FROM cotizacion WHERE id = ?',
        [id]
    );

    return rows;
};

export const getMultiple = async () => {
    const rows = await query(
        `SELECT * FROM cotizacion`
    );

    return rows;
};

export const insertOne = async (cotizacion) => {
    const result = await query(
        'INSERT INTO cotizacion (imagen, deporte, modelo, sexo, tela, talla, costo_t, costo_a, descripcion) VALUES(?,?,?,?,?,?,?,?,?)',
        [
            cotizacion.imagen,
            cotizacion.deporte,
            cotizacion.modelo,
            cotizacion.sexo,
            cotizacion.tela,
            cotizacion.talla,
            cotizacion.costo_t,
            cotizacion.costo_a,
            cotizacion.descripcion,
        ]
    );

    let message = 'Error in creating product'

    if (result.affectedRows) message = 'Product created successfully'

    return { message };
};

export const updateOne = async (cotizacion) => {
    const result = await query(
        'UPDATE cotizacion SET imagen = ?, deporte = ?, modelo = ?, sexo = ?, tela = ?, talla = ?, costo_t = ?, costo_a = ?, descripcion = ? WHERE id = ?',
        [
            cotizacion.imagen,
            cotizacion.deporte,
            cotizacion.modelo,
            cotizacion.sexo,
            cotizacion.tela,
            cotizacion.talla,
            cotizacion.costo_t,
            cotizacion.costo_a,
            cotizacion.descripcion,
            cotizacion.id
        ]
    );
    let message = 'Error in updating product'

    if (result.affectedRows) message = 'Product updated succesfully'

    return { message };
};
