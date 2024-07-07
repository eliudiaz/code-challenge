"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ListingController_1 = require("./routes/listing/ListingController");
const swagger_1 = require("./swagger/swagger");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "100mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.get('/', (req, res) => {
    res.json({ message: 'hello!' });
});
app.use('/listings', ListingController_1.defaultRouter);
(0, swagger_1.setupSwagger)(app);
app.listen(3000, () => {
    console.log("App running on 3000 port");
});
