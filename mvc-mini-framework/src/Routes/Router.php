<?php

use App\Controllers\StudentController;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();
$routes->add('hello', new Route('/index', [
    '_controller' => [StudentController::class, 'index'],
]));
