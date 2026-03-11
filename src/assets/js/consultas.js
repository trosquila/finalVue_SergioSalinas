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

export async function guardarNuevaMarca(nuevaMarca) {
    await fetch('http://localhost:3000/marcas', {method: 'POST', body: JSON.stringify(nuevaMarca)});
}

export async function guardarNuevoModelo(nuevoModelo) {
    await fetch('http://localhost:3000/modelos', {method: 'POST', body: JSON.stringify(nuevoModelo)});
}