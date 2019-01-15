function loadDoc(){

    loadFile("tekst.txt", setDiv);
}


function loadFile(path, callback){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            callback(this);
        }
    };
    // add argument to avoid cached result (?)
    xhttp.open("GET", path, true);
    xhttp.send();
}

function setDiv(xhttp){
    document.getElementById("demo").innerHTML += xhttp.responseText + "<br/>";

    console.log(xhttp.getResponseHeader("Last-Modified"));
}

function setTable(xhttp){
    
    var xmlDoc = xhttp.responseXML;
    var table = "<table border=1><tr><th>Title</th><th>Artist</th></tr>";

    var elements = xmlDoc.getElementsByTagName("CD");
    
    for(var i = 0; i < elements.length; i++){
        table += "<tr>";
        table +="<td>" + elements[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue + "</td>";
        table +="<td>" + elements[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue + "</td>";
        table += "</tr>";
    }
        table += "</table>"
    
    
    document.getElementById("demo").innerHTML = table;
}

function getCDs(){

    loadFile("catalog.xml", setTable);

}

var idx = 0;

function next(){
    idx++;
    loadFile("catalog.xml", setSingle);
}

function prev(){
    idx--;
    loadFile("catalog.xml", setSingle);
}

function setSingle(xhttp){
    var xml = xhttp.responseXML;
    var elements = xml.getElementsByTagName("CD");
    var single = elements[idx].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue + "<br/>";
    single += elements[idx].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;

    document.getElementById("demo").innerHTML = single;
}
