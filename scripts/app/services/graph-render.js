import { CASOS_LABEL, DECESOS_LABEL, RECUPERADOS_LABEL } from '../global.js';
import { Country } from '../domain/country.js';
import { getDOMChart } from '../services/dom-loader.js';
export function renderGraph(dataCasos, dataDecesos, dataRecuperados) {
    const cCountry = Country.getInstance();
    const ChartHtml = getDOMChart();
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
                name: CASOS_LABEL,
                data: dataCasos,
            },
            {
                name: DECESOS_LABEL,
                data: dataDecesos,
            },
            {
                name: RECUPERADOS_LABEL,
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
            text: `Covid-19 ${cCountry.name}, 2020`,
            floating: true,
            offsetY: 10,
            align: "center",
            style: {
                color: "#000000",
            },
        },
    };
    const chart = new ApexCharts(ChartHtml, options);
    chart.render();
}
