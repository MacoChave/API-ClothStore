import { query } from './db'

export const getOne = async (id) => {
    const rows = await query(
        'SELECT * FROM cliente WHERE id = ?',
        [id]
    );

    return rows;
};

export const getMultiple = async () => {
    const rows = await query(
        `SELECT * FROM cliente`
    );

    return rows;
};

export const insertOne = async (cliente) => {
    const result = await query(
        'INSERT INTO cliente (nombre, apellido, razon, ruc, direccion, telefono, correo) VALUES(?,?,?,?,?,?,?)',
        [
            cliente.nombre,
            cliente.apellido,
            cliente.razon,
            cliente.ruc,
            cliente.direccion,
            cliente.telefono,
            cliente.correo,
        ]
    );

    let message = 'Error in creating client'

    if (result.affectedRows) message = 'Client created successfully'

    return { message };
};

export const updateOne = async (cliente) => {
    const result = await query(
        'UPDATE cliente SET nombre = ?, apellido = ?, razon = ?, ruc = ?, direccion = ?, telefono = ?, correo = ? WHERE id = ?',
        [
            cliente.nombre,
            cliente.apellido,
            cliente.razon,
            cliente.ruc,
            cliente.direccion,
            cliente.telefono,
            cliente.correo,
            cliente.id
        ]
    );
    let message = 'Error in updating client'

    if (result.affectedRows) message = 'Client updated succesfully'

    return { message };
};
