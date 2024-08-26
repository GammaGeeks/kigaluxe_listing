/* eslint-disable require-jsdoc */
import { Sequelize } from "sequelize"
import propertiesDB from "../utils/db/propertiesDB"

async function searchController(req, res) {
  let { location, property_type, price, property_size } = req.query
  if (!location) location = "null"
  if (!property_type) property_type = []
  if (!price) price = []
  if (!property_size) property_size = []
  const results = await propertiesDB.searchProperty(location, property_type, price, property_size)
  res.status(200).json({
    status: 200,
    message: "search completed successfully",
    data: results
  })
}

export default searchController
