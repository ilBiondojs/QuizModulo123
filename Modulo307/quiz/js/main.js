var array = [];
var currentQuestion = 0;
var db = "";
var domandeGiuste = 0;
var questions = 0;
var mod = "";
var timeLeft = 0;
function displayQuiz() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('qid')){
        if(urlParams.get('uid')){
            switch (urlParams.get('m')) {
                case "level":
                    switch (urlParams.get('diff')) {
                        case "f":
                            displayQuizLivelloFacile();
                        break;
                        case "m":
                            displayQuizLivelloMedio();
                        break;
                        case "d":
                            displayQuizLivelloDifficile();
                        break;
                        default:
                            console.log(urlParams.get('diff'));
                            displayQuizError("Parametro di difficolta inserito non valido. Link invalido. Paramtetro inserito: " + urlParams.get('diff') + ", parametro aspettato f/m/d");
                        break;
                    }
                break;
                case "time":
                    displayQuizTime();
                break;
                case "progress":
                    displayQuizProgress();
                break;
                default:
                    displayQuizError("Parametro di modalita inserito non valido. Link invalido. Paramtetro inserito: " + urlParams.get('m') + ", parametro aspettato level/time/progress");
                    break;
            }
        }else{
            displayQuizError("Id utente mancante. Si prega di tronare alla pagina principale ed rieseguire il quiz");
        }
    }else{
        displayQuizError("Id quiz mancante. Si prega di tronare alla pagina principale ed rieseguire il quiz");
    }
}
function displayQuizError(errorDescription){
    document.getElementById('error').style.display = "block";
    document.getElementById('errorDescription').innerHTML = errorDescription;
}
function displayQuizLivelloFacile(){
    question = 10;
    var i = 0;
    do{
        var randomNumber = Math.floor(Math.random() * question);
        if(!array.includes(randomNumber)){
            array[i] = randomNumber;
            i++;
        }
    }while(array.length < question);
    db = "domandeF";
    displayQuestion();
    console.log(array);
}
function displayQuizLivelloMedio(){
    question = 20;
    var i = 0;
    do{
        var randomNumber = Math.floor(Math.random() * question);
        if(!array.includes(randomNumber)){
            array[i] = randomNumber;
            i++;
        }
    }while(array.length < question);
    db = "domandeM";
    displayQuestion();
    console.log(array);
}
function displayQuizLivelloDifficile() {
    question = 30;
    var i = 0;
    do{
        var randomNumber = Math.floor(Math.random() * question);
        if(!array.includes(randomNumber)){
            array[i] = randomNumber;
            i++;
        }
    }while(array.length < question);
    db = "domandeD";
    displayQuestion();
}
function displayQuizTime(){
    mod = "Time";
    displayQuizLivelloFacile();
    var timeleft = 60;
    var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            end();
        }
        document.getElementById("timeLeft").innerHTML = "" + timeleft;
        document.getElementById("progressBar").value = 60 - timeleft;
        timeleft -= 1;
    }, 1000);
}
function displayQuizProgress(){

}
function displayQuestion(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            const obj = JSON.parse(result);
            document.getElementById('id').value = obj.id;
            document.getElementById('questionDiv').innerHTML = obj.domanda;
            document.getElementById('R1').innerHTML = obj.risposta + document.getElementById('R1').innerHTML;
            document.getElementById('R2').innerHTML = obj.risposta1 + document.getElementById('R2').innerHTML;
            document.getElementById('R3').innerHTML = obj.risposta2 + document.getElementById('R3').innerHTML;
            document.getElementById('R4').innerHTML = obj.risposta3 +  document.getElementById('R4').innerHTML;
            xmlhttp.abort()
        }
    };
    console.log("Question: " + currentQuestion + "\nQuery: " + "https://timocoupek.ch/Modulo307/quiz/php/ajax.php?query=SELECT * FROM `" + db + "` WHERE id = " + array[currentQuestion]);
    xmlhttp.open("GET", "https://timocoupek.ch/Modulo307/quiz/php/ajax.php?query=SELECT * FROM `" + db + "` WHERE id = " + array[currentQuestion], true);
    xmlhttp.send();
}
function checkQuestion(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            if(document.getElementById('R1R').checked){
                var risposta = document.getElementById('R1').innerHTML;
                if(risposta.includes(result)){
                    domandeGiuste++;
                    console.log("giusta");
                }
            }
            if(document.getElementById('R2R').checked){
                var risposta = document.getElementById('R2').innerHTML;
                if(risposta.includes(result)){
                    domandeGiuste++;
                    console.log("giusta");
                }
            }
            if(document.getElementById('R3R').checked){
                var risposta = document.getElementById('R3').innerHTML;
                if(risposta.includes(result)){
                    domandeGiuste++;
                    console.log("giusta");
                }
            }
            if(document.getElementById('R4R').checked){
                var risposta = document.getElementById('R4').innerHTML;
                if(risposta.includes(result)){
                    domandeGiuste++;
                    console.log("giusta");
                }
            }
            resetQuestionDiv();
        }
    };
    xmlhttp.open("GET", "https://timocoupek.ch/Modulo307/quiz/php/ajax.php?altro=giusta&query=SELECT * FROM `"+ db + "` WHERE id = " + array[currentQuestion], true);
    xmlhttp.send();
}
function resetQuestionDiv(){
    if(currentQuestion < question -1 ){
        document.getElementById('R1').innerHTML = ' <input type="radio" name="radio" id="R1R">\n<span class="checkmark"></span> ';
        document.getElementById('R2').innerHTML = ' <input type="radio" name="radio" id="R2R">\n<span class="checkmark"></span> ';
        document.getElementById('R3').innerHTML = ' <input type="radio" name="radio" id="R3R">\n<span class="checkmark"></span> ';
        document.getElementById('R4').innerHTML = ' <input type="radio" name="radio" id="R4R">\n<span class="checkmark"></span> ';
        currentQuestion++;
        displayQuestion();
    }else{
        if(mod == "Time"){
            if(db == "domandeD"){
                end();
            }else if(db == "domandeM"){
                currentQuestion = 0;
                displayQuizLivelloDifficile();
            }else{
                currentQuestion = 0;
                displayQuizLivelloMedio();
            }
        }else{
            end();
        }
    }
}
function nexQuestion(){
    checkQuestion();
}
function end(){
    document.getElementById('questionDiv').innerHTML = "Le tue risposte giuste sono: " + domandeGiuste;
    document.getElementById('R1').style.display = "none";
    document.getElementById('R2').style.display = "none";
    document.getElementById('R3').style.display = "none";
    document.getElementById('R4').style.display = "none";
}