<?php

try {
    $pdo       = new PDO("mysql:dbname=school;host=127.0.0.1", 'root', 'password123');
    $statement = $pdo->query("select * from students where id = 1");
    $result    = $statement->fetch(PDO::FETCH_OBJ);
    var_dump($result);

} catch (PDOException $e) {
    die($e->getMessage());
} catch (Exception $e) {
    echo $e->getMessage();
}
