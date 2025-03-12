<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

  <title>Hello, world!</title>
</head>

<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <?php if ($student): ?>
        <h3 class="my-3">Edit Student</h3>
        <form action="/update" method="POST">
          <input type="hidden" name="id" value="<?php echo $student->id; ?>" />
          <div class="mb-3">
            <label for="exampleInputName" class="form-label">Name</label>
            <input type="text" name="name" value="<?php echo $student->name; ?>" class="form-control" id="exampleInputName" aria-describedby="nameHelp">
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name="email" value="<?php echo $student->email; ?>" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputAge" class="form-label">Age</label>
            <input type="number" name="age" value="<?php echo $student->age; ?>" class="form-control" id="exampleInputAge">
          </div>
          <div class="mb-3">
            <select name="gender" class=" form-control" aria-label="Default select example">
              <option value="" selected>Select Gender</option>
              <option value="male"                                   <?php if ($student->gender == "male") {echo "selected";}?>>Male</option>
              <option value="female"                                     <?php if ($student->gender == "female") {echo "selected";}?>>Female</option>
            </select>
          </div>
          <div class="d-flex">
            <button type="submit" class="btn btn-primary btn-sm mx-1">Edit</button>
            <a class="btn btn-danger btn-sm" href="/index">Cancel</a>
          </div>
        </form>
        <?php else: ?>
        <p>student not found</p>
        <?php
            endif;
        ?>
      </div>
    </div>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>

</html>
