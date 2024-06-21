import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars"; 
import 'dotenv/config'; 

import routerP from "./routes/products.router.js";
import routerV from "./routes/views.router.js";
import routerC from "./routes/cart.router.js";
import { __dirname } from "./utils.js";
import { dbConnection } from "./db/config.js";
import { addProductService, getProductsService } from "./services/products.services.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views'); 
app.set('view engine', 'handlebars');

app.use('/', routerV);
app.use('/api/products', routerP);
app.use('/api/carts', routerC)

await dbConnection();

const expressServer = app.listen(PORT, () => {
    console.log(`Corriendo aplicación en el puerto ${PORT}`); 
});

const io = new Server(expressServer);

io.on('connection', async (socket) => {

    const {payload} = await getProductsService({});
    const productos =  payload;
    socket.emit('productos', payload);
    socket.on('agregarProducto', async (producto) => {
        const newProduct = await addProductService({...producto});
        if (newProduct) {
            productos.push(newProduct);
            socket.emit('productos', productos);
        }
    });

    socket.broadcast.emit('Nuevo_user');
});