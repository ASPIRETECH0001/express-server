const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// configure view engine
app.set('view engine', 'hbs');

app.use((req, res, next) => {

    const date = new Date().toString();
    const log = `${date}: ${req.method} on ${req.url}`;

    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('server.log file did not open', error);
        }
    });

    next();
});

// configure middleware
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('home.hbs', {
       welcomeMessage: 'Welcome text',
       pageTitle: 'My home page'
   })
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/projects', (req, res) => {
   res.render('projects.hbs', {
       pageTitle: 'My projects page'
   });
});

app.get('/bad', (req, res) => {
    res.status(500);

    res.send({
        errorMessage: 'This is an error message'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});