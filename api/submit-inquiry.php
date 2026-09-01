<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$config = guudle_load_config();
guudle_cors($config);

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    guudle_json(405, ['success' => false, 'error' => 'Method not allowed.']);
}

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',
        'use_strict_mode' => true,
    ]);
}

$csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
$csrfBody = $_POST['csrf_token'] ?? '';
$token = $csrfHeader ?: $csrfBody;
if (!$token || empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
    guudle_json(403, ['success' => false, 'error' => 'Invalid or expired security token. Refresh the page and try again.']);
}

/* Honeypot — bots fill hidden field */
if (!empty($_POST['website_url'])) {
    guudle_json(200, ['success' => true, 'message' => 'Thank you. We will be in touch shortly.']);
}

guudle_rate_limit($config);

$fullName = guudle_sanitize_string($_POST['full_name'] ?? null, 150);
$email = guudle_validate_email($_POST['email'] ?? null);
$projectDescription = guudle_sanitize_string($_POST['project_description'] ?? null, 8000);

if (!$fullName || !$email || !$projectDescription) {
    guudle_json(422, [
        'success' => false,
        'error' => 'Please provide your full name, a valid email, and a project description.',
        'fields' => [
            'full_name' => !$fullName,
            'email' => !$email,
            'project_description' => !$projectDescription,
        ],
    ]);
}

$servicesRaw = $_POST['services'] ?? '[]';
if (is_string($servicesRaw)) {
    $services = json_decode($servicesRaw, true);
} else {
    $services = is_array($servicesRaw) ? $servicesRaw : [];
}
if (!is_array($services)) {
    $services = [];
}
$services = array_values(array_filter(array_map(
    static fn($s) => guudle_sanitize_string((string) $s, 120),
    $services
)));

$inquiryId = date('Ymd') . '_' . bin2hex(random_bytes(6));
$filePaths = guudle_handle_uploads($config, $inquiryId);

$row = [
    'full_name' => $fullName,
    'company_name' => guudle_sanitize_string($_POST['company_name'] ?? null, 200),
    'job_title' => guudle_sanitize_string($_POST['job_title'] ?? null, 120),
    'email' => $email,
    'phone' => guudle_sanitize_string($_POST['phone'] ?? null, 50),
    'country' => guudle_sanitize_string($_POST['country'] ?? null, 100),
    'preferred_contact' => guudle_sanitize_string($_POST['preferred_contact'] ?? null, 50),
    'services' => json_encode($services, JSON_UNESCAPED_UNICODE),
    'project_title' => guudle_sanitize_string($_POST['project_title'] ?? null, 255),
    'project_description' => $projectDescription,
    'business_objectives' => guudle_sanitize_string($_POST['business_objectives'] ?? null, 4000),
    'target_audience' => guudle_sanitize_string($_POST['target_audience'] ?? null, 2000),
    'current_challenges' => guudle_sanitize_string($_POST['current_challenges'] ?? null, 4000),
    'desired_features' => guudle_sanitize_string($_POST['desired_features'] ?? null, 4000),
    'budget' => guudle_sanitize_string($_POST['budget'] ?? null, 80),
    'timeline' => guudle_sanitize_string($_POST['timeline'] ?? null, 80),
    'preferred_tech' => guudle_sanitize_string($_POST['preferred_tech'] ?? null, 500),
    'existing_url' => guudle_sanitize_string($_POST['existing_url'] ?? null, 500),
    'additional_notes' => guudle_sanitize_string($_POST['additional_notes'] ?? null, 4000),
    'file_paths' => json_encode($filePaths, JSON_UNESCAPED_UNICODE),
    'ip_address' => guudle_client_ip(),
    'user_agent' => guudle_sanitize_string($_SERVER['HTTP_USER_AGENT'] ?? null, 500),
    'lead_status' => 'new',
];

try {
    $pdo = guudle_pdo($config);
    $sql = 'INSERT INTO inquiries (
        full_name, company_name, job_title, email, phone, country, preferred_contact,
        services, project_title, project_description, business_objectives, target_audience,
        current_challenges, desired_features, budget, timeline, preferred_tech, existing_url,
        additional_notes, file_paths, ip_address, user_agent, lead_status
    ) VALUES (
        :full_name, :company_name, :job_title, :email, :phone, :country, :preferred_contact,
        :services, :project_title, :project_description, :business_objectives, :target_audience,
        :current_challenges, :desired_features, :budget, :timeline, :preferred_tech, :existing_url,
        :additional_notes, :file_paths, :ip_address, :user_agent, :lead_status
    )';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($row);
    $insertId = (int) $pdo->lastInsertId();
} catch (Throwable $e) {
    error_log('Inquiry insert failed: ' . $e->getMessage());
    guudle_json(500, ['success' => false, 'error' => 'Unable to save your inquiry. Please email info@guudle.com directly.']);
}

$serviceList = $services ? implode(', ', $services) : 'Not specified';
$adminBody = "New project inquiry (#{$insertId})\n\n"
    . "Name: {$fullName}\n"
    . "Company: " . ($row['company_name'] ?: '—') . "\n"
    . "Email: {$email}\n"
    . "Phone: " . ($row['phone'] ?: '—') . "\n"
    . "Country: " . ($row['country'] ?: '—') . "\n"
    . "Services: {$serviceList}\n"
    . "Budget: " . ($row['budget'] ?: '—') . "\n"
    . "Timeline: " . ($row['timeline'] ?: '—') . "\n\n"
    . "Project:\n{$projectDescription}\n";

guudle_send_mail(
    $config,
    $config['mail']['to'] ?? 'info@guudle.com',
    'New Project Inquiry — ' . $fullName,
    $adminBody,
    $email
);

if (!empty($config['mail']['auto_reply'])) {
    $clientBody = "Dear {$fullName},\n\n"
        . "Thank you for contacting Guudle IT Solutions. We have received your project inquiry "
        . "and our team will review your requirements within one business day.\n\n"
        . "Reference: #{$insertId}\n\n"
        . "Best regards,\nGuudle IT Solutions\ninfo@guudle.com\n+44 (0) 7908 727 559";
    guudle_send_mail($config, $email, 'We received your project inquiry — Guudle IT Solutions', $clientBody);
}

/* Rotate CSRF after successful submission */
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

guudle_json(201, [
    'success' => true,
    'message' => 'Thank you! Your inquiry has been submitted successfully.',
    'reference' => $insertId,
    'csrf_token' => $_SESSION['csrf_token'],
]);
