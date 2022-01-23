/**
 * 
 * @param {number} price 
 * @returns {number}
 */
const rounded = (price) => {
	return price.toFixed(2)
}

/**
 * 
 * @param {Date} date 
 * @returns {string}
 */
const dateFormat = (date) => {
	return date.toLocaleDateString('es-MX', {
		weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
	})
}

export const getHTML = (cotizacion, detalle) => {
	let table_body = ``

	detalle.forEach((item) => {
		table_body += `<tr>
        <td>${item.id_producto}</td>
        <td>${item.cantidad}</td>
        <td style="width: 300px">${item.descripcion}</td>
        <td>${item.talla}</td>
        <td>S/ ${item.costo_t}</td>
        <td>S/ ${item.costo_a}</td>
        <td>S/ ${item.subtotal}</td>
    </tr>`
	})

	let header_html = `
	<div class="container">
		<div class="item">
			<h3>Datos del cliente:</h3>
			<div class="item__cliente">
				<p>Nombre: <span>${cotizacion.nombre}</span></p>
				<p>Fecha: <span>${dateFormat(cotizacion.fecha_creada)}</span></p>
			</div>
		</div>
		<div class="item">
			<h3>Tasas de cambio:</h3>
			<div class="item__tasas">
				<p>Soles: S/ <span>${cotizacion.soles}</span></p>
				<p>Dolares: $ <span>${cotizacion.dolares}</span> USD</p>
				<p>Pesos: $ <span>${cotizacion.pesos}</span></p>
			</div>
		</div>
	</div>`

	const html = `<html>
	<head>
		<style>
			.header {
				color: #303030;
				border-bottom: 2px solid #737373;
			}
			#pageFooter {
				color: #505050;
				border-top: 2px solid #737373;
			}
			.container {
				display: -webkit-flex;
				display: -ms-flexbox
				display: flex;
				-webkit-flex-direction: row;
				-ms-flex-direction: row;
				flex-direction: row;
				-webkit-justify-content: space-around;
				-ms-justify-content: space-around;
				justify-content: space-around;
				margin: 2em;
			}
			table thead {
				background-color: #303030;
				color: #b9b9b9;
			}
			table thead tr th {
				padding: 0.5em 1em;
			}
			table tbody tr:nth-child(2n) {
				background-color: #dcdcdc;
			}
		</style>
	</head>

	<body>
		<div id="pageHeader" class="header">
			<div style="text-align: center;">Reporte de cotización</div>
			${header_html}
		</div>

		<div class="container" style="margin-top: 150px">
			<div class="item">
				<h2>Productos</h2>
				<table>
					<thead>
						<tr>
							<th>Código del producto</th>
							<th>Cantidad</th>
							<th>Descripción</th>
							<th>Talla</th>
							<th style="width: 150px">Costo tacna</th>
							<th style="width: 150px">Costo arica</th>
							<th style="width: 150px">Sub total</th>
						</tr>
					</thead>
					<tbody>
						${table_body}
					</tbody>
					<tfoot>
						<tr>
							<td colspan="6">Total</td>
							<td>S/ ${rounded(cotizacion.total)}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>

		<div id="pageFooter">
			<div class="container">
				<div class="item">
					<p>Página {{page}} de {{pages}}</p>
				</div>
			</div>
		</div>
	</body>
</html>
`
	return html;
}