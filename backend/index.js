import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from 'cors';
import crypto from 'crypto';
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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: hashedPassword,
        };
        const newUser = new Customer(user);
        await newUser.save();
        res.status(201).json({ ok: true });
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

app.delete('/deleteData',authenticateToken , async (req, res) => {
    try{
        await Service.deleteMany({email: req.user.email});
        res.json({ok:true})
    }catch(err){
        res.status(403).send(err)
    }

})

app.delete('/removeService/:id',authenticateToken , async (req, res) => {
    const {id} = req.params;
    try{
        await Service.deleteOne({_id: id});
        res.json({ok:true})
    }catch(err){
        res.status(403).send(err)
    }

})

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
                            res.json({ accessToken, ok: true });
                        } else {
                            res.json({ message: "email or password is incorrect!", status: 401, ok: false }).status(401);
                        }
                    });
                } else {
                    res.status(404).json({ message: "No user found!" });
                }
            })
    } catch (e) {
        console.log(e.message)
    }
});

const generateReceipt = () => {
    const timestamp = Date.now().toString();
    const randomNum = crypto.randomBytes(3).toString('hex'); // Generates a 6 character hex string
    return `receipt_${timestamp.slice(-4)}${randomNum.slice(0, 4)}`;
};

app.post('/orders', async (req, res) => {
    const { totalAmount } = req.body;
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZOR_PAY_APIKEY,
            key_secret: process.env.RAZOR_PAY_SECRET,
        });

        const receipt = generateReceipt();

        const options = {
            amount: totalAmount * 100, 
            currency: "INR",
            receipt: receipt,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occurred");

        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send(error);
    }
});

app.get('/getKey', (req, res) => {
    res.json(process.env.RAZOR_PAY_APIKEY)
})

app.get('/getEmailKeys',(req,res) => {
    const emailData = {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        secrectID:  process.env.EMAILJS_SERVICE_ID,
        templateID: process.env.EMAILJS_TEMPLATE_ID
    }
    res.json(emailData)
})

app.get('/payment/:id', async(req,res) => {
    const {id} = req.params;
    try{
        const instance = new Razorpay({
            key_id: process.env.RAZOR_PAY_APIKEY,
            key_secret: process.env.RAZOR_PAY_SECRET,
        });

        const payment = await instance.payments.fetch(id);

        if(!payment) res.status(500).json("Error at razorpay fetching!")

            res.json({
                method: payment.method,
                amount: payment.amount,
                currency: payment.currency
            })

    }catch(err){
        res.status(501).send(err)
    }
})

app.post("/success", async (req, res) => {
    try {

        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RAZOR_PAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });


        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });

    } catch (error) {
        res.status(500).send(error);
    }
});

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