// Esperar a que el DOM esté listo antes de tocar elementos
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo: inicializando simulador...");

  const operaciones = [];

  function pedirOperacion() {
    const monto = Number(prompt("Ingresa el monto a convertir:"));
    const monedaOrigen = prompt("Moneda ORIGEN (ej: MXN):")?.toUpperCase();
    const monedaDestino = prompt("Moneda DESTINO (ej: USD):")?.toUpperCase();
    const tipoCambio = Number(prompt(`Tipo de cambio (1 ${monedaOrigen} = ? ${monedaDestino}):`));
    const comisionPct = Number(prompt("Comisión (%) a aplicar sobre el monto convertido:"));

    if (isNaN(monto) || isNaN(tipoCambio) || isNaN(comisionPct) || monto <= 0 || tipoCambio <= 0) {
      alert("Datos inválidos. Intenta de nuevo.");
      return null;
    }
    return { monto, monedaOrigen, monedaDestino, tipoCambio, comisionPct };
  }

  function procesarOperacion(op) {
    const convertidoBruto = op.monto * op.tipoCambio;
    const comision = (convertidoBruto * op.comisionPct) / 100;
    const convertidoNeto = convertidoBruto - comision;

    op.convertidoBruto = convertidoBruto;
    op.comision = comision;
    op.convertidoNeto = convertidoNeto;

    operaciones.push(op);
  }

  function mostrarResumenConsola() {
    console.clear();
    console.log("=== RESUMEN DE OPERACIONES ===");
    if (!operaciones.length) {
      console.log("No hay operaciones registradas.");
      return;
    }
    let totalNeto = 0;
    for (let i = 0; i < operaciones.length; i++) {
      const op = operaciones[i];
      totalNeto += op.convertidoNeto;
      console.log(
        `#${i + 1} ${op.monto} ${op.monedaOrigen} -> ${op.convertidoNeto.toFixed(2)} ${op.monedaDestino} ` +
        `(TC: ${op.tipoCambio}, comisión: ${op.comisionPct}% = ${op.comision.toFixed(2)} ${op.monedaDestino})`
      );
    }
    alert(`Operaciones: ${operaciones.length}\nTotal neto convertido: ${totalNeto.toFixed(2)} ${operaciones[0].monedaDestino}`);
  }

  function mostrarResumenDOM() {
    const $tbody = document.getElementById("tbodyOperaciones");
    const $resumen = document.getElementById("resumen");
    $tbody.innerHTML = "";

    if (!operaciones.length) {
      $resumen.textContent = "Sin operaciones cargadas.";
      return;
    }

    let totalNeto = 0;
    operaciones.forEach((op, i) => {
      totalNeto += op.convertidoNeto;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${op.monto}</td>
        <td>${op.monedaOrigen}</td>
        <td>${op.monedaDestino}</td>
        <td>${op.tipoCambio}</td>
        <td>${op.comision.toFixed(2)}</td>
        <td>${op.convertidoNeto.toFixed(2)}</td>
      `;
      $tbody.appendChild(tr);
    });

    $resumen.textContent =
      `Operaciones: ${operaciones.length} | Total Neto: ${totalNeto.toFixed(2)} ${operaciones[0].monedaDestino}`;
  }

  // Adjuntar listener con verificación del botón
  const btn = document.getElementById("btnIniciar");
  if (!btn) {
    console.error('No se encontró #btnIniciar. Revisa el id en el HTML.');
    return;
  }

  btn.addEventListener("click", () => {
    do {
      const op = pedirOperacion();
      if (op) procesarOperacion(op);
    } while (confirm("¿Deseas cargar otra operación?"));

    mostrarResumenConsola();
    mostrarResumenDOM();
  });
});
