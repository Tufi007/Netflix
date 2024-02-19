# xss-req-sanitizer

[![Build Status](https://travis-ci.com/kalekarnn/xss-req-sanitizer.svg?branch=main)](https://travis-ci.com/kalekarnn/xss-req-sanitizer)
[![Coverage Status](https://coveralls.io/repos/github/kalekarnn/xss-sanitizer/badge.svg)](https://coveralls.io/github/kalekarnn/xss-sanitizer)

> `xss-req-sanitizer` is a middleware to sanitize http requests to prevent XSS attacks.

## Installation

    npm install xss-req-sanitizer
    
## How to use ?

    var express = require('express')
    var bodyParser = require('body-parser')
    var xssReqSanitizer = require('xss-req-sanitizer')

    var app = express()

    app.use(bodyParser.json())
    
    // this should comes before any routes
    app.use(xssReqSanitizer())

    app.post('/your-route', (req, res) => {
    
       // All the values from,
       // req.body, req.params, req.query 
       // will be sanitized in-place.

    })
    
## Testing & Contributing

    npm install
    npm test
    
## License
[MIT](https://github.com/kalekarnn/xss-req-sanitizer/blob/main/LICENSE)
    
    
