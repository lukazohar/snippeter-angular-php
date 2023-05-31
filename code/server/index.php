<?php

session_start();

require_once("controller/SnippetsController.php");
require_once("controller/UsersController.php");
require_once("controller/SharedSnippetsController.php");

define("BASE_URL", $_SERVER["SCRIPT_NAME"] . "/");
define("ASSETS_URL", rtrim($_SERVER["SCRIPT_NAME"], "index.php") . "assets/");

$path = isset($_SERVER["PATH_INFO"]) ? trim($_SERVER["PATH_INFO"], "/") : "";

$urls = [
    # Book CRUD
    "users" => function () {
       UsersController::index();
    },
    "" => function () {
        ViewHelper::redirect(BASE_URL . "snippets");
    },
];

try {
    if (isset($urls[$path])) {
       $urls[$path]();
    } else {
        echo "No controller for '$path'";
    }
} catch (Exception $e) {
    echo "An error occurred: <pre>$e</pre>";
    // ViewHelper::error404();
} 
