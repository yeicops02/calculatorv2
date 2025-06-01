function RealizarOperaciones(operador, n1, n2) {
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    switch (operador) {
        case '+': return n1 + n2;
        case '–': return n1 - n2;
        case '×': return n1 * n2;
        case '÷':
            if (n2 === 0) return 'Error';
            return n1 / n2;
        default: return 0;
    }
}

const pantallaOperacion = document.querySelector('.operacion_parrafo');
const botones = document.querySelectorAll('.botones button');

let operador = '';
let numero1 = '';
let numero2 = '';
let esperandoSegundoNumero = false;

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (boton.id === 'c') {
            pantallaOperacion.textContent = '0';
            numero1 = '';
            numero2 = '';
            operador = '';
            esperandoSegundoNumero = false;
            return;
        }

        if (boton.classList.contains('numero') || valor === '.') {
            if (!esperandoSegundoNumero) {
                numero1 += valor;
                pantallaOperacion.textContent = numero1;
            } else {
                numero2 += valor;
                pantallaOperacion.textContent = numero2;
            }
            return;
        }

        if (boton.classList.contains('operador')) {
            if (numero1 === '') return; // No hagas nada si aún no hay primer número
            operador = valor;
            esperandoSegundoNumero = true;
            return;
        }

        if (boton.id === 'igual') {
            if (numero1 !== '' && operador !== '' && numero2 !== '') {
                const resultado = RealizarOperaciones(operador, numero1, numero2);
                pantallaOperacion.textContent = resultado;
                // Reinicia para una nueva operación
                numero1 = resultado.toString();
                numero2 = '';
                operador = '';
                esperandoSegundoNumero = false;
            }
            return;
        }
    });
});

