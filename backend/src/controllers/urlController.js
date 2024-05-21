import asyncHandler from "express-async-handler";
import ShortUrl from '../models/urlModel.js'


// @desc    Cget all urls
// @route   url /getUrls
// @access  Public

export const getUrlsController = asyncHandler(async (req, res) => {

    const { userId } = req.params;
    const Urls = await ShortUrl.find({user:userId});
    res.status(200).json(Urls);
  });


// @desc    Creating a new Short Url
// @route   url /shortenUrl
// @access  Public

export const createShortUrlController = asyncHandler(async (req, res) => {

  const { fullUrl, userId } = req.body;
  console.log(fullUrl, userId)
  const Urls= await ShortUrl.create({fullUrl,user:userId});
  console.log(Urls)
  res.status(200).json(Urls);
});


// @desc    Controller to redirect to the full Url 
// @route   url /redirectUrl
// @access  Public

export const redirectUrlController = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  console.log(shortUrl);

  const urlDoc = await ShortUrl.findOne({ shortUrl });
  console.log(urlDoc);
  if (!urlDoc) {
    res.status(404);
    throw new Error("URL Not Found");
  }

  const fullUrl = urlDoc.fullUrl.startsWith('http://') || urlDoc.fullUrl.startsWith('https://')
    ? urlDoc.fullUrl
    : `http://${urlDoc.fullUrl}`;

  res.status(200).redirect(fullUrl);
});
  
  
  // @desc    Controller to Remove a URl
// @route   url/removeUrl
// @access  Public

export const removeUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params;
  console.log(shortUrl);

  const urlDoc = await ShortUrl.deleteOne({ shortUrl });

  res.status(200).json({message:'URL removed successfully'});
});
  