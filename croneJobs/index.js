var cron = require("node-cron");

const clearProducts = require("./clearProducts");
const clearUsers = require("./clearUsers");
function startCronJobs() {
  console.log("Starting Cron Jobs");
  cron.schedule("*/30 * * * *", () => {
    clearProducts();
    clearUsers();
  });
}

module.exports.startCronJobs = startCronJobs;
