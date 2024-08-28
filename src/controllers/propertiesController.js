/* eslint-disable require-jsdoc */
import crypto from 'crypto'
import propertiesDB from "../utils/db/propertiesDB"
import s3_helper from "../utils/s3_helper"
import paginator from '../utils/paginator'

class propertiesController {
  static async getProperties(req, res) {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5
    try {
      const nproperty = await propertiesDB.getAllProperties()

      // Generate all image URLs concurrently
      const urls = await Promise.all(
        nproperty.map(async (prop) => {
          const shortUrls = await Promise.all(
            prop.imageIds.map((imageId) => s3_helper.generateUrl(imageId))
          );
          return shortUrls;
        })
      );
      const rates = nproperty.map((prop) => prop.dataValues.rates);

      // Construct property data with generated URLs
      const property_data = nproperty.map((prop, index) => {
        const { id, title, userId, imageIds, details, price, property_type,
          property_size, hasParking, isForSale, isForRent, isLand, location,
          shareIds, bedrooms, bathrooms, isSold, createdAt, updatedAt } = prop;
        return {
          id,
          title,
          userId,
          imageIds,
          imageUrl: urls[index],
          details,
          price,
          property_type,
          property_size,
          hasParking,
          isForSale,
          isForRent,
          isLand,
          location,
          shareIds,
          bedrooms,
          bathrooms,
          isSold,
          rates: rates[index],
          createdAt,
          updatedAt
        };
      });
      const paginated = paginator(property_data, page, limit)
      return res.json({
        status: 200,
        message: "request received",
        data: paginated
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "An error occurred",
        error: error.message
      });
    }
  }

  static async getOneProperty(req, res) {
    const prop = await propertiesDB.findProperty('id', req.params.id)
    res.json({
      status: 200,
      prop
    })
  }

  static async postProperties(req, res) {
    const nproperty = {
      title: req.body.title,
      imageIds: req.body.imageIds,
      details: req.body.details,
      price: req.body.price,
      property_type: req.body.property_type,
      property_size: req.body.property_size,
      hasParking: req.body.hasParking,
      isForSale: req.body.isForSale,
      isForRent: req.body.isForSale,
      isLand: req.body.isLand,
      location: req.body.location, // District, Sector
      shareIds: req.body.shareIds,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      ratings: req.body.ratings,
      userId: req.user.id
    }
    const data = await propertiesDB.saveProperty(nproperty)
    res.status(201).json({
      status: 201,
      message: 'property created successfully',
      data
    })
  }

  static async updateProperty(req, res) {
    const doesExist = await propertiesDB.findProperty('id', req.params.id)
    if (doesExist.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "passed wrong id"
      })
    }
    const { column, value } = req.body
    const newprop = await propertiesDB.updateProperty(req.params.id, column, value)
    if (!newprop[0]) {
      res.status(400).json({
        status: 400,
        error: "invalid column"
      })
    } else {
      res.status(201).json({
        status: 201,
        message: `${column} updated successfully`
      })
    }
  }

  static async deletePropertyRoute(req, res) {
    const doesExist = await propertiesDB.findProperty('id', req.params.id)
    if (doesExist.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "passed wrong id"
      })
    }
    await propertiesDB.deleteProperty(req.params.id)
    res.status(201).json({
      status: 201,
      message: `property with id ${req.params.id} was deleted successfully`
    })
  }

  static async property_img(req, res) {
    const doesExist = await propertiesDB.findProperty('id', req.params.id)
    if (doesExist.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "passed wrong id"
      })
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "No files were uploaded"
      });
    }

    const imageIds = [];
    const s3Promises = [];

    for (let i = 0; i < req.files.length; i += 1) {
      const file = req.files[i];
      const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
      const key = `${randomImageName()}`;
      const uploadPromise = s3_helper.s3_objPut(key, file.buffer, file.mimetype);
      imageIds.push(key);
      s3Promises.push(uploadPromise);
    }

    try {
      await Promise.all(s3Promises);
      const prop = await propertiesDB.updateProperty(req.property.id, 'imageIds', imageIds);
      res.json({
        status: 200,
        message: "Property images uploaded successfully"
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: "Error uploading images",
        details: err.message
      });
    }
  }
}

export default propertiesController
