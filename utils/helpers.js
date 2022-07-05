const fs = require('fs');

//generate a random 12-character ID
const makeId = () => {
    let ID = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( var i = 0; i < 12; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
}
  
const format_url = (req, res, next )=> {
    const imgUrlId = makeId();
    const imgUrl = `public/images/${imgUrlId}`;
    // const draw_url = req.body.draw_url;

    // strip off the data: url prefix to get just the base64-encoded bytes
    const data = req.body.draw_url.replace(/^data:image\/\w+;base64,/, "");

    // const buf = Buffer.from(data, "base64");
    fs.writeFile(imgUrl, data, (err) => {
        if(err) {
            console.log(err);
            return;
        }
        else {
            console.log('File created!');
            req.body.draw_url = imgUrl;
            next();
        }
    });

}
const unformat_url = (dbPostData) => {
    // take draw_url from get request
    let fileName = dbPostData.draw_url.split("/")[2];
    fs.readFile(`./public/images/${fileName}`, 'base64', (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        else {
            req.body.draw_url = data;
            console.log("Here's your data");
            console.log(data);
        }
    });
}
module.exports = { format_url, unformat_url };