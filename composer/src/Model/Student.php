<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = "students";

    public $timestamps = false;

    protected $fillable = ['name', 'age', 'email', 'gender'];
}
