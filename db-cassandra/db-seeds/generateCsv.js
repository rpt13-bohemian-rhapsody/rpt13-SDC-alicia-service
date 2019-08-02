const generateFakeData = require('./generateFakerData');
const JSONToCSV = require('json2csv').parse;
const FileSystem = require('fs');

function generateUsers () {

  let users = [];

  for (let i = 1; i <= 10000000; i++) {
    let userData = generateFakeData.User();
    users.push(userData);
  }

  const csv = JSONToCSV(users, { fields: ['name', 'email', 'default_address_zip'] })
  FileSystem.writeFileSync('./db-cassandra/db-csvFiles/userData.csv', csv)
};
generateUsers();

function generateVendors () {

  let vendors = [];

  for (let i = 1; i <= 10000000; i++) {
    let vendorData = generateFakeData.Vendor();
    vendors.push(vendorData);
  }

  const csv = JSONToCSV(vendors, { fields: ['name', 'amz_holds_stock', 'free_returns', 'ships_on_saturday', 'ships_on_sunday', 'ships_from_zipcode', 'status'] })
  FileSystem.writeFileSync('./db-cassandra/db-csvFiles/vendorData.csv', csv)
}
generateVendors();

function generateItems () {

  let items = [];

  for (let i = 1; i <= 10000000; i++) {
    let itemData = generateFakeData.Item();
    items.push(itemData);
  }
  const csv = JSONToCSV(items, { fields: ['item_id', 'name', 'vendor_id', 'items_condition', 'price', 'quantity_available', 'amz_holds_stock', 'free_returns', 'ship_from_zipcode'] })
  FileSystem.writeFileSync('./db-cassandra/db-csvFiles/itemData.csv', csv)
}
generateItems();