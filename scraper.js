const request = require('request-promise')
const cheerio = require('cheerio');


var info = []; 
var query = "book"
const infotime = async () => {
    const response = await request({
        uri: "https://www.amazon.in/s?k=" + query,
        headers:{
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9"
        },
        gzip: true,
    })
    
    let $ = cheerio.load(response)
    
    //TITLE SCRAPING
    let prod_names = $('span[class="a-size-medium a-color-base a-text-normal"]')
    //SO THIS UP HERE RETURNS A BIG OBJECT OF OBJECTS. The Children key has an array with the text content for each search result
   
    let title1 = prod_names["0"].children[0].data
    let title2 = prod_names["1"].children[0].data
    let title3 = prod_names["2"].children[0].data
    
    //PRICE SCARPING
    let prod_prices = $('span[class="a-price-whole"]')
    
    let price1 = prod_prices["0"].children[0].data
    let price2 = prod_prices["1"].children[0].data
    let price3 = prod_prices["2"].children[0].data
    
    
    //Review SCARPING
    let reviews = $('span[class="a-icon-alt"]') 
      
    let review1 = reviews["0"].children[0].data
    let review2 = reviews["1"].children[0].data
    let review3 = reviews["2"].children[0].data
    
   
   
    let deetailz1 = []
    let deetailz2 = []
    let deetailz3 = []
    deetailz1.push(title1,price1,review1)
    deetailz2.push(title2,price2,review2)
    deetailz3.push(title3,price3,review3)
    info = {

        product_1: deetailz1,
        product_2: deetailz2,
        product_3: deetailz3
    }
    console.log(info) 
   
    
}
infotime();
//commit test
