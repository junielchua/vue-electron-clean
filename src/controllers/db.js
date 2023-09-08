
const { user, sale, sequelizemeta, configuration } = require("../../models");
const { net } = require('electron');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Op = require('sequelize').Op;

const syncDatabase = async () => {

    const config = await configuration.findOne({ where: { context: 'dbVersion' } })

    if(config && config.dataValues){
        const dbVersion = config.dataValues.data;

        if(dbVersion == process.env.DB_VERSION){
            return {
                error: false,
                message: "Version is up to date"
            };
        }
    } else {
        return {
            error: true,
            message: "Please execute seeder"
        };
    }

    try {
        const { exec } = require('child_process');

        await new Promise((resolve, reject) => {
            const migrate = exec(
                'sequelize db:migrate',
                { env: process.env },
                err => (err ? reject(err) : resolve())
            );
        });

        await configuration.update({ data: process.env.DB_VERSION }, {
            where: {
              context: 'dbVersion'
            }
          });
        
        return {
            error: false,
            message: "Database version successfully updated to v" + process.env.DB_VERSION
        };
    } catch (error) {
        return {
            error: true,
            // message: "Something went wrong! Please try again."
            message: error.message
        };
    }
}

const testHttp = async () => {
    
    // const req = net.request("https://admin.unliworkx.org/api/test");
    // console.log(req);
    // req.on("response", (response) => {
    //     const data = [];
    //     response.on("data",(chunk)=> {
    //         data.push(chunk);
    //         console.log(chunk);
    //     })
    //     response.on("end", () => {
    //         const json = Buffer.concat(data).toString();
    //         console.log(json);
    //     })
    // });

    // req.end();

    // GET METHOD
    // const response = await fetch('https://admin.unliworkx.org/api/test');
    // const body = await response.text();
    
    // POST METHOD
    const body = {a: 1};

    const response = await fetch('https://httpbin.org/post', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();


    // console.log(body);
}

const syncData = async () => {

    // POST METHOD
    const body = await user.findAll({
        where: {
          unid: {[Op.is]: null}
        }
      });
      console.log('SENDING --------------');
      console.log(body);

    const response = await fetch('http://ao-api-server.test/api/pos-sync/tbl-user', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();

    console.log('RECEIVED --------------');
    console.log(data);
    
    await user.bulkCreate(
        data,
        {
          updateOnDuplicate: ["unid"],
        }
    );

    return {
        error: false,
        message: "successfully synced"
    };
}

module.exports = {
    syncDatabase,
    syncData,
    testHttp
};
