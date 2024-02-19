const xss = require('xss');

const xssReqSanitizer = () => {
    return (req, res, next) => {

        for (const key in req.query) {
            req.query[key] = getSanitizedData(req.query[key]);
        }

        for (const key in req.params) {
            req.params[key] = getSanitizedData(req.params[key]);
        }

        if(req && req.body){
            const strBody = JSON.stringify(req.body);
            const sanitizedBody = getSanitizedData(strBody);

            req.body = JSON.parse(sanitizedBody);
        }

        next();
    }
};

function getSanitizedData(inpputData) {

    let isObject = false;
    if (typeof inpputData === 'object') {
        inpputData = JSON.stringify(inpputData);
        isObject = true;
    }

    const output = xss(inpputData, {
        whiteList: {},
        stripIgnoreTag: true,
        stripIgnoreTagBody: ["script"],
    });

    return isObject ? JSON.parse(output) : output;
}

module.exports = xssReqSanitizer;
