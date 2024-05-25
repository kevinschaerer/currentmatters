<?php

// Initialize cURL session
$ch = curl_init();

// Set the URL of the API endpoint
$url = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=uTSGAepFCHiAVHmwNkmSNfc2IfIAE84V";



// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url); //Set URL to fetch
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string

// Execute cURL request and get the response
$response = curl_exec($ch); // Execute cURL session, fetch the JSON respone

// Check for errors
if(curl_errno($ch)){
    // If there is an error, handle it here
    echo 'Error: ' . curl_error($ch);
}

// Close cURL session
curl_close($ch);

// Decode JSON response
$metadata = json_decode($response, true);

// Accessing the 'results' array
$results = $metadata['results'];
extractData($results);

function extractData(&$data) {
    foreach ($data as &$item) {
        $multimediaUrl = isset($item['multimedia'][2]['url']) ? $item['multimedia'][2]['url'] : null;

        $item = [
            'section' => $item['section'],
            'title' => $item['title'],
            'abstract' => $item['abstract'],
            'url' => $item['url'],
            'byline' => $item['byline'],
            'item_type' => $item['item_type'],
            'published_date' => $item['published_date'],
            'multimedia' => $multimediaUrl,
            'des_facet' => $item['des_facet'],
            'per_facet' => $item['per_facet'],
        ];
    }
}

?>