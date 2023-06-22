const http = require('http');

const server = http.createServer((req, res) => {
    // url , method, data => payload , file , headers 
    let url = req.url;
    let method = req.method;
    console.log(method, url)
    
    if(method === 'GET' && url === '/'){
        res.end("Home page ")
    } else if(method === 'GET' && url === '/about'){
        res.end("About Page")
    } else {
        // res.statusCode(404);
        res.end("Not found!!")
    }
})

server.listen(3005, "localhost", (err) => {
    if(err) {
        console.log("Error Listening to port...")
    } else {
        console.log("Server is listening to port 3005")
        console.log("Press CTRL+C to disconnect server")
    }
})