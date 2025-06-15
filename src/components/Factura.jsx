import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
const Factura = () => {
    const location = useLocation();
    const { nombre, email, items, total } = location.state || {
        nombre: "Invitado",
        email: "invitado@example.com",
        items: [],
        total: 0,
    };
    const descargarFactura = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Factura', 10, 10);
        doc.setFontSize(12);
        doc.text(`Nombre: ${nombre}`, 10, 20);
        doc.text(`Correo: ${email}`, 10, 30);
        doc.text('Productos:', 10, 40);
        let y = 50;
        items.forEach(item => {
            doc.text(`${item.name} - $${item.price.toFixed(2)}`, 10, y);
            y += 10;
        });
        doc.text(`Total: $${total.toFixed(2)}`, 10, y);
        doc.save('factura.pdf');
    };
    const descargarImagen = async (url, nombreArchivo) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = urlBlob;
            link.download = nombreArchivo;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.error("Error descargando la imagen:", error);
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="text-center">Factura</h2>
            <div className="mb-4">
                <h5>Detalles del Cliente</h5>
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {email}</p>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Precio</th>
                        <th>Descargar Imagen</th> 
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <button className="btn btn-success"
                                    onClick={() => descargarImagen(`https://api-fotos-juli.onrender.com/api/fotos/${item.id}/img`)} 
                                >
                                    Descargar
                                </button>        
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4 className="text-right">Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-primary mt-3" onClick={descargarFactura}>
                Descargar Factura en PDF
            </button>
        </div>
    );
};
export default Factura;