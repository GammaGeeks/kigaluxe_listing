/* eslint-disable require-jsdoc */
import { Sequelize } from "sequelize"
import propertiesDB from "../utils/db/propertiesDB"
import paginator from "../utils/paginator"
import placeDB from "../utils/db/placeBD"
import s3_helper from "../utils/s3_helper"

async function searchController(req, res) {
  const array = await propertiesDB.getAllProperties()
  const catHolder = array.map((element, index) => index)
  let { location, property_type, price, property_size, isForSale, isForRent } = req.query
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
  if (!property_type) {
    property_type = catHolder
  } else {
    property_type = property_type.slice(1, -1).split(',').map(Number)
  }
  if (!price) {
    price = [1, 1000000000]
  } else {
    price = price.slice(1, -1).split(',').map(Number)
  }
  if (!property_size) {
    property_size = [1, 1000000000]
  } else {
    property_size = property_size.slice(1, -1).split(',').map(Number)
  }
  if (!isForSale) isForSale = true
  if (!isForRent) isForRent = true
  let results = await propertiesDB.searchProperty(location, property_type, price, property_size, isForSale, isForRent)
  const urls = await Promise.all(
    results.map(async (prop) => {
      const shortUrls = await Promise.all(
        prop.imageIds.map((imageId) => s3_helper.newLevelUrl(imageId))
      );
      return shortUrls;
    })
  );
  results = results.map((prop, index) => {
    const { id, title, userId, imageIds, details, hasParking, isLand, shareIds, bedrooms,
      bathrooms, hasPool, appliances, yearBuilt, AC, isSold, createdAt, updatedAt } = prop;
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
      createdAt,
      updatedAt
    };
  })
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  res.status(200).json({
    status: 200,
    message: "search completed successfully",
    data: paginator(results, page, limit)
  })
}

export default searchController
