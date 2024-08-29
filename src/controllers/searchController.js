/* eslint-disable require-jsdoc */
import { Sequelize } from "sequelize"
import propertiesDB from "../utils/db/propertiesDB"
import paginator from "../utils/paginator"

async function searchController(req, res) {
  let { location, property_type, price, property_size } = req.query
  if (!location) location = "null"
  if (!property_type) property_type = []
  if (!price) {
    price = []
  } else {
    price = price.slice(1, -1).split(',').map(Number)
  }
  if (!property_size) property_size = []
  console.log(price)
  console.log(typeof (price[0]))
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
