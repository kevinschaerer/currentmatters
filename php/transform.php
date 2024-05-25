<?php
require_once 'extract.php';

$filteredData = [];

function filterResults($results) {
    // Initialize an empty array to store filtered items
    $filteredArticles = [];

    // Iterate through each item in the 'results' array
    foreach ($results as $item) {
        // Check if the 'item_type' is "Article"
        if ($item['item_type'] === "Article") {
            // Convert timestamp to DateTime object with GMT-4 time zone
            $dateTime = new DateTime($item['published_date'], new DateTimeZone('GMT-4'));

            // Convert the DateTime object to Central European Summer Time (CEST)
            $dateTime->setTimezone(new DateTimeZone('Europe/Paris')); // Assuming CEST is Europe/Paris

            // Convert DateTime back to string with the desired format
            $item['published_date'] = $dateTime->format('Y-m-d H:i:s');
            
            // If it is, add the item to the filteredArticles array
            $filteredArticles[] = $item;
        }
    }

    // Return the filtered array
    return $filteredArticles;
}

// Usage example:
$filteredArticles = filterResults($results);
?>
