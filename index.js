
const express = require('express')

const request = require('request')

const app = express()

const PORT = 4000

const apikey = "746e111fd085f65c79b3354c6554dc6f"

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null })
})

app.post('/', (req, res) => {
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: "Error in fetching weather of city" })
        }
        else {
            let weather = JSON.parse(body)

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error,please try again' });
            }
            else {
                console.log(weather)
                let weatherText = `It's ${fToC(weather.main.temp)} degree Celcius Temperature in ${city}`
                res.render('index', { weather:weatherText, error: null })
            }
        }
    })
})

function fToC(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = Math.round((fTemp - 32) * 5 / 9);
    var message = fToCel + '\xB0C.';    
    return message
}


app.listen(PORT, () => {
    console.log("app is listening on port 4000")
})