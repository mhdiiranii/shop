const { json } = require("body-parser");
const Product = require("../models/pruductModel");

exports.productList = async (req, res, next) => {
  try {
    const query = req.query;
    if (query.page) {
      const perPage = 12;
      const offset = query.page - 12;
      const productCount = await Product.countDocuments();
      const totalPages = Math.ceil(productCount / perPage);

      const allItem = await Product.find({}).limit(perPage).skip(offset);

      return res.status(200).json({
        status: "success",
        data: {
          allItem,
        },
        meta: {
          page: parseInt(query.page),
          pages: totalPages,
          totalData: productCount,
        },
      });
    } else if (query.brand) {
      const allItem = await Product.find({ brand_name: query.brand });

      if (allItem.length === 0) {
        return res.status(404).json({
          message: "Not-Found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: {
          allItem,
        },
        length: allItem.length,
      });
    } else if (query.category) {
      const allItem = await Product.find({ category: query.category });
      if (allItem.length !== 0) {
        return res.status(200).json({
          status: "success",
          data: {
            allItem,
          },
          length: allItem.length,
        });
      }
      return res.status(404).json({
        status: "404",
        message: "Not-found",
      });
    } else if (query.color) {
      const allItem = await Product.find({ color: query.color });
      if (allItem.length === 0) {
        return res.status(404).json({
          message: "Not-Found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: {
          allItem,
        },
        length: allItem.length,
      });
    } else if (query.size) {
      const allItem = await Product.find({ size_range: query.size });
      // if(typeof query.size === Number){
      //   return res.status(404).json({
      //     message: "Not-Found",
      //   });
      // }
      if (allItem.length === 0) {
        return res.status(404).json({
          message: "Not-Found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: {
          allItem,
        },
        length: allItem.length,
      });
    }else if (query.size) {
      const allItem = await Product.find({ size_range: query.size });
      // if(typeof query.size === Number){
      //   return res.status(404).json({
      //     message: "Not-Found",
      //   });
      // }
      if (allItem.length === 0) {
        return res.status(404).json({
          message: "Not-Found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: {
          allItem,
        },
        length: allItem.length,
      });
    }else if (query.gender){
      const allItem = await Product.find({ gender: query.gender });
      if (allItem.length !== 0) {
        return res.status(200).json({
          status: "success",
          data: {
            allItem,
          },
          length: allItem.length,
        });
      }
      return res.status(404).json({
        status: "404",
        message: "Not-found",
      });
    }else {
      return res.status(404).json({
        status: "404",
        message: "Not-found",
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.filterList = async (req, res, next) => {
  const allCategory = await Product.find({}, { category: 1, color: 1, brand_name: 1 });
  res.status(200).json({
    status: "success",
    data: {
      allCategory,
    },
  });
};
exports.oneProduct = async (req, res, next) => {
  const { id } = req.params;
  const oneItem = await Product.findOne({ slug: id });

  if (!oneItem) {
    return res.status(404).json({
      message: "Item Not-Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: {
      oneItem,
    },
  });
};
