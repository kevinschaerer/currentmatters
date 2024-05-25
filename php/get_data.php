<?php

// Include database configuration and connect to the database
require_once '../config/config.php';

// Connect to the database
try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Initialize SQL query
$sql = "SELECT * FROM articles_2024";

// Check if timeframe parameter is provided
if (isset($_GET['timeframe'])) {
    $timeframe = $_GET['timeframe']; 

    // Filter data based on selected timeframe
 // Filter data based on selected timeframe
switch ($timeframe) {
    case 'today':
        $sql .= " WHERE DATE(published_date) = CURDATE()";
        break;
    case 'yesterday':
        $sql .= " WHERE DATE(published_date) = CURDATE() - INTERVAL 1 DAY";
        break;
    case '2days':
        $sql .= " WHERE DATE(published_date) = CURDATE() - INTERVAL 2 DAY";
        break;
    case '3days':
        $sql .= " WHERE DATE(published_date) = CURDATE() - INTERVAL 3 DAY";
        break;
    case '4days':
        $sql .= " WHERE DATE(published_date) = CURDATE() - INTERVAL 4 DAY";
        break;
    case '5days':
        $sql .= " WHERE DATE(published_date) = CURDATE() - INTERVAL 5 DAY";
        break;
    case '6days':
        $sql .= " WHERE DATE(published_date) = CURDATE() - INTERVAL 6 DAY";
        break;
}
}

// Check if period parameter is provided
if (isset($_GET['period'])) {
    $period = $_GET['period']; 
    
    // Add WHERE clause if not already present
    if (strpos($sql, 'WHERE') === false) {
        $sql .= " WHERE ";
    } else {
        $sql .= " AND ";
    }

    // Filter data based on selected period
    switch ($period) {
        case '24h':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 1 DAY";
            break;
        case '48h':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 2 DAY";
            break;
        case '7d':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 7 DAY";
            break;
        case '14d':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 14 DAY";
            break;
        case '1m':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 1 MONTH";
            break;
        case '2m':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 2 MONTH";
            break;
        case '6m':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 6 MONTH";
            break;
        case '1y':
            $sql .= " DATE(published_date) >= CURDATE() - INTERVAL 1 YEAR";
            break;
    }
}

// Query to fetch data from the database
$stmt = $pdo->query($sql);

// Fetch data as associative array
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
