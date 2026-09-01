<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$config = guudle_load_config();
guudle_cors($config);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',
        'use_strict_mode' => true,
    ]);
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

guudle_json(200, [
    'success' => true,
    'token' => $_SESSION['csrf_token'],
]);
