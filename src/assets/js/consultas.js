export async function getPaises() {
    const consulta = await fetch('https://restcountries.com/v3.1/all?fields=translations');
    const resultado = await consulta.json();

    const paises = resultado.map(pais => pais.translations.spa.common).sort((a, b) => a.localeCompare(b, 'es'));

    return paises;
}

export async function getMarcas() {
    const consulta = await fetch('http://localhost:3000/marcas');
    const resultado = await consulta.json();
    
    return resultado;
}

export async function getModelos() {
    const consulta = await fetch('http://localhost:3000/modelos');
    const resultado = await consulta.json();
    
    return resultado;
}

export async function getVehiculos() {
    const consulta = await fetch('http://localhost:3000/vehiculos');
    const resultado = await consulta.json();
    
    return resultado;
}

export async function getClientes() {
    const consulta = await fetch('http://localhost:3000/clientes');
    const resultado = await consulta.json();
    
    return resultado;
}

export async function guardarNuevaMarca(nuevaMarca) {
    await fetch('http://localhost:3000/marcas', {method: 'POST', body: JSON.stringify(nuevaMarca)});
}

export async function guardarNuevoModelo(nuevoModelo) {
    await fetch('http://localhost:3000/modelos', {method: 'POST', body: JSON.stringify(nuevoModelo)});
}

export async function obtenerMarcasPorPrecioMedio() {
    
    const marcas = await getMarcas();
    const modelos = await getModelos();
    const vehiculos = await getVehiculos();

    const marcasConPrecio = marcas.map(marca =>({
        ...marca,
        precioMedio: precioMedioMarca(modelos, vehiculos, marca.id)
    }));
    
    const marcasConPrecioOrdenadas = marcasConPrecio.sort(
        (a, b) => a.precioMedio - b.precioMedio
    );

    return marcasConPrecioOrdenadas;
}

function precioMedioMarca(modelos, vehiculos, idMarca) {
    
    const modelosFiltrados = modelos.filter(mod => mod.idMarca == idMarca);
    const vehiculosFiltrados = vehiculos.filter(vehi => modelosFiltrados.some(mod => vehi.idModelo == mod.id));

    const sumaPrecios = vehiculosFiltrados.reduce((acumulado, vehi) => acumulado + vehi.precioDia, 0);
    
    if (vehiculosFiltrados.length === 0) return 0;

    const result = sumaPrecios/modelosFiltrados.length;
    return result;
    
    
}

export async function obtenerModeloConPrecio() {
    const modelos = await getModelos();
    const vehiculos = await getVehiculos();
    const modelosConPrecio = modelos.map(mod => ({
        ...mod,
        precioDia:obtenerDatConcretoVehiculo('precioDia', mod.id, vehiculos),
        pruertas:obtenerDatConcretoVehiculo('puertas', mod.id, vehiculos),
        sillaInfantil:obtenerDatConcretoVehiculo('sillaInfantil', mod.id, vehiculos),
    }));
    
    return modelosConPrecio;
}

function obtenerDatConcretoVehiculo(elemento, idModelo, listaVehiculos){
    let dato = null;
    
    if(elemento === 'precioDia'){
        dato = listaVehiculos.find(vehi => vehi.idModelo == idModelo);
        
        return dato.precioDia;
    }else if (elemento === 'puertas'){
        dato = listaVehiculos.find(vehi => vehi.idModelo == idModelo);
        return dato.puertas;
    }else if (elemento === 'sillaInfantil'){
        dato = listaVehiculos.find(vehi => vehi.idModelo == idModelo);
        return dato.sillaInfantil;
    }
}

export async function modelosConPrecioMedio(idMarca) {
    const modelos = await getModelos();
    const vehiculos = await getVehiculos();
    const modelosFiltrados = modelos.filter(mod => mod.idMarca == idMarca);
    const modelosConMedia = modelosFiltrados.map(mod => ({
        id:mod.id,
        modelo:mod.modelo,
        precioMedioDia:calcularMediaPrecioPorDiaModelo(vehiculos, mod.id),
        extraPorModelo:mod.extraPorModelo
    }))
    console.log(modelosConMedia);
    
    return modelosConMedia;
}

function calcularMediaPrecioPorDiaModelo(vehiculos, idModelo) {
    const vehiculosFiltrados = vehiculos.filter(vehi => vehi.idModelo === idModelo);
    const sumaPrecios = vehiculosFiltrados.reduce((acumulado, vehi) => acumulado + vehi.precioDia, 0);
    
    return sumaPrecios/vehiculosFiltrados.length;
}

export async function guardarNuevoExtra(idModelo, precioExtraNuevo) {
    const consultaModelo = await fetch(`http://localhost:3000/modelos/${idModelo}`);
    const modeloActual = await consultaModelo.json();

    const modeloActualizado = {
        id: modeloActual.id,
        idMarca: modeloActual.idMarca,
        modelo: modeloActual.modelo,
        extraPorModelo: precioExtraNuevo
    };
    const consulta = await fetch(`http://localhost:3000/modelos/${idModelo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeloActualizado)
    });

    return await consulta.json();
}