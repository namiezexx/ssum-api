const mariadb = require('mysql');

var maria = mariadb.createConnection({
    host: 'rds-mariadb.c346c7pkd3yp.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'namiezexx',
    password: 'jslee0707!',
    database: 'ssum'
});

maria.connect();

module.exports = maria;


