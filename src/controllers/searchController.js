/* eslint-disable require-jsdoc */
import { Sequelize } from "sequelize"
import propertiesDB from "../utils/db/propertiesDB"
import paginator from "../utils/paginator"

async function searchController(req, res) {
  const array = await propertiesDB.getAllProperties()
  const catHolder = array.map((element, index) => index)
  let { location, property_type, price, property_size } = req.query
  if (!location) location = "kigali"
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
  const results = await propertiesDB.searchProperty(location, property_type, price, property_size)
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  res.status(200).json({
    status: 200,
    message: "search completed successfully",
    data: paginator(results, page, limit)
  })
}

export default searchController
