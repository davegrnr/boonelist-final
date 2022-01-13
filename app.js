"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path")

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const servicesRoutes = require("./routes/services")
const salesRoutes = require("./routes/sales")


const morgan = require("morgan");

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/services", servicesRoutes);
app.use("/sales", salesRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")))
}

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
    });

    /** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
        if (process.env.NODE_ENV !== "test") console.error(err.stack);
            const status = err.status || 500;
            const message = err.message;
            return res.status(status).json({
                error: { message, status },
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

module.exports = app;
