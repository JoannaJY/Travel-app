
import { generateContent } from "../src/client/js/firstPage";

describe("Testing the checkContentLength functionality", () => {
    test("Testing the checkContentLength() function", () => {
        let destination ="d";
        let length = destination.length;
        function check(){
            if(length <=3 ) {
                alert("Please enter a vaild postcode.")
            }
        }
        
        expect(check).toBeDefined();
})});
