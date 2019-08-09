const generateFakeData = require('./generateFakerData');
const JSONToCSV = require('json2csv').parse;
const FileSystem = require('fs');

function generateOneMillionUsers () {
  let users = [];

  for (let i = 1; i <= 1000000; i++) {
    let userData = generateFakeData.User();
    users.push(userData);
  }
  const csv = JSONToCSV(users, { fields: ['name', 'email', 'default_address_zip'] })
  FileSystem.writeFileSync('./db-cassandra/db-csvFiles/userData.csv', csv)
};
generateOneMillionUsers();

function appendOtherUsers () {
  for (let append = 1; append <= 9; append++) {
    let users = [];

    for (let i = 1; i <= 1000000; i++) {
      let userData = generateFakeData.User();
      users.push(userData);
    }
    const csv = JSONToCSV(users, { fields: ['name', 'email', 'default_address_zip'] })
    FileSystem.appendFileSync('./db-cassandra/db-csvFiles/userData.csv', csv)
  }
};
appendOtherUsers();

function generateOneMillionVendors () {
  let vendors = [];

  for (let i = 1; i <= 1000000; i++) {
    let vendorData = generateFakeData.Vendor();
    vendors.push(vendorData);
  }
  const csv = JSONToCSV(vendors, { fields: ['name', 'amz_holds_stock', 'free_returns', 'ships_on_saturday', 'ships_on_sunday', 'ships_from_zipcode', 'status'] })
  FileSystem.writeFileSync('./db-cassandra/db-csvFiles/vendorData.csv', csv)
}
generateOneMillionVendors();

function appendOtherVendors () {
  for (let append = 1; append <= 9; append++) {
    let vendors = [];

    for (let i = 1; i <= 1000000; i++) {
      let vendorData = generateFakeData.Vendor();
      vendors.push(vendorData);
    }

    const csv = JSONToCSV(vendors, { fields: ['name', 'amz_holds_stock', 'free_returns', 'ships_on_saturday', 'ships_on_sunday', 'ships_from_zipcode', 'status'] })
    FileSystem.appendFileSync('./db-cassandra/db-csvFiles/vendorData.csv', csv)
  }
};
appendOtherVendors();

function generateFiveHundredThousandItems () {
  let items = [];

  for (let i = 1; i <= 500000; i++) {
    let itemData = generateFakeData.Item();
    items.push(itemData);
  }
  const csv = JSONToCSV(items, { fields: ['item_id', 'name', 'vendor_id', 'items_condition', 'price', 'quantity_available', 'amz_holds_stock', 'free_returns', 'ship_from_zipcode'] })
  FileSystem.writeFileSync('./db-cassandra/db-csvFiles/itemData.csv', csv)
}
generateFiveHundredThousandItems();

function appendOtherItems () {
  for (let append = 1; append <= 19; append++) {
    let items = [];

    for (let i = 1; i <= 500000; i++) {
      let itemData = generateFakeData.Item();
      items.push(itemData);
    }
    const csv = JSONToCSV(items, { fields: ['item_id', 'name', 'vendor_id', 'items_condition', 'price', 'quantity_available', 'amz_holds_stock', 'free_returns', 'ship_from_zipcode'] })
    FileSystem.appendFileSync('./db-cassandra/db-csvFiles/itemData.csv', csv)
  }
};
appendOtherItems();

