<?php
/**
 * Copy to config.php and fill in your database credentials.
 * Never commit config.php to version control.
 */
return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'guudle_site',
        'user' => 'your_db_user',
        'pass' => 'your_db_password',
        'charset' => 'utf8mb4',
    ],
    'mail' => [
        'enabled' => true,
        'to' => 'info@guudle.com',
        'from' => 'noreply@guudle.com',
        'from_name' => 'Guudle IT Solutions',
        'auto_reply' => true,
    ],
    'upload' => [
        'dir' => __DIR__ . '/uploads/inquiries',
        'max_bytes' => 10 * 1024 * 1024, // 10 MB per file
        'max_files' => 5,
        'allowed_extensions' => ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'zip', 'txt', 'xlsx', 'pptx'],
    ],
    'rate_limit' => [
        'max_per_hour' => 8,
        'dir' => __DIR__ . '/rate-limit',
    ],
    'cors' => [
        'allowed_origins' => ['*'], // Restrict to your domain in production, e.g. https://guudle.com
    ],
];
