// Для запустка проекта:
// - npm install
// - node index.js

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(5000);
console.log('Running a GraphQL API service at http://localhost:5000/graphql');