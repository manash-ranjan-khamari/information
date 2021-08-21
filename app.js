const express = require('express');
const config = require('./config/appconfig.js');
const MongoDBService = require('./server/common/service/mongodbservice.js');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.join(`${__dirname}/log`, 'access.log'), { flags: 'a+' })

const app = express();
const port = config.port;

app.use(express.json());
app.use(morgan('combined', {stream}));

MongoDBService.connect().then(() => {
    require('./routes.js').exposeRoutes(app);

    app.listen(port, () => {
        console.log(`Express server listening on port http://localhost:${port}`);
    })
});
