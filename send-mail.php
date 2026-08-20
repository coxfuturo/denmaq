<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
} else {
    // Fallback manual include if vendor/autoload.php is missing
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';
}

// Allow CORS and preflight OPTIONS requests to prevent 405 Method Not Allowed errors
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$isAjax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
          || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

if ($isAjax) {
    header('Content-Type: application/json; charset=UTF-8');
} else {
    header('Content-Type: text/html; charset=UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = ['status' => 'error', 'message' => 'Invalid request method. Only POST allowed.'];
    if ($isAjax) {
        echo json_encode($response);
        exit;
    } else {
        exit('Invalid Request');
    }
}

// Global Configuration
$adminEmail = 'info@coxfuture.com';
$adminName = 'Denmaq Team';
$companyName = 'Denmaq';

// SMTP Configuration (Update credentials when deploying to live cPanel / Hostinger server)
$smtpHost = 'smtp.hostinger.com';
$smtpUsername = 'info@coxfuture.com';
$smtpPassword = 'denmaq@9217';
$smtpPort = 465;
$smtpSecure = PHPMailer::ENCRYPTION_SMTPS;
$useSMTP = true; // Set to false if host uses native mail() sendmail

$formType = filter_var($_POST['form_type'] ?? 'contact', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

/*
|--------------------------------------------------------------------------
| 1. CONTACT & ENQUIRY FORM PROCESSING
|--------------------------------------------------------------------------
*/
if ($formType === 'contact' || $formType === 'proposal') {
    $name = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST['phone'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $company = filter_var(trim($_POST['company'] ?? $_POST['service'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (empty($name) || empty($email) || empty($phone)) {
        $response = ['status' => 'error', 'message' => 'Please fill in all required fields (Name, Email, Phone).'];
        if ($isAjax) { echo json_encode($response); exit; } else { exit($response['message']); }
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = ['status' => 'error', 'message' => 'Please provide a valid email address.'];
        if ($isAjax) { echo json_encode($response); exit; } else { exit($response['message']); }
    }

    $mail = new PHPMailer(true);

    try {
        if ($useSMTP) {
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUsername;
            $mail->Password = $smtpPassword;
            $mail->SMTPSecure = $smtpSecure;
            $mail->Port = $smtpPort;
        } else {
            $mail->isMail();
        }

        $mail->CharSet = 'UTF-8';
        $mail->setFrom($adminEmail, $companyName);
        $mail->addAddress($adminEmail, $adminName);
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);

        $mail->Subject = "New Inquiry From {$name} - {$companyName}";
        
        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head><style>
            body { font-family: 'Outfit', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
            .container { max-width: 600px; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-top: 5px solid #411E79; }
            h2 { color: #411E79; font-size: 22px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th { text-align: left; padding: 12px; background: #f8f9fc; color: #411E79; border-bottom: 1px solid #edf2f7; width: 30%; }
            td { padding: 12px; border-bottom: 1px solid #edf2f7; color: #2d3748; }
            .footer { margin-top: 25px; font-size: 12px; color: #a0aec0; text-align: center; }
        </style></head>
        <body>
            <div class='container'>
                <h2>New Website Inquiry - {$companyName}</h2>
                <table>
                    <tr><th>Sender Name</th><td>{$name}</td></tr>
                    <tr><th>Email Address</th><td><a href='mailto:{$email}'>{$email}</a></td></tr>
                    <tr><th>Phone Number</th><td><a href='tel:{$phone}'>{$phone}</a></td></tr>
                    <tr><th>Company / Website</th><td>" . ($company ? $company : 'N/A') . "</td></tr>
                    <tr><th>Requirements</th><td>" . nl2br($message) . "</td></tr>
                </table>
                <div class='footer'>Sent automatically via {$companyName} Website Lead Form</div>
            </div>
        </body>
        </html>";

        $mail->send();

        // Send Auto-Reply to Customer in an isolated try-catch block
        try {
            // Only attempt auto-reply if customer email is different or valid
            $autoReply = new PHPMailer(true);
            if ($useSMTP) {
                $autoReply->isSMTP();
                $autoReply->Host = $smtpHost;
                $autoReply->SMTPAuth = true;
                $autoReply->Username = $smtpUsername;
                $autoReply->Password = $smtpPassword;
                $autoReply->SMTPSecure = $smtpSecure;
                $autoReply->Port = $smtpPort;
            } else {
                $autoReply->isMail();
            }

            $autoReply->CharSet = 'UTF-8';
            $autoReply->setFrom($adminEmail, $companyName);
            $autoReply->addAddress($email, $name);
            $autoReply->isHTML(true);

            $autoReply->Subject = "Thank You For Contacting {$companyName}";
            $autoReply->Body = "
            <!DOCTYPE html>
            <html>
            <head><style>
                body { font-family: 'Outfit', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
                .container { max-width: 600px; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-top: 5px solid #411E79; }
                h2 { color: #411E79; font-size: 22px; margin-bottom: 15px; }
                p { color: #4a5568; line-height: 1.6; font-size: 15px; }
                .btn { display: inline-block; padding: 12px 28px; background-color: #411E79; color: #ffffff !important; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 15px; }
                .signature { margin-top: 25px; border-top: 1px solid #edf2f7; padding-top: 15px; font-weight: bold; color: #2d3748; }
            </style></head>
            <body>
                <div class='container'>
                    <h2>Hello {$name},</h2>
                    <p>Thank you for reaching out to <strong>{$companyName}</strong>. We have received your inquiry and our team of digital strategists is currently reviewing your project details.</p>
                    <p>One of our senior account specialists will get back to you within 24 business hours to discuss your custom proposal.</p>
                    <a href='https://denmaq.com' class='btn'>Visit Our Website</a>
                    <div class='signature'>
                        Best Regards,<br>
                        <strong>The {$companyName} Team</strong><br>
                        <span style='font-size:13px; color:#718096;'>Dallas 1 Business Park, Sector-63, Noida | +91 92177 90770</span>
                    </div>
                </div>
            </body>
            </html>";

            $autoReply->send();
        } catch (\Throwable $t) {
            // Log or ignore auto-reply failure without breaking main lead confirmation
            error_log("Auto-reply exception: " . $t->getMessage());
        }

        $response = ['status' => 'success', 'message' => 'Thank you! Your message has been sent successfully. Our team will contact you shortly.'];

    } catch (Exception $e) {
        $response = ['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"];
    }

} 
/*
|--------------------------------------------------------------------------
| 2. CAREER & RESUME FORM PROCESSING
|--------------------------------------------------------------------------
*/
else if ($formType === 'career') {
    $name = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST['phone'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $position = filter_var(trim($_POST['position'] ?? ''), FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (empty($name) || empty($email) || empty($phone) || empty($position)) {
        $response = ['status' => 'error', 'message' => 'Please fill in all required career fields.'];
        if ($isAjax) { echo json_encode($response); exit; } else { exit($response['message']); }
    }

    $mail = new PHPMailer(true);

    try {
        if ($useSMTP) {
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUsername;
            $mail->Password = $smtpPassword;
            $mail->SMTPSecure = $smtpSecure;
            $mail->Port = $smtpPort;
        } else {
            $mail->isMail();
        }

        $mail->CharSet = 'UTF-8';
        $mail->setFrom($adminEmail, $companyName);
        $mail->addAddress($adminEmail, $adminName);
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);

        $mail->Subject = "New Career Application: {$position} - {$name}";
        $mail->Body = "
        <h2>New Job Application Received</h2>
        <p><strong>Applicant Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Position Applied For:</strong> {$position}</p>";

        if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
            $mail->addAttachment($_FILES['resume']['tmp_name'], $_FILES['resume']['name']);
        }

        $mail->send();
        $response = ['status' => 'success', 'message' => 'Your job application has been submitted successfully!'];

    } catch (Exception $e) {
        $response = ['status' => 'error', 'message' => "Application Error: {$mail->ErrorInfo}"];
    }
}

if ($isAjax) {
    echo json_encode($response);
    exit;
} else {
    if ($response['status'] === 'success') {
        echo "<script>alert('" . addslashes($response['message']) . "'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('" . addslashes($response['message']) . "'); window.history.back();</script>";
    }
    exit;
}