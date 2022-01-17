/**
 * 
 * @param {number} currentPage 
 * @param {number} listPerPage 
 * @returns {number}
 */
export const getOffset = (currentPage = 1, listPerPage) => {
    return (currentPage - 1) * [listPerPage]
}

/**
 * 
 * @param {Array} rows 
 * @returns {Array}
 */
export const emptyOrRows = (rows) => {
    if (rows.length === 0) return []
    return rows
}
