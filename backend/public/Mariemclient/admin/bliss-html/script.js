const chart1Canvas = document.getElementById('chart1-canvas');
const chart2Canvas = document.getElementById('chart2-canvas');

const chart1Data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
    datasets: [{
        label: 'Ventes',
        data: [120, 140, 150, 130, 160, 170, 180],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const chart2Data = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [{
        label: 'Revenu',
        data: [10000, 12000, 14000, 16000, 18000, 20000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

new Chart(chart1Canvas, {
    type: 'line',
    data: chart1Data,
    options: {}
});

new Chart(chart2Canvas, {
    type: 'bar',
    data: chart2Data,
})