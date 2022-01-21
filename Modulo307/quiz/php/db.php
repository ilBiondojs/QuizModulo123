<?php
    $con = mysqli_connect("localhost:3306","quiz","Quiz_2022!", "quiz");
    if (mysqli_connect_error()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
?>