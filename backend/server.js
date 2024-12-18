// // https://www.npmjs.com/package/express
// const express = require('express');

// // https://www.npmjs.com/package/cors
// const cors = require('cors');

// // https://www.npmjs.com/package/mongoose
// const mongoose = require('mongoose');

// // const bodyParser = require('body-parser');
// const app = express();

// // ------------------------ View ------------------------ //


// // ------------------------ Router ------------------------ //


// // ------------------------ Use app ------------------------ //
// app.use(cors());
// app.use(express.json());

// // ------------------------ Use view ------------------------ //


// // ------------------------ Use router ------------------------ //



// // ------------------------ Connect database ------------------------ //

// const dataConnect = "mongodb://localhost:27017/comic";
// const port = 9999;

// mongoose.connect(dataConnect)
//     .then(() => {
//         app.listen(port, () => {
//             console.log('[Status] Run on port:', port);  // Localhost
//         });
//         console.log(`[Status] Connected to server: ${dataConnect}`);   // Database
//     })
//     .catch((err) => {
//         console.log("[Status] CAN'T CONNECTED TO SERVER  ERROR: " + err.message + "");
//     });
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://truyenfull.tv/truyen-tien-hiep/';

const ComicData = [];

async function getHTML() {
    try {
        const { data: html } = await axios.get(url);
        return html;
    } catch (error) {
        console.error("Error fetching HTML:", error.message);
    }
};

getHTML().then((res) => {
    if (!res) {
        console.error("Failed to fetch HTML content.");
        return;
    }

    const $ = cheerio.load(res);

    $('.row').each((i, element) => {
        const title = $(element).find('.truyen-title').text().trim();
        const author = $(element).find('.glyphicon-pencil').parent().text().trim(); // Adjust based on correct structure
        const chuong = $(element).find('.glyphicon-list').parent().text().trim();  // Adjust based on correct structure

        if (title) {
            ComicData.push({ title, author, chuong });
        }
    });

    if (ComicData.length === 0) {
        console.error("No data extracted. Check selectors and website structure.");
        return;
    }

    fs.writeFile('ComicData.txt', JSON.stringify(ComicData, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err.message);
        } else {
            console.log('File successfully saved as ComicData.json');
        }
    });
});
