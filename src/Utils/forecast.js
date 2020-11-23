const request = require("request");

const forecast = (latitude,longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5b06735b55a53b3118c8cedd113107d6&query=" +
    encodeURIComponent(latitude) + ',' +encodeURIComponent(longitude)
    +"&units=f";

  request({ url,json:true}, (error, response) => {
    // const data = JSON.parse(response.body);
    if (error) {
    // Need to be fix
        callback("unable to connect to location services", undefined);
    } else if (response.body.error) {
        // If problems with co-ordinates.
      callback("unable to find location.", undefined);
    } else {
      
      callback(undefined,
        response.body.current.weather_descriptions[0]+ ' it is currently ' +response.body.current.temperature+ ' degrees out. It fells like'
        + response.body.current.feelslike + ' degrees out. The humidity is ' + response.body.current.humidity +'%'
    );
    }
  });
};

module.exports = forecast;

 // Need a change (error,{body}) object destructring
  // Instead of using response.bosy.features we will use body.features
