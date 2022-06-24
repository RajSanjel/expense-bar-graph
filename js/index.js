file = './api/data.json'
const chart = document.querySelector('.graph')
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
const currentDay = new Date().getDay()

function createChart() {
    getData(file)
    async function getData(file) {
        const rawData = await fetch(file)
        const JSONdata = await rawData.json()
        for (let i = 0; i < JSONdata.length; i++) {
            const chartData = JSONdata[i];
            // create chart-wrapper
            const chartWrapDiv = document.createElement('div')
            chartWrapDiv.style = `display:grid; justify-items:center; color:var(--medium-brown);`
            chart.appendChild(chartWrapDiv)
            chartWrapDiv.classList.add("chart-wrapper")
            //create actual chart 
            const displayAmount = document.createElement('div')
            displayAmount.classList.add("tooltip")


            chartWrapDiv.append(displayAmount)
            const chartDiv = document.createElement('div');
            const day = document.createElement('p');
            day.innerText = chartData.day;
            day.style = `margin-bottom:10px;`
            chartWrapDiv.appendChild(chartDiv)
            chartWrapDiv.appendChild(day)
            chartDiv.classList.add('chart')
            const realAmount = chartData.amount + 5
            barHeight = (realAmount / 7).toFixed(9)
            if (days[currentDay] === day.innerText) {
                chartDiv.style = `height:${ barHeight }em;background-color:var(--cyan);`
            } else {
                chartDiv.style = `height:${ barHeight }em;background-color:var(--soft-red);`
            }
            chartDiv.addEventListener('mouseover', () => {
                displayAmount.innerHTML = "&#36;" + chartData.amount
                displayAmount.style = `margin-bottom: 10px;padding: 5px 5px;border-radius: 1vmax;font-size: 18px;background-color: var(--dark-brown); color:white; font-weight:700;`
            })
            chartDiv.addEventListener('mouseout', () => {
                displayAmount.style = `display:none;`
            })
        }
    }
}
createChart()