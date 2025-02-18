# Node.js HTTP Server Notes

## Overview
This code creates an HTTP server using Node.js, modularizing the request handling into a separate `routes.js` file. It also uses `nodemon` for automatic server restarts.

## File Structure
```
node-programs/
│-- app.js
│-- routes.js
│-- package.json
```

## **app.js** (Main Server File)
```js
const http = require('http');
const routes = require('./routes.js'); // Importing routes.js

console.log(routes.someText); // Logging text from routes.js

const server = http.createServer(routes.handler); // Using the exported request handler

server.listen(3000); // Server listens on port 3000
```

### **Explanation:**
1. `const http = require('http');` → Imports Node.js `http` module to create the server.
2. `const routes = require('./routes.js');` → Imports the `routes.js` file.
3. `console.log(routes.someText);` → Logs a text string from `routes.js`.
4. `const server = http.createServer(routes.handler);` → Uses the exported request handler from `routes.js`.
5. `server.listen(3000);` → Starts the server on port 3000.

## **routes.js** (Route Handling Logic)
```js
const fs = require('fs'); // Importing File System module

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body> <h1>Hello!</h1> <form action="/message" method="POST"><input type="text" name="message"><button type="submit" >Send</button></form> </body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('JS-Practice-Projects-and-Tasks/Node-Programs/message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from the Node.js</h1></body>');
    res.write('</html>');
    res.end();
};

// Different Ways to Export in Node.js

// 1st way to export (Direct Export)
// module.exports = requestHandler; 
// Exports the function directly.

// 2nd way to export (Exporting an Object)
// module.exports = {
//     handler: requestHandler,
//     someText: 'Hello from routes.js with app.js'
// };
// Exports an object with multiple properties.

// 3rd way to export (Attaching to module.exports)
// module.exports.handler = requestHandler;
// module.exports.someText = 'Hello from routes.js with app.js';
// Exports properties individually.

// 4th way to export (Using exports shorthand)
exports.handler = requestHandler;
exports.someText = 'Hello from routes.js with app.js';
// This is equivalent to attaching properties to module.exports.
```

### **Explanation:**
1. `const fs = require('fs');` → Imports the `fs` module to handle file operations.
2. `const requestHandler = (req, res) => {}` → Defines a function to handle incoming HTTP requests.
3. `const url = req.url;` and `const method = req.method;` → Retrieve the request URL and HTTP method.
4. **Handling the `/` route:**
   - Sends an HTML form to enter a message and submit it to `/message`.
5. **Handling the `/message` route (POST method):**
   - Listens for incoming data chunks (`req.on('data')`).
   - Converts buffered data into a string.
   - Extracts the message from the request body.
   - Writes the message to `message.txt` asynchronously (`fs.writeFile`).
   - Redirects to `/` after saving.
6. **Default Response:**
   - If no matching route is found, returns an HTML page with a message.
7. **Export Methods Explanation:**
   - Shows different ways to export modules in Node.js.

## **package.json** (Project Configuration)
```json
{
    "name": "node-programs",
    "version": "1.0.0",
    "description": "This code creates an HTTP server using Node.js that handles different routes and methods, processes form data, and writes to a file asynchronously.",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon app.js",
        "start-server": "nodemon app.js"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "nodemon": "^3.1.9"
    }
}
```

### **Explanation:**
1. **Project Metadata:**
   - `"name": "node-programs"` → Name of the project.
   - `"version": "1.0.0"` → Version of the project.
   - `"description":` → Describes the functionality of the project.
2. **Main Entry File:**
   - `"main": "app.js"` → Specifies `app.js` as the main file.
3. **Scripts:**
   - `"start": "nodemon app.js"` → Starts the server using `nodemon`.
   - `"start-server": "nodemon app.js"` → Another alias for starting the server.
4. **Dependencies:**
   - `"devDependencies"` → Includes `nodemon` for automatic server restarts.

---
## **Key Takeaways:**
1. The server logic is separated into `routes.js` for modularity.
2. Request handling follows best practices, handling form data and writing to a file asynchronously.
3. Multiple export methods are demonstrated in `routes.js`.
4. The project uses `nodemon` for automatic restarts, improving the development workflow.
