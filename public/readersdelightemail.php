<?php

$allowed_origins = array(
    'http://localhost',
    'https://apptrove.netlify.app/',
);
die($_SERVER['HTTP_ORIGIN']);

// Check if the request origin is allowed
if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 3600'); // Cache preflight request for 1 hour
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        // Respond to preflight requests immediately and finish execution
        exit(0);
    }
} else {
    // Request origin is not allowed
    header('HTTP/1.1 403 Forbidden');
    exit('Access denied');
}

require_once('vendor/autoload.php');

if(isset($_POST["send_mail"]) && $_POST["send_mail"] === "mklermklerml" && $_SERVER["REQUEST_METHOD"] === "POST"){
    $To = $_POST["To"];
    $Subject = $_POST["Subject"];
    $Content = $_POST["Content"];
 
    $config = ElasticEmail\Configuration::getDefaultConfiguration()->setApiKey('X-ElasticEmail-ApiKey', '986EFD8097D98CD21DC4914B443766AB9EB96130CDF0C6A4C540069221EDF836037BEEBBC54F0A9AF1B770250A318B34');
    
    $apiInstance = new ElasticEmail\Api\EmailsApi(
        new GuzzleHttp\Client(),
        $config
    );
    
    $email = new \ElasticEmail\Model\EmailMessageData(array(
        "recipients" => array(
            new \ElasticEmail\Model\EmailRecipient(array("email" => $To))
        ),
        "content" => new \ElasticEmail\Model\EmailContent(array(
            "body" => array(
                new \ElasticEmail\Model\BodyPart(array(
                    "content_type" => "HTML",
                    "content" => $Content
                ))
            ),
            "from" => '"App Trove" <taiwojoshua840@gmail.com>',
            "subject" => $Subject
        ))
    ));
    
    try {
        $apiInstance->emailsPost($email);
        die("sent");
    } catch (Exception $e) {
        die("Failed");
        // die($e->getMessage());
        // echo 'Exception when calling EE API: ', $e->getMessage(), PHP_EOL;
    }
}
