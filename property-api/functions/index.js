const functions = require("firebase-functions");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoURI = functions.config().mongodb.uri;

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();


// Your Express routes go here
app.get("/api", (req, res) => {
  res.send("Hello from Firebase!");
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

mongoose.connect("mongodb+srv://admin:O7aAojvwFUoo7YsN@cluster0.mskks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(() => console.log("MongoDB connected"))
          .catch(err => console.log(err));
        
