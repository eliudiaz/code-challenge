"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const express_1 = require("express");
class ListingController {
    constructor() {
        this.listings = [];
        this.create = (req, resp) => {
            const { title, price, description } = req.body;
            if (!title || !price || !description) {
                resp.status(400).send("Invalid input!");
                return;
            }
            const id = `${this.listings.length + 1}`;
            const newListing = { title, price, description, id };
            this.listings.push(newListing);
            resp.status(201).json(newListing);
        };
        this.fetchAll = (req, resp) => {
            resp.status(200).json(this.listings);
        };
        this.deleteOne = (req, resp) => {
            const id = req.params.id;
            console.info(`id value: ${id}`);
            if (!id) {
                resp.status(400).send('Invalid input!');
            }
            const index = this.listings.findIndex(l => l.id === id);
            if (index != -1) {
                delete this.listings[index];
                this.listings = this.listings.filter(l => l);
                resp.status(201).send('Item deleted!');
            }
            else {
                resp.status(404).send('Item not found!');
            }
        };
        this.initRoutes();
    }
    initRoutes() {
        exports.defaultRouter.get('/', this.fetchAll);
        exports.defaultRouter.post('/', this.create);
        exports.defaultRouter.delete('/:id', this.deleteOne);
    }
}
exports.defaultRouter = (0, express_1.Router)();
new ListingController();
