/*
* Carrega as informações da página "Home"
**/
function loadHome(){  
    alert("ok");
}

function getNews(){
    db.transaction(function(tx) { 
        tx.executeSql("INSERT INTO news (id, title, thumb) VALUES (?,?,?)", [01, "Teste", "thumb/1.jpg"]);

        tx.executeSql("SELECT * FROM news ORDER BY id DESC LIMIT 1;", [], function(tx, res){
            var lastID = res.rows.item(0).id;
  

            alert(lastID);

            // busca novas noticias no servidor REMOTO
            // grava as noticias novas no SQLLITE
            // adiciona as noticias novas na HOME     
        });              
    });

    // executa esta função a cada 1 minuto ou caso o usuário solicitar a atualização
}

/*
* Carrega as informações da página "Notícia"
**/
function loadNews(){ 

}

/* 
*   Carrega as informações da página "Categorias"
**/
function loadCategories(){

}

function showLoading(){
    $("#loading").fadeIn(); 
}

function hideLoading(){
    $("#loading").fadeOut();
}

function populateDB(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, title TEXT, thumb TEXT)');
}
 
function errorDB(error){
    alert("ERROR: " + error);
}

function successDB(){ 
    // sucesso
}
  
function slide(direction) {
    var options = {
        "direction"        : direction,
        "duration"         :  500,
        "slowdownfactor"   :    3,
        "iosdelay"         :  100,
        "androiddelay"     :  150,
        "winphonedelay"    :  250,
        "fixedPixelsTop"   :    0,
        "fixedPixelsBottom":   60  
    };
    
    window.plugins.nativepagetransitions.slide(
        options,
        function (msg) {},   
        function (msg) {} 
    );
}   

function flip(direction){
    var options = {
        "direction"      : direction,
        "duration"       :  600,
        "iosdelay"       :   50,
        "androiddelay"   :  100,
        "winphonedelay"  :  150
    };
        
    window.plugins.nativepagetransitions.flip(
        options,
        function (msg) {},
        function (msg) {}  
    );
}
   
document.addEventListener("deviceready", onDeviceReady, false);

var db;  
function onDeviceReady(){   
    db = window.sqlitePlugin.openDatabase({name: "my.db"});
    db.transaction(populateDB, errorDB, successDB);
}