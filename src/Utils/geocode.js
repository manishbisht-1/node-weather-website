// S/6-P/36

const request=require('request');

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiamV5ZWhhIiwiYSI6ImNraGx2MmZ6YjA0ZGEycWw5M3Y0YWtmZzgifQ.ibHL8k8XyoSDZFDqg28VRQ&limit=3";
  
    request({ url,json:true}, (error, response) => {
      // const data = JSON.parse(response.body)
      if (error) {
        // This need  to fix.
        callback("unable to connect to location services", undefined);
      } else if (response.body.features.length === 0) {
        callback("unable to find location,Try another search", undefined);
      }else{
        callback(undefined,{
          latitude:response.body.features[0].center[1],
            longitute:response.body.features[0].center[0],
            location:response.body.features[0].place_name
          })
      }
    });
  };

  module.exports=geocode;

  // Need a change (error,{body}) object destructring
  