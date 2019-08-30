const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

app.get('/screenshot', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
    const screenshotBuffer = await page.screenshot({path: 'example.png'});

    // Respond with the image
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length
    });
    res.end(screenshotBuffer);

    await browser.close();
})

app.listen(4000);