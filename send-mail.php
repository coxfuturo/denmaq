<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header( 'Content-Type:text/plain' );

if ( $_SERVER[ 'REQUEST_METHOD' ] != 'POST' ) {
    exit( 'failed' );
}

/*
|--------------------------------------------------------------------------
| Detect Form Type
|--------------------------------------------------------------------------
*/

$formType = $_POST[ 'form_type' ] ?? 'contact';

/*
|--------------------------------------------------------------------------
| CONTACT FORM
|--------------------------------------------------------------------------
*/

if ( $formType == 'contact' ) {

    $name = htmlspecialchars( trim( $_POST[ 'name' ] ?? '' ) );
    $email = filter_var( trim( $_POST[ 'email' ] ?? '' ), FILTER_SANITIZE_EMAIL );
    $phone = htmlspecialchars( trim( $_POST[ 'phone' ] ?? '' ) );
    $service = htmlspecialchars( trim( $_POST[ 'service' ] ?? '' ) );
    $message = htmlspecialchars( trim( $_POST[ 'message' ] ?? '' ) );

    if (
        empty( $name ) ||
        empty( $email ) ||
        empty( $service ) ||
        empty( $message )
    ) {
        exit( 'failed' );
    }

    if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
        exit( 'failed' );
    }

}

/*
|--------------------------------------------------------------------------
| CAREER FORM
|--------------------------------------------------------------------------
*/ else {

    $name = htmlspecialchars( trim( $_POST[ 'name' ] ?? '' ) );
    $email = filter_var( trim( $_POST[ 'email' ] ?? '' ), FILTER_SANITIZE_EMAIL );
    $phone = htmlspecialchars( trim( $_POST[ 'phone' ] ?? '' ) );
    $position = htmlspecialchars( trim( $_POST[ 'position' ] ?? '' ) );
    $experience = htmlspecialchars( trim( $_POST[ 'experience' ] ?? '' ) );
    $company = htmlspecialchars( trim( $_POST[ 'company' ] ?? '' ) );
    $salary = htmlspecialchars( trim( $_POST[ 'salary' ] ?? '' ) );
    $notice = htmlspecialchars( trim( $_POST[ 'notice_period' ] ?? '' ) );
    $linkedin = htmlspecialchars( trim( $_POST[ 'linkedin' ] ?? '' ) );
    $portfolio = htmlspecialchars( trim( $_POST[ 'portfolio' ] ?? '' ) );
    $workmode = htmlspecialchars( trim( $_POST[ 'work_mode' ] ?? '' ) );
    $coverletter = htmlspecialchars( trim( $_POST[ 'cover_letter' ] ?? '' ) );

    if (
        empty( $name ) ||
        empty( $email ) ||
        empty( $phone ) ||
        empty( $position )
    ) {
        exit( 'failed' );
    }

    if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
        exit( 'failed' );
    }

    /*
    |--------------------------------------------------------------------------
    | Resume Upload Validation
    |--------------------------------------------------------------------------
    */

    if (
        !isset( $_FILES[ 'resume' ] ) ||
        $_FILES[ 'resume' ][ 'error' ] != 0
    ) {
        exit( 'Resume Required' );
    }

    $allowed = [
        'pdf',
        'doc',
        'docx'
    ];

    $resumeName = $_FILES[ 'resume' ][ 'name' ];
    $resumeTmp = $_FILES[ 'resume' ][ 'tmp_name' ];
    $resumeSize = $_FILES[ 'resume' ][ 'size' ];
    $resumeExt = strtolower( pathinfo( $resumeName, PATHINFO_EXTENSION ) );

    if ( !in_array( $resumeExt, $allowed ) ) {
        exit( 'Invalid Resume' );
    }

    if ( $resumeSize > ( 5 * 1024 * 1024 ) ) {
        exit( 'Resume Max Size 5MB' );
    }
}

/*
|--------------------------------------------------------------------------
| PHPMailer Start
|--------------------------------------------------------------------------
*/

$mail = new PHPMailer( true );

