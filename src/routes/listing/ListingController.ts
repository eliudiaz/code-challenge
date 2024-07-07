import {Router, Request, Response} from "express";
import {Listing} from "../../model/Listing";

class ListingController {
    private listings: Listing[] = [];

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        defaultRouter.get('/', this.fetchAll)
        defaultRouter.post('/', this.create)
        defaultRouter.delete('/:id', this.deleteOne)
    }

    private create = (req: Request, resp: Response) => {
        const {title, price, description} = req.body;
        if (!title || !price || !description) {
            resp.status(400).send("Invalid input!");
            return;
        }
        const id: string = `${this.listings.length + 1}`;
        const newListing: Listing = {title, price, description, id} as Listing;
        this.listings.push(newListing);
        resp.status(201).json(newListing);
    }

    private fetchAll = (req: Request, resp: Response) => {
        resp.status(200).json(this.listings);
    }

    private deleteOne = (req: Request, resp: Response) => {
        const id = req.params.id;
        console.info(`id value: ${id}`)
        if (!id) {
            resp.status(400).send('Invalid input!');
        }
        const index = this.listings.findIndex(l => l.id === id);
        if (index != -1) {
            delete this.listings[index];
            this.listings = this.listings.filter(l => l);
            resp.status(201).send('Item deleted!');
        } else {
            resp.status(404).send('Item not found!');
        }
    }
}

export const defaultRouter = Router();
new ListingController();

