<?php
namespace App\Utils;

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
        $students = DB::table("students")->get();
        return $students;
    }

    public function destory($id)
    {
        $result = DB::table('students')->where('id', '=', $id)->delete();
        if ($result) {
            header("location: index.php");
        }
    }

    public function store($data)
    {

        $id = DB::table('students')->insertGetId([
            'name'   => $data['name'],
            'age'    => $data['age'],
            'email'  => $data['email'],
            'gender' => $data['gender'],
        ]);

        if ($id) {
            header("location: index.php");
        }
    }

    public function show($id)
    {
        $student = DB::table('students')->where("id", $id)->first();
        return $student;
    }

    public function update($data)
    {
        $result = DB::table('students')->where('id', $data['id'])->update([
            'name'   => $data['name'],
            'age'    => $data['age'],
            'email'  => $data['email'],
            'gender' => $data['gender'],
        ]);

        if ($result) {
            header("location: index.php");
        }

    }
}
