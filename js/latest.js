// Define Global Variables
let cards = '';
let multimedia;
let uniqueArticles = new Set();

const apiUrl = '/php/get_data.php';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(metadata => {
        // Process the retrieved data
        console.log('New York Times:', metadata);

        // Sort articles by date
        metadata.sort((a, b) => {
            return new Date(b.published_date) - new Date(a.published_date);
        });

        metadata.slice(0, 24).forEach(article => {

            // Check if the title or abstract already exists
            let uniqueIdentifier = article.title + article.abstract; 
            if (uniqueArticles.has(uniqueIdentifier)) {
                return; 
            } else {
                uniqueArticles.add(uniqueIdentifier);
            }

            // Check if multimedia content is available in metadata
            if (!article.multimedia) {
                multimedia = '/images/default-image.png';
            } else {
                multimedia = article.multimedia;
            }

            // Check if abstract is available in metadata and set default length
            if (article.abstract.length === 0) {
                article.abstract = 'No abstract available.';
            } else if (article.abstract.length > 180) {
                let lastSpaceIndex = article.abstract.lastIndexOf(' ', 180);
                article.abstract = article.abstract.substring(0, lastSpaceIndex) + '...';
            }

            // HTML template for cards
            cards += `
                <div class="card">
                    <div>
                    <img class="article-image" src="${multimedia}" alt="${article.title}">
                    <h3 class='card-title'>${article.title}</h3>
                    <p class='card-abstract'>${article.abstract}</p>
                    </div>
                    <div class="container-infos">
                    <a href="${article.url}" target="_blank"><button class='btn-link'>Read <img src='./images/arrow-up-right.svg'></button></a>
                    <div class="container-time">
                    <div class="live-circle"></div>
                    <p>${moment(article.published_date).fromNow()}</p>
                    </div>
                    </div>
                </div>
            `; 
        });

        let containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = cards;

    })
    .catch(error => {
        console.error('Error:', error);
    });

// Track if user visited site
if (window.location.href === 'https://616867-9.web.fhgr.ch/latest.html') {
    sessionStorage.setItem('visited', 'true');
}
console.log('visited:', sessionStorage.getItem('visited'));
