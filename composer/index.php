<?php

require_once __DIR__ . "/vendor/autoload.php";

class HomeController
{
    public function index()
    {
        echo "Home";
    }

    public function create()
    {
        echo "Create";
    }
}

class TestController
{
    public function index()
    {
        echo "Test";
    }

}

function notFound()
{
    echo "not found page";
}

$routes = [
    '/index'  => [HomeController::class, 'index'],
    '/create' => [HomeController::class, 'create'],
    '/test'   => [TestController::class, 'index'],
];

$route = $_SERVER['PATH_INFO'];

if (array_key_exists($route, $routes)) {
    $controller = $routes[$route][0];
    $method     = $routes[$route][1];
} else {
    notFound();
    die();
}

$home = new $controller();
$home->$method();
