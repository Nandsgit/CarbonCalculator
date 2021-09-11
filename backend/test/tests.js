const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');

const bcrypt = require('bcrypt');
const User = require("../src/models/users.model");

require('dotenv').config();

chai.use(chaiHttp);

describe('User Registration Testing', () => {
    before( async() => {
        let MongoClient = require('mongodb').MongoClient;
        let url = process.env.MONGODB_URI;
        try {
            let MongoDBConnect = await MongoClient.connect(url);
            let dbo = MongoDBConnect.db("myFirstDatabase");
            await dbo.collection("users").deleteOne({"username": "ralin600"});
            console.log("Purged Test User - Before Test.");
        } catch(err) {
            console.log(err);
        }
    });
    it('Successfully register new user', async() => {
        try{
            chai.request('http://localhost:5000/users/register/')
                .post("")
                .send({
                    "username": "ralin600",
                    "email": "test200@test1.com",
                    "password": "password_test"})
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 200);
                    assert.deepStrictEqual(res.body, "User added!");
                    assert.notDeepStrictEqual(res.headers['set-cookie'], null)
                });
        } catch (e) {
            assert.fail(e);
        }
    });
    it('Unsuccessfully register new user', async() => {
        try{
            chai.request('http://localhost:5000/users/register/')
                .post("")
                .send({
                    "username": "ralin600",
                    "email": "test200@test1.com",
                    "password": "password_test"})
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 409);
                });
        } catch (e) {
            assert.fail(e);
        }
    });
    after( async() => {
        let MongoClient = require('mongodb').MongoClient;
        let url = process.env.MONGODB_URI;
        try {
            let MongoDBConnect = await MongoClient.connect(url);
            let dbo = MongoDBConnect.db("myFirstDatabase");
            await dbo.collection("users").deleteOne({"username": "ralin600"});
            console.log("Purged Test User - After Test.");
        } catch(err) {
            console.log(err);
        }
    });
})

describe('Authentication Testing', () => {
    beforeEach(function(done) {
        let MongoClient = require('mongodb').MongoClient;
        let url = process.env.MONGODB_URI;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("myFirstDatabase");
            const password = "password_test";

            // hash password
            bcrypt.hash(password, process.env.SALT_ROUNDS | 0, function(err, hash) {
                let newUser = new User({
                    "username": "ralin5",
                    "email": "test2@test1.com",
                    "password_hash": hash,
                });
                dbo.collection("users").insertOne(newUser, function(err, obj) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    done();
                });
            });
        });
    });
    it('Login in using email', async() => {
        try{
            chai.request('http://localhost:5000/users/auth/')
                .post("")
                .send({
                    "username": "test2@test1.com",
                    "password": "password_test"})
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 200);
                    assert.deepStrictEqual(res.body.body, "User Authenticated");
                    assert(res.headers['set-cookie']);
                });
        } catch (e) {
            assert.fail(e);
        }
    });
    it('Login in using username', async () => {
        try {
            chai.request('http://localhost:5000/users/auth/')
                .post("")
                .send({
                    "username": "ralin5",
                    "password": "password_test"
                })
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 200);
                    assert.deepStrictEqual(res.body.body, "User Authenticated");
                    assert(res.headers['set-cookie']);
                });
        } catch (e) {
            assert.fail(e);
        }
    });
    it('Unsuccessfully login using wrong username', async () => {
        try {
            chai.request('http://localhost:5000/users/auth/')
                .post("")
                .send({
                    "username": "ralin65",
                    "password": "password_test"
                })
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 401);
                    assert.deepStrictEqual(res.body.body, "User Authentication Failed");
                });
        } catch (e) {
            assert.fail(e);
        }
    });
    afterEach(function (done) {
        let MongoClient = require('mongodb').MongoClient;
        let url = process.env.MONGODB_URI;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("myFirstDatabase");
            let myQuery = {username: "ralin5"}
            dbo.collection("users").deleteOne(myQuery, function (err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
                done();
            });
        });
    });
})

describe('Form Testing', () => {
    beforeEach(function(done) {
        let MongoClient = require('mongodb').MongoClient;
        let url = process.env.MONGODB_URI;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("myFirstDatabase");
            const password = "password_test";

            // hash password
            bcrypt.hash(password, process.env.SALT_ROUNDS | 0, function(err, hash) {
                let newUser = new User({
                    "username": "ralin5",
                    "email": "test2@test1.com",
                    "password_hash": hash,
                });
                dbo.collection("users").insertOne(newUser, function(err, obj) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    done();
                });
            });
        });
    });
    it('Login in using email', async() => {
        try{
            chai.request('http://localhost:5000/users/auth/')
                .post("")
                .send({
                    "username": "test2@test1.com",
                    "password": "password_test"})
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 200);
                    assert.deepStrictEqual(res.body.body, "User Authenticated");
                    assert(res.headers['set-cookie']);
                });
        } catch (e) {
            assert.fail(e);
        }
    });
    it('Login in using username', async () => {
        try {
            chai.request('http://localhost:5000/users/auth/')
                .post("")
                .send({
                    "username": "ralin5",
                    "password": "password_test"
                })
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 200);
                    assert.deepStrictEqual(res.body.body, "User Authenticated");
                    assert(res.headers['set-cookie']);
                });
        } catch (e) {
            assert.fail(e);
        }
    });

    it('Submit survey results', async () => {
        try {
            chai.request('http://localhost:5000/survey/result/')
                .post("")
                .send({
                    "username": "ralin5",
                    "form": {"Q1": "3","Q2": 3,"Q3": 3,"Q5": 3,"Q7": 3,"Q8": 3,"Q9": 3,"Q10": 3,"Q11": "3","Q12": "3","Q13": "3","Q14": "3","Q15": "3","Q16": true},
                    "form_vals": {"Q1": 0, "Q2": 0, "Q3": 0, "Q4": 0,"Q5": 0, "Q6": 0,"Q7": 30.6,"Q9": 37937.83169067476,"Q10": 5921.739130434781,"Q11": 147096,"Q12": 65920.8,"Q13": 37591.200000000004,"Q14": 213561.60000000006,"Q15": 64831.200000000004,"Q16": 0,"Q8": 554.7692307692307 },
                    "co2": 1000
                })
                .end((err, res) => {
                    assert.deepStrictEqual(err, null);
                    assert.deepStrictEqual(res.status, 200);
                });
        } catch (e) {
            assert.fail(e);
        }
    });


    afterEach(function (done) {
        let MongoClient = require('mongodb').MongoClient;
        let url = process.env.MONGODB_URI;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("myFirstDatabase");
            let myQuery = {username: "ralin5"}
            dbo.collection("users").deleteOne(myQuery, function (err, obj) {
                if (err) throw err;
                console.log("1 document deleted");

            dbo.collection("surveyresults").deleteOne(myQuery, function (err, obj) {
                if (err) throw err;
                  console.log("1 document deleted");
                  db.close();
                  done();
                });
            });

        });
    });
})
