import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from 'cors';
import jwt from "jsonwebtoken";

import { Customer, Service } from "./modal/schema.js";
config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("Connected");
    } catch (err) {
        console.log("Something went wrong", err);
    }
}

connectToDatabase();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,authorization'
    );
    next();
});

app.post('/register',async (req, res) => {

    try {
        const existedUser = await Customer.find({email: req.body.email});
        if(existedUser) res.json({user: "User exist"}); 
        else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: hashedPassword,
        };
        const newUser = new Customer(user);
        await newUser.save();
        res.status(201).json({ ok: true });
    }
    } catch (err) {
        res.status(400).json("something went wrong! Check your input again", err);
    }
})

app.get('/userData', authenticateToken ,async (req, res) => {
    try {
        const services = await Service.find({email: req.user.email});
        res.json({ services })
    } catch (err) {
        res.status(500).send(err)
    }
});

app.post('/userData', authenticateToken, async (req, res) => {
    const payload = {...req.body,email: req.user.email};
    try {
        const service = new Service(payload);
        await service.save();
        res.json({ service, ok: true })
    } catch (err) {
        console.log(err)
    }
});

app.delete('/deleteData', async (req, res) => {
    try{
        await Service.deleteMany({email: req.user.email});
        res.json({ok:true})
    }catch(err){
        res.status(403).send(err)
    }

})

app.delete('/removeService/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await Service.deleteOne({_id: id});
        res.json({ok:true})
    }catch(err){
        res.status(403).send(err)
    }

})

app.get('/verifyToken/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Customer.findOne({ token });

        if (user) {
            res.json({ ok: true, user });
        } else {
            res.status(404).json({ ok: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(401).json({ ok: false, message: 'Invalid or expired token' });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    try {
        Customer.findOne({ email: email })
            .then(loggedUser => {
                if (loggedUser) {
                    bcrypt.compare(password, loggedUser.password, (err, result) => {
                        if (result) {
                            const user = { email };
                            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                            
                            // Save the token to the user's document in the database
                            loggedUser.token = accessToken;
                            loggedUser.save()
                                .then(() => {
                                    res.json({ accessToken, ok: true });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ message: "Error saving token", ok: false });
                                });
                        } else {
                            res.json({ message: "Email or password is incorrect!", status: 401, ok: false }).status(401);
                        }
                    });
                } else {
                    res.status(404).json({ message: "No user found!" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error finding user", ok: false });
            });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Server error", ok: false });
    }
});

//email
app.post('/send-email', async(req, res) => {
    try {
        const { to, subject, text } = req.body;
    
        if (!to || !subject || !text) {
          return res.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        // Configure the transporter
        let transporter = nodemailer.createTransport({
          service: "gmail", 
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, 
          },
        });
    
        let mailOptions = {
          from: process.env.EMAIL_USER,
          to,
          subject,
          text,
        };
    
        let info = await transporter.sendMail(mailOptions);
    
        return res.json({ success: true, message: "Email sent", info });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.json({ error: "Internal server error" }, { status: 500 });
      }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403);

        req.user = user;
        next();
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})