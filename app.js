const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

//Simple request time logger
app.use(
    (request, response, next) => {
        console.log("A new request received at " + new Date(Date.now()));
        next();
    }
);

app.use(express.json());
app.use(cors());

app.post("/login", (request, response) => {
    console.log(request.body);
    response.status(200).json({ message: "Successfully logged in"});
});

app.post("/registration", (request, response) => {
    console.log(request.body);
    response.status(201).json({ message: "Successfully registered"});
});

app.post("/account", (request, response) => {
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
});

app.listen(port);