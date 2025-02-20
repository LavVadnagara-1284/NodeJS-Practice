const path = require('path'); // Note: this is the package that will help with managing the paths for the files
const express = require('express'); // Note: this is the main framework that will be used by all utilities throughout the application
const bodyParser = require('body-parser'); // Note: this is the package that will be used to parse the incoming requests into a single object that will be sent to the server

const app = express(); // Note: this is the function that will create the express application also this variable will contain the path to the express application that the utilities will be running under and will be used to create the express application

app.set('view engine', 'ejs'); // Note: this tells the express to use the EJS engine for rendering the views
app.set('views', 'views'); // Note: This Specifics that the views are stored in the views folder

const adminRoutes = require('./routes/admin'); // Note: this handles the admin routes and look for the admin.js file in the routes folder
const shopRoutes = require('./routes/shop'); // Note: this handles the shop routes and look for the shop.js file in the the routes folder
const pg404Routes = require('./routes/404'); // Note: this handles the error page routes and look foe the 404.js file in the routes folder

app.use(bodyParser.urlencoded({ extended: false })); // Note: this parses the form data
app.use(express.static(path.join(__dirname, 'public'))); // Note: this serves the static files

app.use('/admin', adminRoutes); // Note: 
app.use(shopRoutes);
app.use(pg404Routes);

app.listen(3000); // Note: this starts the express server on the port 3000
