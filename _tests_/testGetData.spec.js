import getData from "../src/server/server";
const axios = require('axios');

describe("get location data", () => {
    test("it should get status 200", async() => {
      const geonames_url = "http://api.geonames.org/searchJSON?q=london&maxRows=10&username=zyy314jh";
      
      let res = await axios.post(geonames_url);
  
      expect(res.data.geonames[0].name).toEqual("London")
    });
  });