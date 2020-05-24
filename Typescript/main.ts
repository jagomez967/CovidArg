import * as Global from './app/global.js';
import { cargarPaises, cargarFechas } from './app/shared/initializer.js';
import { cargarArrayDatos } from './app/services/data-loader.js';


function renderGrafico(pais:string, dataCasos, dataDecesos, dataRecuperados,ChartHtml: Element) {  
  ChartHtml.innerHTML = "";

  var options = {
    colors: ["#FC5D19", "#FF0000", "#00DD00"],
    xaxis: {
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: Global.CASOS_LABEL,
        data: dataCasos,
      },
      {
        name: Global.DECESOS_LABEL,
        data: dataDecesos,
      },
      {
        name: Global.RECUPERADOS_LABEL,
        data: dataRecuperados,
      },
    ],
    chart: {
      height: 400,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -10,
      style: {
        fontSize: "12px",
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    title: {
      text: `Covid-19 ${pais}, 2020`,
      floating: true,
      offsetY: 10,
      align: "center",
      style: {
        color: "#000000",
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

async function cargarGrafico(pais: string, nombrePais: string, fechaDesdeRaw: string, fechaHastaRaw: string, isCached = false): Promise<void> {

  let fechaDesde = new Date(fechaDesdeRaw).toISOString();
  let fechaHasta = new Date(fechaHastaRaw).toISOString();

  let dataCasos = await cargarArrayDatos(
    pais,
    "confirmed",
    fechaDesde,
    fechaHasta,
    isCached
  );
  let dataRecuperados = await cargarArrayDatos(
    pais,
    "recovered",
    fechaDesde,
    fechaHasta,
    isCached
  );
  let dataDecesos = await cargarArrayDatos(
    pais,
    "deaths",
    fechaDesde,
    fechaHasta,
    isCached
  );

  let ChartHtml:Element = document.querySelector("#chart");
  renderGrafico(nombrePais, dataCasos, dataDecesos, dataRecuperados,ChartHtml);
}

window.onload = function () {
  let pais = Global.PAIS_DEFAULT;
  let nombrePais = Global.PAIS_DEFAULT;
  const paisSelector = <HTMLSelectElement>document.getElementById("paises");
  const fechaDesdeInput =<HTMLInputElement>document.getElementById("fechadesde");
  const fechaHastaInput =<HTMLInputElement>document.getElementById("fechahasta");

  cargarPaises(paisSelector, pais);
  cargarFechas(fechaDesdeInput, fechaHastaInput);
  cargarGrafico(pais, nombrePais, fechaDesdeInput.value, fechaHastaInput.value);

  //EventListeners
  paisSelector.addEventListener("change", function () {
    let indicePais = paisSelector.selectedIndex;
    if (indicePais >= 0) {
      pais = paisSelector.options[indicePais].value;
      nombrePais = paisSelector.options[indicePais].text;
    }
    cargarGrafico(pais, nombrePais, fechaDesdeInput.value, fechaHastaInput.value);
  });

  let oldDateDesde:string = fechaDesdeInput.value;
  let isChangedDesde = function () {
    if (fechaDesdeInput.value !== oldDateDesde) {
      oldDateDesde = fechaDesdeInput.value;
      fechaHastaInput.min = fechaDesdeInput.value;
      return true;
    }
    return false;
  };
  fechaDesdeInput.addEventListener("change", function () {
    if (isChangedDesde()) {
      if (new Date(this.value) > new Date(fechaHastaInput.value)) {
        this.value = oldDateDesde;
        this.innerText = oldDateDesde;
      } else {
        cargarGrafico(pais, nombrePais, fechaDesdeInput.value, fechaHastaInput.value, true);
      }
    }
  });

  let olddateHasta:string  = fechaHastaInput.value;
  let isChangedHasta = function () {
    if (fechaHastaInput.value !== olddateHasta) {
      olddateHasta = fechaHastaInput.value;
      fechaDesdeInput.max = fechaHastaInput.value;
      return true;
    }
    return false;
  };
  fechaHastaInput.addEventListener("change", function () {
    if (isChangedHasta()) {
      if (new Date(this.value) < new Date(fechaDesdeInput.value)) {
        this.value = olddateHasta;
        this.innerText = olddateHasta;
      } else {
        cargarGrafico(pais, nombrePais, fechaDesdeInput.value, fechaHastaInput.value, true);
      }
    }
  });
};