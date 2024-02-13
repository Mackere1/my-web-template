<?php
// Assuming your database credentials
$servername = "localhost";
$username = "root";
$password = "Meen2006@root"; // Assuming no password set for root
$database = "use";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve username and password from the form
$name = $_POST['Name'];
$id = $_POST['ID'];

// Prepare SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM your_table_name WHERE name = ? AND id = ?");
$stmt->bind_param("si", $name, $id);
$stmt->execute();
$result = $stmt->get_result();

// Check if a row with matching username and password exists
if ($result->num_rows == 1) {
    // Authentication successful
    echo "Authentication successful!";
    // You can redirect the user to another page or perform additional actions here
} else {
    // Authentication failed
    echo "Invalid username or password";
}

// Close connection
$conn->close();

