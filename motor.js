
const montosMinimosMasculino = {
  A: { 26: 100, 27: 400, 28: 900, 29: 100, 30: 600 },
  B: { 26: 1000, 27: 600, 28: 1000, 29: 1000, 30: 1000 },
  C: { 26: 400, 27: 200, 28: 200, 29: 1000, 30: 600 },
  D: { 26: 400, 27: 300, 28: 500, 29: 900, 30: 1000 },
};

const montosMinimosFemenino = {
  A: { 24: 800, 25: 800, 26: 800, 27: 600, 28: 200 },
  B: { 24: 800, 25: 700, 26: 100, 27: 600, 28: 700 },
  C: { 24: 200, 25: 900, 26: 700, 27: 800, 28: 100 },
  D: { 24: 500, 25: 1000, 26: 600, 27: 400, 28: 700 },
};


const montosMaximosMasculino = {
  A: { 26: 4900, 27: 4700, 28: 4600, 29: 4600, 30: 4500 },
  B: { 26: 4700, 27: 4400, 28: 5000, 29: 4400, 30: 4900 },
  C: { 26: 5000, 27: 4700, 28: 5000, 29: 4200, 30: 4600 },
  D: { 26: 4400, 27: 4700, 28: 4300, 29: 4900, 30: 4300 },
};


const montosMaximosFemeninos = {
  A: { 26: 4900, 27: 4700, 28: 4600, 29: 4600, 30: 4500 },
  B: { 26: 4700, 27: 4400, 28: 5000, 29: 4400, 30: 4900 },
  C: { 26: 5000, 27: 4700, 28: 5000, 29: 4200, 30: 4600 },
  D: { 26: 4400, 27: 4700, 28: 4300, 29: 4900, 30: 4300 },
};



document.getElementById("formulario-credito").addEventListener("submit", function (event) {
  event.preventDefault();

  const opcionesValue = document.getElementById("opciones").value;
  const generoValue = document.querySelector('input[name="genero"]:checked').value;
  let fechaValue = document.getElementById("fecha").value;
  const fechaIngreso = new Date(fechaValue);
  const mesesTranscurridos = calcularMesesHastaAhora(fechaIngreso);

  const montoCalculado = motorDeBusqueda(opcionesValue, mesesTranscurridos, generoValue);
  const minimo = document.getElementById("monto-minimo");
  minimo.innerText = `$ ${montoCalculado[0]}` ;
  const maximo = document.getElementById("monto-maximo");
  maximo.innerText = `$ ${montoCalculado[1]}` ;

  const linea = lineaCredito(montoCalculado[0], montoCalculado[1]);
  console.log(linea);
  const lineaMonto = document.getElementById("monto-linea");
  lineaMonto.innerText = linea;
  console.log(opcionesValue, generoValue, mesesTranscurridos, fechaValue);
});

function calcularMesesHastaAhora(fecha) {
  const fechaActual = new Date();
  const diferenciaEnMilisegundos = fechaActual - fecha;
  const meses = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 30);
  const mesesRedondeados = Math.floor(meses);
  return mesesRedondeados;
}

function encontrarValor(objeto, valorBuscado) {
  const entradas = Object.entries(objeto);
  for (const [clave, valor] of entradas) {
    if (clave === valorBuscado) {
      return { categoria: clave, valor: valor };
    } else if (valorBuscado < clave) {
      return { categoria: clave, valor: valor };
    } else if (valorBuscado > clave && clave === entradas[entradas.length - 1][0]) {
      return { categoria: clave, valor: valor };
    }
  }
  return null;
} 

function motorDeBusqueda(tipo, meses, genero) {
  let montosMinimos, montosMaximos;

  if (genero === 'femenino') {
    montosMinimos = montosMinimosFemenino;
    montosMaximos = montosMaximosFemeninos;
  } else {
    montosMinimos = montosMinimosMasculino;
    montosMaximos = montosMaximosMasculino;
  }

  if (montosMinimos[tipo] && montosMaximos[tipo]) {

    const montoMinimo = montosMinimos[tipo];
    const montoMaximo = montosMaximos[tipo];

    const min = encontrarValor(montosMinimos[tipo], meses)
    const max = encontrarValor(montosMaximos[tipo], meses)

    return [min?.valor, max?.valor]
  }
}


function lineaCredito(valorMin, valorMax) {

  const p1 = Math.round(valorMin + Math.sqrt(valorMax - valorMin));
  const p2 = Math.round(valorMin + 0.0175 * (valorMax - valorMin));

  return `De ${p1}$ a ${p2}$`
} 