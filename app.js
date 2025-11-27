const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const loginService = require("./services/loginService.js");
const registerService = require("./services/registerService.js");
const { upsertAccountDetails, getAccountDetails } = require("./services/accountService");

//Simple request time logger
app.use(
    (request, response, next) => {
        console.log("A new request received at " + new Date(Date.now()));
        next();
    }
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", loginService);

app.post("/registration", registerService);

app.post("/account", upsertAccountDetails);

app.get("/account", getAccountDetails);

/*app.post("/account", (request, response) => {
    console.log(request.body);
    response.status(201).json({ message: "Successfully updated account"});
});

app.get("/account", (request, response) => {
    console.log(request.query);
    response.status(200).json({
        firstName: "First name",
        lastName: "Last name",
        addressLine1: "Address line 1",
        addressLine2: "Address line 2",
        city: "City",
        state: "Missouri",
        zipCode: "Zip Code",
        phoneNumber: "Phone Number",
        email: "Email",
        userID: request.query.userID
    })
});*/

app.listen(port);