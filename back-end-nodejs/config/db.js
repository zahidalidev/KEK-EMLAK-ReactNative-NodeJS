const sql = require("mssql/msnodesqlv8");

module.exports = new sql.ConnectionPool({
    database: "kekEmlak",  // Database name
    server: "(localdb)\\MSSQLLocalDB",  //SQl Server Name
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
})