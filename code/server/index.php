<?php
require __DIR__ . "/inc/bootstrap.php";

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if (isset($_SERVER['REQUEST_URI'])) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );
    if (
        !isset($uri[2]) || !isset($uri[3]) ||
        (isset($uri[2]) && $uri[2] != 'user') &&
        (isset($uri[2]) && $uri[2] != 'snippet')
    ) {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
    
    switch ($uri[2]) {
        case 'user':
            require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
            $objFeedController = new UserController();
            $strMethodName = $uri[3] . 'Action';
            $objFeedController->{$strMethodName}();
            break;
        case 'snippet':
            require PROJECT_ROOT_PATH . "/Controller/Api/SnippetController.php";
            $objFeedController = new SnippetController();
            $strMethodName = $uri[3] . 'Action';
            $objFeedController->{$strMethodName}();
            break;
        case 'shared-snippet':
            require PROJECT_ROOT_PATH . "/Controller/Api/SharedSnippetController.php";
            $objFeedController = new SharedSnippetController();
            $strMethodName = $uri[3] . 'Action';
            $objFeedController->{$strMethodName}();
            break;
        default:
            # code...
            break;
    }
}
?>