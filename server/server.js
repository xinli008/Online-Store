const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("../server/config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


require("../server/routes/user.route")(app);
require("../server/routes/product.route")(app);
require("../server/routes/checkout.route")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));

//const server = app.listen( port, ()=> console.log(`listening on port ${port}...`));

// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//     console.log('send welcome message');
//     socket.emit("Welcome","Welcome from server socket.");


//     socket.on("review_anouncement", data =>{
//         console.log(`inside socket.on ${data}`);
//         //socket.broadcast.emit("adoption_news",data);
//         io.emit("adoption_news",data);
//     })
//   });