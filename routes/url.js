const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/url');

// @route       POST /api/url/shorten
// @desc        create short url
router.post('/shorten', async (req, res) =>{
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');

    // check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }

    // create url code
    const urlCode = shortid.generate()

    // check long url
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});

            if(url){
                res.json(url);
            }else{
                const shortUrl = req.protocol + '://' + req.get('host') + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    }else{
        res.status(401).json('Invalid long url');
    }
})

module.exports = router;