
const CategoryModel = require("./CategoryModel");
const ProductModel = require("./ProductModel");


// Thiết lập mối quan hệ

// 1. Mối quan hệ 1-1 giữa Category và Product
// một product chỉ thuộc 1 category
ProductModel.belongsTo(CategoryModel, {
    foreignKey: "categoryID",
});
// 2. Mối quan hệ 1-nhiều giữa Category và Product
// một category có nhiều product
CategoryModel.hasMany(ProductModel, {
    foreignKey: "categoryID",
});



module.exports = { CategoryModel, ProductModel };
