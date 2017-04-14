<?php

require_once __DIR__ . '/vendor/autoload.php';

if (file_exists(__DIR__ . DIRECTORY_SEPARATOR . '.serverconfig')) {
    $dotenvconfig = new Dotenv\Dotenv(__DIR__, '.serverconfig');
    $dotenvconfig->load();
}

$pathToDotEnv = getenv('PATH_TO_DOT_ENV') ?: $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . '..';
$dotenv = new Dotenv\Dotenv($pathToDotEnv);
$dotenv->load();

$app_id = getenv('APP_ID');
$app_secret = getenv('APP_SECRET');
$page_name = getenv('PAGE_NAME');
$limit = getenv('POST_LIMIT') ?: 12;

$fb = new Facebook\Facebook([
    'app_id' => $app_id,
    'app_secret' => $app_secret,
    'default_graph_version' => 'v2.2',
]);

try {
    // Returns a `Facebook\FacebookResponse` object
    $response = $fb->get("/$page_name?fields=posts.limit($limit){message,created_time,link,picture,full_picture,name}&locale=en_GB", "$app_id|$app_secret");
} catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    http_response_code(500);
    exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    http_response_code(500);
    exit;
}

$responseBody = $response->getDecodedBody();
header("Content-type: application/json");
echo json_encode($responseBody['posts']['data']);
