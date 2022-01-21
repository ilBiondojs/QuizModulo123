<?php
    require("db.php");
    if(isset($_GET['query'])){
        $final = "";
        $result = mysqli_query($con, $_GET['query']);
        while($row = mysqli_fetch_array($result)){
            $id = $row['id'];
            $domanda = $row['domanda'];
            $risposta = $row['risposta'];
            $falsa1 = $row['falsa1'];
            $falsa2 = $row['falsa2'];
            $falsa3 = $row['falsa3'];
            if(isset($_GET['altro'])){
                switch($_GET['altro']){
                    case "giusta":
                        $final = $row['risposta'];
                    break;
                }
            }else{
                switch (rand(1, 4)) {
                    case 1:
                        $final = '{"id":"' . $id . '","domanda":"' . $domanda . '","risposta":"' . $risposta . '","risposta1":"' . $falsa1 . '","risposta2":"' . $falsa2 . '","risposta3":"' . $falsa3 . '"}';
                    break;
                    case 2:
                        $final = '{"id":"' . $id . '","domanda":"' . $domanda . '","risposta":"' . $falsa3 . '","risposta1":"' . $risposta . '","risposta2":"' . $falsa1 . '","risposta3":"' . $falsa2 . '"}';
                    break;
                    case 3:
                        $final = '{"id":"' . $id . '","domanda":"' . $domanda . '","risposta":"' . $falsa2 . '","risposta1":"' . $falsa3 . '","risposta2":"' . $risposta . '","risposta3":"' . $falsa1 . '"}';
                    break;
                    case 4:
                        $final = '{"id":"' . $id . '","domanda":"' . $domanda . '","risposta":"' . $falsa1 . '","risposta1":"' . $falsa2 . '","risposta2":"' . $falsa3 . '","risposta3":"' . $risposta . '"}';
                    break;
                }
            }
            echo $final;
        }
    }
?>