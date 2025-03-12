<?php

use App\Controllers\StudentController;

function notFound()
{
    echo "not found";
}

$routes = [
    '/index'   => [StudentController::class, 'index'],
    '/create'  => [StudentController::class, 'create'],
    '/store'   => [StudentController::class, 'store'],
    '/show'    => [StudentController::class, 'show'],
    '/edit'    => [StudentController::class, 'edit'],
    '/update'  => [StudentController::class, 'update'],
    '/destroy' => [StudentController::class, 'delete'],
];

if (array_key_exists('PATH_INFO', $_SERVER)) {
    $route = $_SERVER['PATH_INFO'];
} else {
    $route = "/index";
}

if (array_key_exists($route, $routes)) {
    $controller = $routes[$route][0];
    $method     = $routes[$route][1];
} else {
    notFound();
    die();
}

$home = new $controller();
$home->$method();
