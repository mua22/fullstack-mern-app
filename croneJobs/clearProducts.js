const Product = require("../models/Product");
var faker = require("faker");
async function clearProducts() {
  console.log("Refreshing Products");
  let products = [];
  faker.seed(123);
  for (var i = 0; i < 10; i++) {
    let p = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      color: faker.commerce.color(),
      department: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      image: `tech${i + 1}.jpg`,
    };
    products.push(p);
  }
  await Product.deleteMany({});
  Product.collection.insertMany(products, (err, docs) => {
    if (err) {
      console.error("Error Occured: " + err);
    } else {
      console.info("bulk inserted");
    }
  });
}

module.exports = clearProducts;
