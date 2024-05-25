export async function publishedArticlesChart() {
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

  const todayCount = Array.isArray(todayData) ? todayData.length : 0;
  const yesterdayCount = Array.isArray(yesterdayData) ? yesterdayData.length : 0;
  const twoDaysAgoCount = Array.isArray(twoDaysAgoData) ? twoDaysAgoData.length : 0;
  const threeDaysAgoCount = Array.isArray(threeDaysAgoData) ? threeDaysAgoData.length : 0;
  const fourDaysAgoCount = Array.isArray(fourDaysAgoData) ? fourDaysAgoData.length : 0;
  const fiveDaysAgoCount = Array.isArray(fiveDaysAgoData) ? fiveDaysAgoData.length : 0;
  const sixDaysAgoCount = Array.isArray(sixDaysAgoData) ? sixDaysAgoData.length : 0;

  const ctx = document.getElementById('publishedArticlesCharts');

  // Define the chart
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Today', 'Yesterday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday'],
          datasets: [
              {
                  label: 'Published Articles',
                  data: [todayCount, yesterdayCount, twoDaysAgoCount, threeDaysAgoCount, fourDaysAgoCount, fiveDaysAgoCount, sixDaysAgoCount],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(54, 162, 235, 1)'
                  ],
                  borderWidth: 1
              }
          ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 0
      },
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              },
          },        
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      color: '#252525',
                  }
              },
              x: {
                  grid: {
                      color: '#252525',
                  }
              },
          }
      }
  });
}