try {

    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@coxfuture.com';
    $mail->Password = 'Coxfuture@9217';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom(
        'info@coxfuture.com',
        'CoxFuture Technologies'
    );

    $mail->addAddress( 'info@coxfuture.com' );
    $mail->addReplyTo( $email, $name );
    $mail->isHTML( true );

    /*
    |--------------------------------------------------------------------------
    | CONTACT EMAIL
    |--------------------------------------------------------------------------
    */

    if ( $formType == 'contact' ) {
        $mail->Subject = 'New Contact Form Enquiry';
        $mail->Body = "
    <h2>New Contact Enquiry</h2>
    <table border='1' cellpadding='10' cellspacing='0' width='100%'>

        <tr>
            <th align='left'>Name</th>
            <td>{$name}</td>
        </tr>

        <tr>
            <th align='left'>Email</th>
            <td>{$email}</td>
        </tr>

        <tr>
            <th align='left'>Phone</th>
            <td>{$phone}</td>
        </tr>

        <tr>
            <th align='left'>Service</th>
            <td>{$service}</td>
        </tr>

        <tr>
            <th align='left'>Message</th>
            <td>{$message}</td>
        </tr>
    </table>
    ";
    }

    /*
    |--------------------------------------------------------------------------
    | CAREER EMAIL
    |--------------------------------------------------------------------------
    */ else {

        $mail->Subject = 'New Career Application';
        $mail->Body = "
    <h2>New Career Application</h2>
    <table border='1' cellpadding='10' cellspacing='0' width='100%'>
        <tr>
            <th align='left'>Full Name</th>
            <td>{$name}</td>
        </tr>

        <tr>
            <th align='left'>Email</th>
            <td>{$email}</td>
        </tr>

        <tr>
            <th align='left'>Phone</th>
            <td>{$phone}</td>
        </tr>

        <tr>
            <th align='left'>Position</th>
            <td>{$position}</td>
        </tr>

        <tr>
            <th align='left'>Experience</th>
            <td>{$experience} Years</td>
        </tr>

        <tr>
            <th align='left'>Current Company</th>
            <td>{$company}</td>
        </tr>

        <tr>
            <th align='left'>Expected Salary</th>
            <td>{$salary}</td>
        </tr>

        <tr>
            <th align='left'>Notice Period</th>
            <td>{$notice}</td>
        </tr>

        <tr>
            <th align='left'>Preferred Work Mode</th>
            <td>{$workmode}</td>
        </tr>

        <tr>
            <th align='left'>LinkedIn</th>
            <td>{$linkedin}</td>
        </tr>

        <tr>
            <th align='left'>Portfolio</th>
            <td>{$portfolio}</td>
        </tr>

        <tr>
            <th align='left'>Cover Letter</th>
            <td>{$coverletter}</td>
        </tr>
    </table>";

        /*
        |--------------------------------------------------------------------------
        | Resume Attachment
        |--------------------------------------------------------------------------
        */

        $mail->addAttachment(
            $resumeTmp,
            $resumeName
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Send Admin Mail
    |--------------------------------------------------------------------------
    */

    $mail->send();

    /*
    |--------------------------------------------------------------------------
    | CUSTOMER AUTO REPLY
    |--------------------------------------------------------------------------
    */

    $reply = new PHPMailer( true );

    $reply->isSMTP();
    $reply->Host = 'smtp.hostinger.com';
    $reply->SMTPAuth = true;
    $reply->Username = 'info@coxfuture.com';
    $reply->Password = 'Coxfuture@9217';
    $reply->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $reply->Port = 465;
    $reply->CharSet = 'UTF-8';

    $reply->setFrom(
        'info@coxfuture.com',
        'CoxFuture Technologies'
    );

    $reply->addAddress( $email, $name );
    $reply->isHTML( true );

    /*
    |--------------------------------------------------------------------------
    | CONTACT AUTO REPLY
    |--------------------------------------------------------------------------
    */

    if ( $formType == 'contact' ) {
        $reply->Subject = 'Thank You For Contacting CoxFuture Technologies';
        $reply->Body = "

    <!DOCTYPE html>
    <html>
    <body style='margin:0;padding:40px;background:#f5f7fb;font-family:Arial,sans-serif;'>
    <div style='max-width:650px;margin:auto;background:#fff;padding:40px;border-radius:10px;'>
    <h2 style='color:#0d6efd;'>Hello {$name},</h2>

    <p>
    Thank you for contacting
    <strong>CoxFuture Technologies</strong>.
    </p>

    <p>
    We have received your enquiry regarding
    <strong>{$service}</strong>.
    </p>

    <p>
    Our team will contact you shortly.
    </p>

    <br>

    <strong>
    CoxFuture Technologies
    </strong>

    </div>
    </body>
    </html>";
    }

    /*
    |--------------------------------------------------------------------------
    | CAREER AUTO REPLY
    |--------------------------------------------------------------------------
    */ else {

        $reply->Subject = 'Application Received - CoxFuture Technologies';
        $reply->Body = "

    <!DOCTYPE html>
    <html>
    <body style='margin:0;padding:40px;background:#f5f7fb;font-family:Arial,sans-serif;'>

    <div style='max-width:650px;margin:auto;background:#fff;padding:40px;border-radius:10px;'>

    <h2 style='color:#0d6efd;'>
    Hello {$name},
    </h2>

    <p>
    Thank you for applying at
    <strong>CoxFuture Technologies</strong>.
    </p>

    <p>
    We have successfully received your application for
    <strong>{$position}</strong>.
    </p>

    <p>
    Our HR team will review your profile and resume.
    If your profile matches our requirements,
    we will contact you shortly.
    </p>
    <br>
    <p>
    Best Regards
    </p>
    <strong>
    CoxFuture Technologies
    </strong>
    </div>
    </body>
    </html>
    ";
    }

    if ( $reply->send() ) {
        echo 'success';
    } else {
        echo 'Auto Reply Error : ' . $reply->ErrorInfo;
    }
} catch ( Exception $e ) {
    echo 'Auto Reply Exception : ' . $reply->ErrorInfo;
}
exit;