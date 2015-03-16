/*
* Carrega as informações da página "Home"
**/
function loadHome(){  
    getNews();
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

    // executa esta função a cada 1 minuto ou o caso o usuário solicitar a atualização
}

/*
* Carrega as informações da página "Notícia"
**/
function loadNews(){ 

}

/* 
* Carrega as informações da página "Categorias"
**/
function loadCategories(){

}

function loadPage(page){ 
    showLoading(); 
   
    page = (typeof page !== 'undefined') ? page : "home";

    if(page == "home"){
        loadHome();
    }

    if(page == "news"){
        loadNews();
    }

    if(page == "categories"){
        loadCategories();
    }

    hideLoading(); 
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

document.addEventListener("deviceready", onDeviceReady, false);
   
var db;  
function onDeviceReady(){   
    db = window.sqlitePlugin.openDatabase({name: "my.db"});
    db.transaction(populateDB, errorDB, successDB);
     
    loadPage();
}