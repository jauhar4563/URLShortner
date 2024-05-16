import asyncHandler from "express-async-handler";
import shortUrl from '../models/urlModel.js'


// @desc    Cget all urls
// @route   USER /getUrls
// @access  Public

export const getUrlsController = asyncHandler(async (req, res) => {

    const { userId } = req.params;
    const Urls = await shortUrl.find({user:userId});
    res.status(200).json(Urls);
  });


// @desc    Creating a new Short Url
// @route   USER /shortenUrl
// @access  Public

export const createShortUrlController = asyncHandler(async (req, res) => {

  const { fullUrl, userId } = req.body;
  await shortUrl.create({fullUrl,user:userId});
  const Urls = await shortUrl.find({});

  res.status(200).json(Urls);
});


// @desc    Controller to redirect to the full Url 
// @route   USER /redirectUrl
// @access  Public

export const redirectUrlController = asyncHandler(async (req, res) => {

    const { shortUrl } = req.params;
    const Url = await shortUrl.find({shortUrl});
    if(Url==null){
        throw new Error("URL Not Found")
    }
  
    res.status(200).redirect(Url.fullUrl);
  });
  
  
  