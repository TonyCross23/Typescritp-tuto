<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
</head>

<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <div>
          <h3 class="my-3">Student</h3>
          <a href="/create" class="btn btn-primary mb-3 float-right">Create new one</a>
        </div>
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($students as $student): ?>
            <tr>
              <td><?php echo $student->name; ?></td>
              <td><?php echo $student->email; ?></td>
              <td>
                <a href="/show/<?php echo $student->id; ?>" class="btn btn-primary btn-sm">View</a>
                <a href="/edit/<?php echo $student->id; ?>" class="btn btn-success btn-sm">Edit</a>
                <a href="/destroy/<?php echo $student->id; ?>" class="btn btn-danger btn-sm">Delete</a>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>

</html>
