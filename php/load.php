<?php

require_once 'transform.php';
require_once '../config/config.php';

// Connect to the database
try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}


$sql = "INSERT INTO articles_2024 (section, title, abstract, url, byline, item_type, published_date, multimedia, des_facet, per_facet) 
        VALUES (:section, :title, :abstract, :url, :byline, :item_type, :published_date, :multimedia, :des_facet, :per_facet)";

// Prepare the statement
$stmt = $pdo->prepare($sql);

// Check if the article already exists in the database based on its title
foreach ($filteredArticles as $item) {
    $existingStmt = $pdo->prepare("SELECT COUNT(*) FROM articles_2024 WHERE url = :url");
    $existingStmt->bindParam(':url', $item['url']);
    $existingStmt->execute();
    $existingCount = $existingStmt->fetchColumn();

    // If the article already exists, skip insertion
    if ($existingCount > 0) {
        echo "Article '{$item['url']}' already exists in the database. Skipping insertion.\n";
        continue;
    }

    // If the article doesn't exist, proceed with insertion
    // Serialize arrays
    $desFacetJson = json_encode($item['des_facet']);
    $perFacetJson = json_encode($item['per_facet']);

    // Bind parameters
    $stmt->bindParam(':section', $item['section']);
    $stmt->bindParam(':title', $item['title']);
    $stmt->bindParam(':abstract', $item['abstract']);
    $stmt->bindParam(':url', $item['url']);
    $stmt->bindParam(':byline', $item['byline']);
    $stmt->bindParam(':item_type', $item['item_type']);
    $stmt->bindParam(':published_date', $item['published_date']);
    $stmt->bindParam(':multimedia', $item['multimedia']);
    $stmt->bindParam(':des_facet', $desFacetJson); // Bind JSON serialized string
    $stmt->bindParam(':per_facet', $perFacetJson); // Bind JSON serialized string

    // Execute the statement
    try {
        $stmt->execute();
        echo "Article data for '{$item['title']}' inserted successfully.\n";
    } catch (PDOException $e) {
        echo "Error inserting article data for '{$item['title']}': " . $e->getMessage() . "\n";
    }
}
