const http = require("http");
// const { exec } = require('child_process');
const { readFile, writeFile, appendFile } = require("fs");
const chalk = require('chalk');
const { insertData, findData, deleteData } = require("./db.js")
const { parse } = require('querystring');


http.createServer( (request, response) => {
	let { url, method } = request;
  if(url === '/') {
    readFile('src/index.html', (_, data) => {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write(data)
      response.end();
    })
  }
  if(url === '/contacts') {
    response.writeHead(200, {
      'Content-Type' : 'application/json'
    });
   findData().then((data) => {
    response.write(JSON.stringify(data));
    response.end();
   });
  }
  if(method === 'POST') {
    let body = '';
    request.on('data', (chunk) => {
      body = parse(chunk.toString());
    });
    request.on('end', () => {
      insertData(body);
      response.write('Saved successfully');
      response.end();
    });
  }
  if(method === 'DELETE') {
    deleteData();
    response.write('Deleted successfully');
    response.end();
  }
}).listen(8080, () => {
  console.log(chalk.green("Server is running in port 8080"));
});