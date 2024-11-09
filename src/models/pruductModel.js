const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {
      box_condition: String,
      brand_name: String,
      category: [
        String
      ],
      color: String,
      gender: [
        String
      ],
      has_picture: Boolean,
      has_stock: Boolean,
      id: Number,
      main_picture_url: String,
      release_year: String,
      retail_price_cents: Number,
      shoe_condition: String,
      size_range: [
       Number
      ],
      slug: String,
      story_html: String
    }
  )

  const Product = mongoose.model('Product',productSchema)


  module.exports = Product