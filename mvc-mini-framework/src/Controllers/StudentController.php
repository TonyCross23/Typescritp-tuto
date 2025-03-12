<?php
namespace App\Controllers;

use App\Models\Student;
use Symfony\Component\HttpFoundation\Request;

class StudentController
{

    private $query, $post;
    public function index()
    {
        $students = Student::get();
        return view('index.php', ["students" => $students]);
    }

    public function create()
    {
        return view("create.php");
    }

    public function store(Request $request)
    {
        $student = Student::create($request->request->all());
        if ($student) {
            return redirect("/index");
        }
    }

    public function show($id)
    {
        $student = Student::find($id);
        return view("show.php", ['student' => $student]);
    }

    public function edit($id)
    {
        $student = Student::find($id);
        return view("edit.php", ["student" => $student]);
    }

    public function update(Request $request)
    {
        $result = Student::where("id", $request->request->get('id'))->update($request->request->all());

        if ($result) {
            return redirect("/index");
        }
    }

    public function destroy($id)
    {
        $result = Student::destroy($id);

        if ($result) {
            return redirect("/index");
        }

    }
}
