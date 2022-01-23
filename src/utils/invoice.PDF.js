/**
 * 
 * @param {Object} cotizacion 
 * @param {Array} detalle 
 * @returns 
 */
export const getHTML = (cotizacion, detalle) => {
    let table_body = ``

    detalle.forEach((item) => {
        table_body += `<tr>
        <td>${item.id_producto}</td>
        <td>${item.cantidad}</td>
        <td style="width: 300px">${item.descripcion}</td>
        <td>${item.talla}</td>
        <td>${item.costo_t}</td>
        <td>${item.costo_a}</td>
        <td>${item.subtotal}</td>
    </tr>`
    })

    const html = `<html>
	<head>
		<style>
			#pageHeader {
				color: #303030;
				border-bottom: 2px solid #737373;
				padding: 5px;
			}
			#pageFooter {
				color: #505050;
				border-top: 2px solid #737373;
				padding: 5px;
			}
			.container {
				display: flex;
				flex-direction: row;
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
			table tr td:nth-child(1) {
				background-color: #dcdcdc;
				font-weight: bold;
			}
		</style>
	</head>

	<body>
		<div id="pageHeader">
			<div class="container">
				<div class="item">
					<h3>Datos del cliente:</h3>
					<div class="item__cliente">
						<p>Nombre: <span>${cotizacion.nombre}</span></p>
						<p>Fecha: <span>${cotizacion.fecha_creada}</span></p>
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
			</div>
		</div>

		<div class="container" style="margin-top: 300px">
			<div class="item">
				<h2>Productos</h2>
				<table border="2px">
					<thead>
						<tr>
							<th>Código del producto</th>
							<th>Cantidad</th>
							<th>Descripción</th>
							<th>Talla</th>
							<th>Costo tacna</th>
							<th>Costo arica</th>
							<th>Sub total</th>
						</tr>
					</thead>
					<tbody>
						${table_body}
					</tbody>
					<tfoot>
						<tr>
							<td colspan="6">Total</td>
							<td>000.00</td>
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