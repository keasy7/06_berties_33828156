// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

// Handle our routes
router.get('/',function(req, res, next){
        // console.log("Fetching weather data")
        let apiKey = '994d7903de0f200dba4661f43be2daf8'
        let city = req.query.weather_city || 'london' //defaults to london if no city given
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        // console.log(url)             
        request(url, function (err, response, body) {
          if(err){
            next(err)
          } else {
            // res.send(body)
            var weather = JSON.parse(body)
            if (weather.main == undefined){ //error handling
                var wmsg = 'City not found. Please try again.'
                res.render('weather.ejs', {wmsg: wmsg});
                return
            }
            var wmsg = 'It is '+ weather.main.temp + 
            ' degrees in '+ weather.name +
            '! The humidity now is: ' + 
            weather.main.humidity;
            res.render('weather.ejs', {wmsg: wmsg});

          } 
        });
        //api error handling tests usually conducted using cURL or Postman. cURL runs a variety of test through the command line that tracks how apis transfer data. Postman is a GUI application that allows similar testing of APIs.

});

module.exports = router