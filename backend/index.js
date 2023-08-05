const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("Server is Running!");
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        io.to(socket.id).emit("callEnded");
        socket.broadcast.emit("callEnded");
    });

    socket.on("CallingUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("CallingUser", { signal: signalData, from, name });
    });

    socket.on("AnswerCall", (data) => {
        io.to(data.to).emit("acceptCall", data.signal);
    });

    socket.on("RejectCall", (data) => {
        io.to(data.from).emit("callRejected", {signal: data.signal});
    });

});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
