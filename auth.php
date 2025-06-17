<?php
session_start();

// Database configuration
$host = 'localhost';
$dbname = 'food_outlet';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Handle form submissions
if ($_POST) {
    $action = $_POST['action'];
    
    switch ($action) {
        case 'register':
            handleRegister($pdo);
            break;
        case 'login':
            handleLogin($pdo);
            break;
        case 'forgot':
            handleForgotPassword($pdo);
            break;
    }
}

function handleRegister($pdo) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    // Validation
    if (empty($name) || empty($email) || empty($phone) || empty($password)) {
        showMessage('All fields are required!', 'error');
        return;
    }
    
    if ($password !== $confirm_password) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    if (strlen($password) < 6) {
        showMessage('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        showMessage('Invalid email format!', 'error');
        return;
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        showMessage('Email already registered!', 'error');
        return;
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$name, $email, $phone, $hashed_password]);
        
        showMessage('Registration successful! You can now login.', 'success');
    } catch(PDOException $e) {
        showMessage('Registration failed. Please try again.', 'error');
    }
}

function handleLogin($pdo) {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    if (empty($email) || empty($password)) {
        showMessage('Email and password are required!', 'error');
        return;
    }
    
    // Get user from database
    $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        // Login successful
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        
        // Update last login
        $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$user['id']]);
        
        header('Location: index.html');
        exit;
    } else {
        showMessage('Invalid email or password!', 'error');
    }
}

function handleForgotPassword($pdo) {
    $email = trim($_POST['email']);
    
    if (empty($email)) {
        showMessage('Email is required!', 'error');
        return;
    }
    
    // Check if email exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        // In a real application, you would send an email with reset link
        showMessage('Password reset link has been sent to your email!', 'success');
    } else {
        showMessage('Email not found!', 'error');
    }
}

function showMessage($message, $type) {
    echo "<script>
        document.addEventListener('DOMContentLoaded', function() {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 90px;
                right: 20px;
                background: " . ($type === 'success' ? '#2ecc71' : '#e74c3c') . ";
                color: white;
                padding: 1rem 2rem;
                border-radius: 5px;
                z-index: 1002;
                animation: slideInRight 0.3s ease;
            `;
            notification.textContent = '$message';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        });
    </script>";
}
?>
