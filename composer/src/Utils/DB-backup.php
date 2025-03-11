<?php
namespace Utils;

use Exception;
use PDO;
use PDOException;

class DB
{
    protected $pdo;
    public function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:dbname=school;host=127.0.0.1", 'root', 'password123');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die($e->getMessage());
        } catch (Exception $e) {
            echo $e->getMessage();
        }

    }

    public function index()
    {

        $statement = $this->pdo->query("SELECT * FROM students");
        if ($statement) {
            $students = $statement->fetchAll(PDO::FETCH_OBJ);
            return $students;
        }
    }

    public function show($id)
    {

        $statement = $this->pdo->prepare("SELECT * FROM students WHERE id = :id");
        $statement->bindParam(":id", $id);
        if ($statement->execute()) {
            $student = $statement->fetch(PDO::FETCH_OBJ);
            return $student;
        }

    }

    public function store($data)
    {

        $statement = $this->pdo->prepare("
      INSERT INTO `students`(`name`,`age`,`email`,`gender`)
      VALUES (:name,:age,:email,:gender)
    ");

        $statement->bindParam(":name", $data['name']);
        $statement->bindParam(":age", $data['age']);
        $statement->bindParam(":email", $data['email']);
        $statement->bindParam(":gender", $data['gender']);

        if ($statement->execute()) {
            $student = $this->pdo->lastInsertId();
            header("location: index.php");
            return $student;
        }

    }

    public function update($data)
    {

        $statement = $this->pdo->prepare("UPDATE students SET name = :name, age = :age, email = :email, gender = :gender WHERE id = :id");

        $statement->bindParam(":id", $_GET['id'], PDO::PARAM_INT);
        $statement->bindParam(":name", $data['name'], PDO::PARAM_STR);
        $statement->bindParam(":age", $data['age'], PDO::PARAM_INT);
        $statement->bindParam(":email", $data['email'], PDO::PARAM_STR);
        $statement->bindParam(":gender", $data['gender'], PDO::PARAM_STR);

        if ($statement->execute()) {
            header("location: index.php");
        }

    }

    public function destory($id)
    {

        $statement = $this->pdo->prepare("DELETE FROM students WHERE id = :id");

        $statement->bindParam(":id", $id);

        if ($statement->execute()) {
            header("location: index.php");
        }

    }
}
