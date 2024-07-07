import express, {Express} from "express";
import bodyParser from 'body-parser'
import {defaultRouter} from "./routes/listing/ListingController";
import {setupSwagger} from "./swagger/swagger";

const app: Express = express()
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))

app.get('/', (req, res) => {
    res.json({message: 'hello!'});
})

app.use('/listings', defaultRouter)
setupSwagger(app);
app.listen(3000, () => {
    console.log("App running on 3000 port")
})
