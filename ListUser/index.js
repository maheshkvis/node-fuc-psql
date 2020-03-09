const pg = require('pg');
const config = {
    host: process.env['host'],
    user: process.env['user'],     
    password: process.env['password'],
    database: process.env['database'],
    port: 5432,
    ssl: true
};

module.exports = function (context, req) {
    const client = new pg.Client(config);

    client.connect(err => {
        if (err) throw err;
        else { 
            console.log(`Running query to PostgreSQL server: ${config.host}`);

    const query = 'SELECT * FROM staff;';
         client.query(query)
        .then(res => {
            const rows = res.rows;
            context.log(JSON.stringify(rows))
            context.res = {
                body: "Hello " + (JSON.stringify(rows))
            };
            context.done();
        
        })
        .catch(err => {
            context.log(err);
        });
        
        }
    });
};