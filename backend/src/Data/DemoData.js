const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://truyenfull.tv/truyen-tien-hiep/';

const ComicData = [];

async function getHTML() {
    const { data: html } = await axios.get(url);
    return html;
};

getHTML().then((res) => {
    const $ = cheerio.load(res);
    $('.row').each((i, moive) => {
        const title = $(moive).find('.truyen-title').text();
        const author = $(moive).find('.glyphicon glyphicon-pencil').text();
        const chuong = $(moive).find('.glyphicon glyphicon-list').text();
        ComicData[title] = author;
    });
    fs.writeFile('movieData.json', JSON.stringify(ComicData), (err) => {
        if (err) throw message.err;
        console.log('file succesfully save')
    })
});