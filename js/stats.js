import { sectionChart } from './section_chart.js';
import { keywordsChart } from './keywords_chart.js';
import { publishedArticlesChart } from './published_articles_chart.js';

document.addEventListener('DOMContentLoaded', function() {
  let containers = [
    document.getElementById('container-myChart'),
    document.getElementById('container-keywordsChart'),
    document.getElementById('container-publishedArticlesCharts')
  ];

  let currentContainerIndex = 0;

  // Function to show the container at the specified index and hide others
  function showContainer(index) {
    containers.forEach((container, i) => {
      container.style.display = i === index ? 'block' : 'none';
    });
  }

  // Function to handle "Back" button click
  function handlePrevButtonClick() {
    currentContainerIndex = (currentContainerIndex - 1 + containers.length) % containers.length;
    showContainer(currentContainerIndex);
  }

  // Function to handle "Next" button click
  function handleNextButtonClick() {
    currentContainerIndex = (currentContainerIndex + 1) % containers.length;
    showContainer(currentContainerIndex);
  }

  // Call chart functions
  sectionChart();
  keywordsChart();
  publishedArticlesChart();

  // Add event listeners to "Back" and "Next" buttons
  document.getElementById('btnPrevChart').addEventListener('click', handlePrevButtonClick);
  document.getElementById('btnNextChart').addEventListener('click', handleNextButtonClick);

  let element = document.querySelector('.text-content');

  // Function to detect scroll position and change the chart dynamically
  function changeChart() {
    let y = element.scrollTop;

    if (y < 200) {
      showContainer(0);
    } else if (y > 200 && y < 1000) {
      showContainer(1);
    } else if (y > 1000) {
      showContainer(2);
    }
  }

  // Add an event listener for scroll event
  element.addEventListener('scroll', changeChart);

  anime({
    targets: '#path01, #path02, #path03',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 6000,
    delay: function(el, i) { return i * 250 },
    direction: 'normal',
    loop: false,
  });

  // Handle Start Screen Animation
  let startscreen = document.querySelector('#container-startscreen');

  let animation = anime({
    targets: startscreen,
    translateY: -2000,
    duration: 8000,
    autoplay: false,
    complete: function() {
      startscreen.style.display = 'none';
    },
  });

  document.querySelector('#enter-startscreen').onclick = animation.play;
});
