import { query } from '../services/db'
import { getOffset, emptyOrRows } from '../helper'
import { DB_OFFSET } from '../config';

export const getOne = async (id) => {
    const rows = await query(
        'SELECT * FROM cliente WHERE id = ?',
        [id]
    );

    return rows;
};

export const getMultiple = async (page = 1) => {
    const offset = getOffset(page, DB_OFFSET);
    const rows = await query(
        `SELECT * FROM cliente LIMIT ${offset}, ${DB_OFFSET}`
    );
    const data = emptyOrRows(rows);
    const meta = { page };

    return { data, meta };
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

    let message = 'Error in creating programming language'

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
