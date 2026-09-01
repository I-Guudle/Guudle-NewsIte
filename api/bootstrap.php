<?php
declare(strict_types=1);

function guudle_load_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        http_response_code(503);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'error' => 'Server not configured. Copy api/config.example.php to api/config.php and set database credentials.',
        ]);
        exit;
    }
    return require $path;
}

function guudle_cors(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = $config['cors']['allowed_origins'] ?? ['*'];
    if (in_array('*', $allowed, true)) {
        header('Access-Control-Allow-Origin: *');
    } elseif ($origin && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function guudle_json(int $code, array $payload): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function guudle_client_ip(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = trim(explode(',', (string) $_SERVER[$key])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

function guudle_rate_limit(array $config): void
{
    $dir = $config['rate_limit']['dir'] ?? (__DIR__ . '/rate-limit');
    $max = (int) ($config['rate_limit']['max_per_hour'] ?? 8);
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
    $ip = guudle_client_ip();
    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();
    $window = 3600;
    $data = ['count' => 0, 'start' => $now];
    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = json_decode($raw ?: '', true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    if ($now - (int) ($data['start'] ?? 0) > $window) {
        $data = ['count' => 0, 'start' => $now];
    }
    if ((int) $data['count'] >= $max) {
        guudle_json(429, ['success' => false, 'error' => 'Too many requests. Please try again later.']);
    }
    $data['count'] = (int) $data['count'] + 1;
    file_put_contents($file, json_encode($data), LOCK_EX);
}

function guudle_sanitize_string(?string $value, int $max = 5000): ?string
{
    if ($value === null) {
        return null;
    }
    $value = trim(strip_tags($value));
    if ($value === '') {
        return null;
    }
    return mb_substr($value, 0, $max);
}

function guudle_validate_email(?string $email): ?string
{
    $email = guudle_sanitize_string($email, 255);
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    return strtolower($email);
}

function guudle_pdo(array $config): PDO
{
    $db = $config['db'];
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $db['host'],
        (int) $db['port'],
        $db['name'],
        $db['charset'] ?? 'utf8mb4'
    );
    return new PDO($dsn, $db['user'], $db['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

function guudle_send_mail(array $config, string $to, string $subject, string $body, ?string $replyTo = null): bool
{
    if (empty($config['mail']['enabled'])) {
        return false;
    }
    $from = $config['mail']['from'] ?? 'noreply@guudle.com';
    $fromName = $config['mail']['from_name'] ?? 'Guudle IT Solutions';
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/plain; charset=UTF-8',
        'From: ' . $fromName . ' <' . $from . '>',
    ];
    if ($replyTo) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    return @mail($to, $subject, $body, implode("\r\n", $headers));
}

function guudle_handle_uploads(array $config, string $inquiryId): array
{
    $uploadCfg = $config['upload'] ?? [];
    $dir = rtrim($uploadCfg['dir'] ?? (__DIR__ . '/uploads/inquiries'), '/\\');
    $maxBytes = (int) ($uploadCfg['max_bytes'] ?? 10485760);
    $maxFiles = (int) ($uploadCfg['max_files'] ?? 5);
    $allowed = array_map('strtolower', $uploadCfg['allowed_extensions'] ?? ['pdf', 'png', 'jpg']);

    if (empty($_FILES['files'])) {
        return [];
    }

    $files = $_FILES['files'];
    $saved = [];
    $count = is_array($files['name']) ? count($files['name']) : 0;
    if ($count > $maxFiles) {
        guudle_json(400, ['success' => false, 'error' => 'Too many files. Maximum ' . $maxFiles . ' allowed.']);
    }

    $targetDir = $dir . '/' . $inquiryId;
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0750, true);
    }

    for ($i = 0; $i < $count; $i++) {
        if (($files['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if (($files['error'][$i] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
            continue;
        }
        if (($files['size'][$i] ?? 0) > $maxBytes) {
            guudle_json(400, ['success' => false, 'error' => 'File exceeds maximum size of 10 MB.']);
        }
        $original = basename((string) $files['name'][$i]);
        $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowed, true)) {
            guudle_json(400, ['success' => false, 'error' => 'File type not allowed: ' . $ext]);
        }
        $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', pathinfo($original, PATHINFO_FILENAME));
        $filename = $safeName . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
        $dest = $targetDir . '/' . $filename;
        if (!move_uploaded_file($files['tmp_name'][$i], $dest)) {
            guudle_json(500, ['success' => false, 'error' => 'Failed to store uploaded file.']);
        }
        $saved[] = 'inquiries/' . $inquiryId . '/' . $filename;
    }

    return $saved;
}
