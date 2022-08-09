import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/app-users-node")
.then(db => console.log("DB is connected"))
.catch(error => console.log(error));