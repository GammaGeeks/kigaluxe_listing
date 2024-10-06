/* eslint-disable require-jsdoc */
import { Sequelize } from "sequelize"
import propertiesDB from "../utils/db/propertiesDB"
import paginator from "../utils/paginator"
import placeDB from "../utils/db/placeBD"
import s3_helper from "../utils/s3_helper"
import categoryDB from "../utils/db/categoryDB"

async function searchController(req, res) {
  /*
      initializing variables from the user or queries
  */
  let { location, property_type, price, property_size, isForSale, isForRent } = req.query

  /*
      handling the cases when use didn't pass anything aka default values
  */

  // setting default location value
  if (!location) {
    location = ['a', 'i', 'u', 'e', 'o']
    location = await placeDB.searchThrough(location)
    location = location.map((place) => place.id)
  } else {
    location = [location]
    location = await placeDB.searchThrough(location)
    if (location.length !== 0) {
      location = location.map((place) => place.id)
    } else {
      return res.status(404).json({
        status: 404,
        error: `no properties found in that location`
      })
    }
  }

  /*
      setting default values for property_type
      by default we have to pass all categories
  */
  const array = await categoryDB.getAllCategories()
  const catHolder = array.map((element) => element.id)
  if (!property_type) {
    property_type = catHolder
  } else {
    /*
     since we pass as an array like [2,7,9]
     and it reaches to the server looking like "[2,7,9]"
     we have to slice those "" so that we remain with an the actual array
     instead of an array inside a string
    */
    property_type = property_type.slice(1, -1).split(',').map(Number)
  }

  // setting default price value
  if (!price) {
    /*
      by default we have to set as bigger number as possible to
      ensure that all properties will be included
    */
    price = [1, 1000000000]
  } else {
    /*
    we have to slice a received to get the actual array to pass in filter
    then convert it to numbers instead of using strings
    */
    price = price.slice(1, -1).split(',').map(Number)
  }

  // setting default values for property_size
  if (!property_size) {
    /*
      by default we have to set as bigger number as possible to
      ensure that all properties will be included
    */
    property_size = [1, 1000000000]
  } else {
    /*
    we have to slice a received to get the actual array to pass in filter
    then convert it to numbers instead of using strings
    */
    property_size = property_size.slice(1, -1).split(',').map(Number)
  }

  if (!isForSale) isForSale = true // setting isForSale to be true by default

  if (!isForRent) isForRent = true // setting isForRent to be true by default

  // results var holds the searched data
  let results = await propertiesDB.searchProperty(location, property_type, price, property_size, isForSale, isForRent)

  // we have to exit the function if no search found
  if (results.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "no property found"
    })
  }

  /*
  - we have to generate an array of urls then append it to results later
  - we use to maps because imageIds in an array which is inside another array
  so first map access the parent array as results is an array then the second one
  is to access the imageIds array
  */
  const urls = await Promise.all(
    results.map(async (prop) => { // accessing parent array "results"
      const shortUrls = await Promise.all(

        // accessing the imageIds array
        prop.imageIds.map((imageId) => s3_helper.newLevelUrl(imageId))
      );
      return shortUrls;
    })
  );

  // now we are going to add urls to the searched data
  results = results.map((prop, index) => {
    const { id, title, userId, imageIds, details, hasParking, isLand, shareIds, bedrooms,
      bathrooms, hasPool, appliances, yearBuilt, AC, isSold, YTUrl, createdAt, updatedAt } = prop;
    const price1 = prop.price
    const property_size1 = prop.property_size
    const property_type1 = prop.property_type
    const isForSale1 = prop.isForSale
    const isForRent1 = prop.isForRent
    const location1 = prop.location
    return {
      id,
      title,
      userId,
      imageIds,
      imageUrl: urls[index],
      details,
      price: price1,
      property_type: property_type1,
      property_size: property_size1,
      hasParking,
      isForSale: isForSale1,
      isForRent: isForRent1,
      isLand,
      location: location1,
      shareIds,
      bedrooms,
      bathrooms,
      isSold,
      hasPool,
      appliances,
      yearBuilt,
      AC,
      // rates: rates[index],
      YTUrl,
      createdAt,
      updatedAt
    };
  })

  const page = req.query.page || 1 // setting page to be one by default
  const limit = req.query.limit || 5 // setting limit to be 5 by default
  res.status(200).json({
    status: 200,
    message: "search completed successfully",
    data: paginator(results, page, limit)
  })
}

export default searchController
