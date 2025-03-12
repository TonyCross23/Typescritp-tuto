<?php

require_once "db.php";

$db      = new DB();
$student = $db->destory($_GET['id']);
