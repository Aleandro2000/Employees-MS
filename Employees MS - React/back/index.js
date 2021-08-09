const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors')
const {graphqlHTTP}=require("express-graphql");
const mongoose=require('mongoose');
const app=express();

const schema=require("./schema/schema");

mongoose.connect('mongodb://localhost/Employees-Database',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use("/graphql",graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(4000);