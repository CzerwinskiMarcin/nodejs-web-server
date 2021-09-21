const path = require('path');
const fs = require('fs');
const express = require('express');
const hbs = require('express-hbs');
const {geocode} = require('../utils/geocode');
const {openWeather} = require('../utils/openweather');

const publicPath = path.join(__dirname, '..', 'public');
const templates = path.join(__dirname, '..', 'templates');
const viewsPath = path.join(templates, 'views');
const partialsPath = path.join(templates, 'partials');

const app = express();
const port = process.env.PORT || 3000;

app.engine('hbs', hbs.express4({
    partialsPath: partialsPath
}))

app.set('view engine', 'hbs');
app.set('views', viewsPath);

const navigations = fs.readFileSync(path.join(partialsPath, 'navigation.hbs'));
const header = fs.readFileSync(path.join(partialsPath, 'header.hbs'));

hbs.registerPartial('navigation', navigations.toString());
hbs.registerPartial('header', header.toString());

app.use(express.static(publicPath));

app.get('', (req, res) => {
    return res.render('');
});

app.get('/weather', (req, res) => {
    const {location} = req.query;

    if (!location) {
        return res.send({
            error: 422,
            message: 'You must provide location'
        })
    }

    geocode(location, (err, result) => {
        if (err) {
            return res.send(err);
        }

        const {longitude, latitude} = result;

        openWeather(longitude, latitude, (err, result) => {
            if (err) {
                return res.send(err);
            }

            return res.send(result);
        });
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
