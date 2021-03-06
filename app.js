var http = require('http');
var fs = require('fs')
var htmlparser2 = require('htmlparser2')
const express = require('express')
const app = express()
var path = require('path');


app.use(express.urlencoded());
app.use(express.json());
//app.use('/assets', express.static('assets'))
app.use(express.static('assets'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})
//listening for the front page
app.get('login.html', function(req, res) {
    res.sendFile(path.join(__dirname + 'virtualnotebook/login.html'));
})
//listening for the admin login
app.get('/user.html', function(req, res) {
    res.sendFile(path.join(__dirname + 'virtualnotebook/user.html'));
})
//listening for the base user page


app.post('/', function(request,response){
    console.log(request.body.user.name);
    console.log(request.body.user.password);
    if (authorize(request.body.user.name,request.body.user.password)== true){
        response.sendFile(path.join(__dirname + 'virtualnotebook/admin.html'));
    }else{
        response.sendFile(path.join(__dirname + 'virtualnotebook/login.html'));
    }
    
        
})
//logging the username and password inputted

function authorize(name, password){
    var test = [];
    var matches = false
    test.push(name);
    test.push(password);
    console.log(test)
   

        if(test[0]=='user'&&test[1]=='password'){
            var matches = true;
            
        }
        
    
    return(matches)
}
//login for admin
app.get('/folders', function(req,res){
    var file_arr = []
    fs.readdirSync(path.join(__dirname + '/folders')).forEach(file =>
        file_arr.push(file))
        res.sendFile(path.join(__dirname + '/folderbasic.html'));
        
        
})

app.get('/virtualnotebook', function(req,res){
    res.sendFile(path.join(__dirname + '/virtualnotebook/virtualnotebook.html'))
})

app.get('/portfolio', function(req,res){
    res.sendFile(path.join(__dirname + '/portfolio/portfolio.html'))
})
app.listen(80);