# Description
 A token based authentication example writen in Node JS.

# Used dependencies
[bcryptjs](https://www.npmjs.com/package/bcryptjs) -  bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.

[body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware

[crypto-js](https://www.npmjs.com/package/crypto-js) - JavaScript library of crypto standards.

[expect](https://www.npmjs.com/package/expect) - JavaScript assert library

[express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.

[jest](https://www.npmjs.com/package/jest) - Delightful JavaScript Testing

[jsonwebtoken](jsonwebtoken) - An implementation of JSON Web Tokens.

[mongodb](https://www.npmjs.com/package/mongodb) - The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.

[mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

[supertest](https://www.npmjs.com/package/supertest) - HTTP assertions made easy via superagent.

[validator](https://www.npmjs.com/package/validator) - A library of string validators and sanitizers.

# How to test
1. Run mongodb locally using Docker:
    
    `docker run -p 27017:27017 mongo`

2. Check test-cases
    Go inside project folder and run:

    `npm test`

3. Run developmemt environment using node/nodemon
    
    `node/nodemon app.js`

