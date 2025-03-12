<?php

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Templating\Helper\SlotsHelper;
use Symfony\Component\Templating\Loader\FilesystemLoader;
use Symfony\Component\Templating\PhpEngine;
use Symfony\Component\Templating\TemplateNameParser;

function view($file_name, $data = null)
{
    $filesystemLoader = new FilesystemLoader(__DIR__ . '/views/%name%');

    $templating = new PhpEngine(new TemplateNameParser(), $filesystemLoader);
    $templating->set(new SlotsHelper());

    return new Response($templating->render($file_name, $data), 200);

}
