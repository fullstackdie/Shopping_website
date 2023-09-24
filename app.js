const path = require("path");

const express = require("express");
const adminRoutes = require("./routes/Admin");
const shopRoutes = require("./routes/Shop");
const pageNotFoundController = require("./Controllers/PageNotFound");
const bodyParser = require("body-parser");

const app = express();

//MiddleWares
app.set("view engine", "ejs");
app.set("views", "Views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "Public")));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use(pageNotFoundController.pageNotFound);

app.listen(3000);
