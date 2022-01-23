var pdf = require('html-pdf')

export class Reporte {
    options = {
        format: 'Letter',
        header: { height: '2.5cm' },
        footer: {
            height: '2.5cm', contents: `<div
        id="pageFooter"
        style="color: #505050; border-top: 2px solid #737373; padding: 5px"
    >
        <div
            class="container"
            style="
                display: flex;
                flex-direction: row;
                justify-content: center;
            "
        >
            <div class="item">
                <p>Página {{page}} de {{pages}}</p>
            </div>
        </div>
    </div>` },
        border: {
            top: '0',
            bottom: '0',
            right: '2.5cm',
            left: '2.5cm',
        },
        directory: './/report//',
        base: './/report//',
        orientation: 'portrait'
    }
    rows = []

    setHeader({ nombre, fecha_creada, soles, dolares, pesos }) {
        let header = `		<div
        id="pageHeader"
        style="
            color: #303030;
            border-bottom: 2px solid #737373;
            padding: 5px;
        "
    >
        <div
            class="container"
            style="
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            "
        >
            <div class="item">
                <h3>Datos del cliente:</h3>
                <div class="item__cliente">
                    <p>Nombre: <span>${nombre}</span></p>
                    <p>Fecha: <span>${fecha_creada}</span></p>
                </div>
            </div>
            <div class="item">
                <h3>Tasas de cambio:</h3>
                <div class="item__tasas">
                    <p>Soles: S/ <span>${soles}</span></p>
                    <p>Dolares: $ <span>${dolares}</span> USD</p>
                    <p>Pesos: $ <span>${pesos}</span></p>
                </div>
            </div>
        </div>
    </div>`
        this.options.header = { height: '2.5cm', contents: header }
        console.log('Header setted...')
    }

    addRow({ id_producto, cantidad, descripcion, talla, costo_t, costo_a, subtotal }) {
        let row = `						<tr>
        <td>${id_producto}</td>
        <td>${cantidad}</td>
        <td style="width: 300px">${descripcion}</td>
        <td>${talla}</td>
        <td>${costo_t}</td>
        <td>${costo_a}</td>
        <td>${subtotal}</td>
    </tr>`
        this.rows.push(row)
        console.log('Row setted')
    }

    generatePDF() {
        let url = ''
        let html = `		<div class="container" style="margin-top: 300px;">
        <style>
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
        <div class="item">
            <h2>Productos</h2>
        </div>
        <div class="item">
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
                <tbody>`
        this.rows.forEach(row => {
            html += row
        });
        html += `					</tbody>
        <tfoot>
            <tr>
                <td colspan="6">Total</td>
                <td>000.00</td>
            </tr>
        </tfoot>
    </table>
</div>
</div>`

        console.log('HTML code ready...')

        let pdfFile = pdf.create(html, this.options)
        pdfFile.toFile('./src/report/reporte.pdf', (err, res) => {
            if (err) console.log(err)
            else {
                url = res.filename
                console.log(url)
            }
        })
        return html
    }
}