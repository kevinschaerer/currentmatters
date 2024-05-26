export async function keywordsChart() {
    const days = ['today', 'yesterday', '2days', '3days', '4days', '5days', '6days']; // Timeframes to match your PHP code
  
    const fetchDataPromises = days.map(day => fetchData(day));
    const data = await Promise.all(fetchDataPromises);
  
    processData(data);
  }
  
  async function fetchData(period) {
    const api = `/php/get_data.php?timeframe=${period}`;
    const response = await fetch(api);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  }
  
  function getWeekdayLabel(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  }
  
  function capitalizeWords(str) {
    const exclusions = ['of', 'and'];
    return str.split(' ').map(word => {
        if (exclusions.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
  
  function getVisibleSections() {
    return window.innerWidth <= 1024 ? 8 : 16;
  }
  
  function processData(dataArray) {
    const combinedData = {};
    const labels = ['Today', 'Yesterday'];
  
    for (let i = 2; i <= 6; i++) {
        labels.push(getWeekdayLabel(i));
    }
  
    dataArray.forEach((data, index) => {
        const label = labels[index];
        // console.log(`Data for ${label}:`, data);
  
        data.forEach(entry => {
            const words = entry.des_facet.match(/\b\w+(?:\s+\w+)*\b/g);
  
            if (words) {
                words.forEach(word => {
                    const wordLower = word.toLowerCase();
                    
                    // Filter out numbers and specific terms
                    if (!isNaN(wordLower) || wordLower.includes('content type') || wordLower.includes('internal') || wordLower.includes('your') || wordLower.includes('feed')) {
                        return;
                    }
  
                    if (!combinedData[wordLower]) {
                        combinedData[wordLower] = { section: wordLower, data: [0, 0, 0, 0, 0, 0, 0] };
                    }
                    combinedData[wordLower].data[index] += 1;
                });
            }
        });
    });
  
    function updateChart() {
      const visibleSections = getVisibleSections();
      const sortedSections = Object.values(combinedData).sort((a, b) => {
          const totalCountA = a.data.reduce((acc, count) => acc + count, 0);
          const totalCountB = b.data.reduce((acc, count) => acc + count, 0);
          return totalCountB - totalCountA;
      });
  
      const topSections = sortedSections.slice(0, visibleSections);
      topSections.sort((a, b) => a.section.localeCompare(b.section));
  
      const sections = topSections.map(entry => capitalizeWords(entry.section));
      const sectionCounts = topSections.map(entry => entry.data);
  
    //   console.log('sections', sections);
  
      chart.data.labels = labels;
      chart.data.datasets = sections.map((section, index) => ({
          label: section,
          data: sectionCounts[index],
          borderWidth: 1
      }));
  
      updateLegendDisplay();
      chart.update();
    }
  
    const ctx = document.getElementById('keywordsChart');
  
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, 
            datasets: []
        },
        options: {
            responsive: true,
            animation: {
                duration: 0
            },
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
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#252525',
                    }
                },
                x: {
                    grid: {
                        color: '#252525',
                    }
                },
            },
        }
    });
  
    function updateLegendDisplay() {
        if (window.innerWidth <= 1024) {
            chart.options.plugins.legend.display = false;
        } else {
            chart.options.plugins.legend.display = true;
        }
    }
  
    window.addEventListener('resize', () => {
        updateChart();
    });
  
    updateChart();
  }
  