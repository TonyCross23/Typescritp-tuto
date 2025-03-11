<?php
namespace App\Utils;

use App\Model\Student;
use Illuminate\Database\Capsule\Manager as DB;

class Database
{
    public function __construct()
    {
        $db = new DB;

        $db->addConnection([
            'driver'    => 'mysql',
            'host'      => '127.0.0.1',
            'database'  => 'school',
            'username'  => 'root',
            'password'  => 'password123',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ]);

// Make this db instance available globally via static methods... (optional)
        $db->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
        $db->bootEloquent();

    }

    public function index()
    {
        $students = Student::all();
        return $students;
    }

    public function destory($id)
    {
        $result = Student::destroy($id);
        if ($result) {
            header("location: index.php");
        }
    }

    public function store($data)
    {

        $student = Student::create($data);

        if ($student) {
            header("location: index.php");
        }
    }

    public function show($id)
    {
        $student = Student::find($id);
        return $student;
    }

    public function update($data)
    {
        $result = Student::where("id", $data['id'])->update($data);

        if ($result) {
            header("location: index.php");
        }

    }
}
