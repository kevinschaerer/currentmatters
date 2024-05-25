export async function sectionChart() {
  const todayData = await fetchData('today');
  const yesterdayData = await fetchData('yesterday');
  const twoDaysAgoData = await fetchData('2days');
  const threeDaysAgoData = await fetchData('3days');
  const fourDaysAgoData = await fetchData('4days');
  const fiveDaysAgoData = await fetchData('5days');
  const sixDaysAgoData = await fetchData('6days');

  processData(todayData, yesterdayData, twoDaysAgoData, threeDaysAgoData, fourDaysAgoData, fiveDaysAgoData, sixDaysAgoData);
}

async function fetchData(timeframe) {
  const api = `/php/get_data.php?timeframe=${timeframe}`;
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function processData(todayData, yesterdayData, twoDaysAgoData, threeDaysAgoData, fourDaysAgoData, fiveDaysAgoData, sixDaysAgoData) {
  const combinedData = {};

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();

  // Create the labels array with "Today", "Yesterday", and the actual weekdays for the previous days
  const daysLabels = ["Today", "Yesterday"].concat(
    Array.from({ length: 5 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index - 2);
      return daysOfWeek[date.getDay()];
    })
  );

  [todayData, yesterdayData, twoDaysAgoData, threeDaysAgoData, fourDaysAgoData, fiveDaysAgoData, sixDaysAgoData].forEach((data, index) => {
    const label = daysLabels[index];
    console.log(`Data for ${label}:`, data);

    data.forEach(entry => {
      if (!combinedData[entry.section]) {
        combinedData[entry.section] = { section: entry.section, data: [0, 0, 0, 0, 0, 0, 0] };
      }
      combinedData[entry.section].data[index] += 1;
    });
  });

  const sortedSections = Object.values(combinedData).sort((a, b) => {
    const totalCountA = a.data.reduce((acc, count) => acc + count, 0);
    const totalCountB = b.data.reduce((acc, count) => acc + count, 0);
    return totalCountB - totalCountA;
  });

  const topSections = sortedSections.slice(0, 16);

  const ctx = document.getElementById('myChart');

  let chartConfig = {
    type: 'radar',
    data: {
      labels: [],
      datasets: daysLabels.map((label, index) => ({
        label: label,
        data: [],
        borderWidth: 2
      }))
    },
    options: {
      animation: {
        duration: 0
    },
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            padding: 35,
            boxWidth: 12,
          }
        },
      },
      scales: {
        r: {
          pointLabels: {
            display: true,
          },
          ticks: {
            display: true,
            color: '#DEDEDE',
            backdropColor: '#0F0F0F'
          },
          grid: {
            color: '#252525',
          },
          angleLines: {
            color: '#252525',
          }
        }
      }
    }
  };

  const myChart = new Chart(ctx, chartConfig);

  const updateChartOptions = () => {
    let sections = topSections;
    if (window.innerWidth <= 596) {
      sections = topSections.slice(0, 8);
      myChart.options.plugins.legend.display = false;
      myChart.options.scales.r.pointLabels.display = false;
    } else {
      myChart.options.plugins.legend.display = true;
      myChart.options.scales.r.pointLabels.display = true;
    }

    myChart.data.labels = sections.map(entry => entry.section);
    daysLabels.forEach((label, index) => {
      myChart.data.datasets[index].data = sections.map(entry => entry.data[index]);
    });

    myChart.update();
  };

  window.addEventListener('resize', updateChartOptions);
  updateChartOptions();

  const topSection = sortedSections[0];
  const articleCount = topSection.data.reduce((acc, count) => acc + count, 0);

  document.getElementById('mostPopularSection').innerText = topSection.section;
  document.getElementById('articleCount').innerText = articleCount;
}
