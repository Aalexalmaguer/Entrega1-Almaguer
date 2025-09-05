// =========================
// Simulador: Conversor de Divisas con Comisión
// Entrega 1 - Consola + Prompts
// =========================

// Array para guardar transacciones
const operaciones = [];

// 1) ENTRADA: pide datos de una operación y devuelve un objeto
function pedirOperacion() {
  // prompt devuelve strings; convertimos a número con Number()
    const monto = Number(prompt("Ingresa el monto a convertir:"));
    const monedaOrigen = prompt("Moneda ORIGEN (ej: MXN):").toUpperCase();
    const monedaDestino = prompt("Moneda DESTINO (ej: USD):").toUpperCase();
    const tipoCambio = Number(prompt(`Tipo de cambio (1 ${monedaOrigen} = ? ${monedaDestino}):`));
    const comisionPct = Number(prompt("Comisión (%) a aplicar sobre el monto convertido:"));

  // Validaciones simples
    if (isNaN(monto) || isNaN(tipoCambio) || isNaN(comisionPct) || monto <= 0 || tipoCambio <= 0) {
        alert("Datos inválidos. Intenta de nuevo.");
    return null; // señal de entrada inválida
    }

    return { monto, monedaOrigen, monedaDestino, tipoCambio, comisionPct };
}

// 2) PROCESO: calcula neto convertido y subtotal de comisión
function procesarOperacion(op) {
  // Convertir y aplicar comisión
    const convertidoBruto = op.monto * op.tipoCambio;
    const comision = (convertidoBruto * op.comisionPct) / 100;
    const convertidoNeto = convertidoBruto - comision;

  // Agregar datos calculados al objeto
    op.convertidoBruto = convertidoBruto;
    op.comision = comision;
    op.convertidoNeto = convertidoNeto;

  // Guardar en el array
    operaciones.push(op);
}

// 3) SALIDA: muestra resumen en consola y alerta
function mostrarResumen() {
    console.clear();
    console.log("=== RESUMEN DE OPERACIONES ===");
    if (operaciones.length === 0) {
        console.log("No hay operaciones registradas.");
    return;
    }

    let totalNeto = 0;
    for (let i = 0; i < operaciones.length; i++) {
    const op = operaciones[i];
    totalNeto += op.convertidoNeto;

    console.log(
        `#${i + 1} ${op.monto} ${op.monedaOrigen} -> ` +
        `${op.convertidoNeto.toFixed(2)} ${op.monedaDestino} ` +
        `(TC: ${op.tipoCambio}, comisión: ${op.comisionPct}% = ${op.comision.toFixed(2)} ${op.monedaDestino})`
    );
    }

    alert(`Operaciones: ${operaciones.length}\nTotal neto convertido: ${totalNeto.toFixed(2)} ${operaciones[0].monedaDestino}`);
}

// ====== FLUJO PRINCIPAL ======
// Bucle de captura: permite cargar varias operaciones
do {
  const op = pedirOperacion();       // ENTRADA
    if (op) {
    procesarOperacion(op);           // PROCESO
    }
} while (confirm("¿Deseas cargar otra operación?"));

// Mostrar resultados al final
mostrarResumen();                    // SALIDA
