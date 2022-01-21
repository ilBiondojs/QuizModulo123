function checkMod() {
    var mod = 0;
    if(document.getElementById('modL').checked){
        document.getElementById('levelDiv').style.display = "Block";
        if(document.getElementById('diffF').checked){
            mod = 11;
        }else if(document.getElementById('diffM').checked){
            mod = 12;
        }else{
            mod = 13;
        }
    }else if(document.getElementById('modT').checked){
        mod = 20;
        document.getElementById('levelDiv').style.display = "none";
    }else{
        mod = 30;
        document.getElementById('levelDiv').style.display = "none";
    }
    setDescription(mod);
}
function setDescription(key) {
    var doc = "";
    switch (key) {
        case 11:
            doc = "Dieci domande a cui rispondere senza nessun tempo limite";
            break;
        case 12:
            doc = "Da dieci a venti domanda a cui rispondere senza nessun tempo limite";
            break;
        case 13:

            break;
        case 20:

            break;
        case 30:

            break;
    }
    document.getElementById('descriptionBodyDiv').innerHTML = doc;
}
function startTheQuiz() {
    if(document.getElementById('modL').checked){
        document.getElementById('levelDiv').style.display = "Block";
        if(document.getElementById('diffF').checked){
            window.location.href = "quiz/?m=level&diff=f&qid=" + Math.floor(Math.random() * (3000 - 1500) + 1500) + "&uid=" + Math.floor(Math.random() * (6000 - 4000) + 4000);
        }else if(document.getElementById('diffM').checked){
            window.location.href = "quiz/?m=level&diff=m&qid=" + Math.floor(Math.random() * (3000 - 1500) + 1500) + "&uid=" + Math.floor(Math.random() * (6000 - 4000) + 4000);
        }else{
            window.location.href = "quiz/?m=level&diff=d&qid=" + Math.floor(Math.random() * (3000 - 1500) + 1500) + "&uid=" + Math.floor(Math.random() * (6000 - 4000) + 4000);
        }
    }else if(document.getElementById('modT').checked){
        window.location.href = "quiz/?m=time&qid=" + Math.floor(Math.random() * (3000 - 1500) + 1500) + "&uid=" + Math.floor(Math.random() * (6000 - 4000) + 4000);
        document.getElementById('levelDiv').style.display = "none";
    }else{
        window.location.href = "quiz/?m=progress&qid=" + Math.floor(Math.random() * (3000 - 1500) + 1500) + "&uid=" + Math.floor(Math.random() * (6000 - 4000) + 4000);
        document.getElementById('levelDiv').style.display = "none";
    }
}