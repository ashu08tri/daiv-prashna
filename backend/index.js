import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import bodyParser from "body-parser";
import cors from 'cors';
import multer from "multer";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { Testimonial, Media, Article } from "./modal/schema.js";

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
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

app.post('/register', async (req, res) => {

    try {
        const existedUser = await Customer.find({ email: req.body.email });
        if (existedUser) res.json({ user: "User exist" });
        else {
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

app.get('/userData', authenticateToken, async (req, res) => {
    try {
        const services = await Service.find({ email: req.user.email });
        res.json({ services })
    } catch (err) {
        res.status(500).send(err)
    }
});

app.post('/userData', authenticateToken, async (req, res) => {
    const payload = { ...req.body, email: req.user.email };
    try {
        const service = new Service(payload);
        await service.save();
        res.json({ service, ok: true })
    } catch (err) {
        console.log(err)
    }
});

app.delete('/deleteData', async (req, res) => {
    try {
        await Service.deleteMany({ email: req.user.email });
        res.json({ ok: true })
    } catch (err) {
        res.status(403).send(err)
    }

})

app.delete('/removeService/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Service.deleteOne({ _id: id });
        res.json({ ok: true })
    } catch (err) {
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const loggedUser = await Customer.findOne({ email: email });

        if (!loggedUser) {
            return res.status(404).json({ message: "No user found!", ok: false });
        }

        const isMatch = await bcrypt.compare(password, loggedUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email or password is incorrect!", ok: false });
        }

        // Include role in the token
        const user = { email: loggedUser.email, role: loggedUser.role };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        // Save the token to the database
        loggedUser.token = accessToken;
        await loggedUser.save();

        res.json({ accessToken, role: loggedUser.role, ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", ok: false });
    }
});


//email
app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, text } = req.body;

        if (!to || !subject || !text) {
            return res.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Configure the transporter
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        transporter.verify((error, success) => {
            if (error) {
                console.error("SMTP Error:", error);
            } else {
                console.log("SMTP is ready to send emails!");
            }
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

// Create Testimonial
app.post("/testimonials", authenticateToken, upload.single("image"), async (req, res) => {
    try {
        const { name, review, imageUrl, rating } = req.body;
        
        let imagePath = "";
        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 
        } else if (imageUrl) {
            imagePath = imageUrl; 
        } else {
            return res.status(400).json({ error: "No image provided" });
        }

        const testimonial = new Testimonial({
            name, review,
            image: imagePath, 
            rating
        });

        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Testimonials
app.get("/testimonials", async (req, res) => {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
});

// Update Testimonial
app.put("/testimonials/:id", authenticateToken, upload.single("image"), async (req, res) => {
    try {
        const { name, review, imageUrl, rating } = req.body;
        const { id } = req.params; 

        let imagePath = imageUrl; 

        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const updateFields = { name, review, rating };
        if (imagePath) updateFields.image = imagePath;

        const testimonial = await Testimonial.findByIdAndUpdate(id, updateFields, { new: true });

        if (!testimonial) {
            return res.status(404).json({ error: "Testimonial not found" });
        }

        res.status(200).json(testimonial); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Testimonial
app.delete("/testimonials/:id", authenticateToken, async (req, res) => {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully", ok: true });
});


// Create Articles
app.post("/article", authenticateToken, upload.single("image"), async (req, res) => {
    try {
        const { title, author, imageUrl } = req.body;
        
        let imagePath = "";
        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 
        } else if (imageUrl) {
            imagePath = imageUrl; 
        } else {
            return res.status(400).json({ error: "No image provided" });
        }

        const article = new Article({
            title,
            author,
            image: imagePath, 
        });

        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Articles
app.get("/article", async (req, res) => {
    const article = await Article.find();
    res.json(article);
});

// Update Articles
app.put("/article/:id", authenticateToken, upload.single("image"), async (req, res) => {
    try {
        const { title, author, imageUrl } = req.body;
        const { id } = req.params; 

        let imagePath = imageUrl; 

        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const updateFields = { title, author };
        if (imagePath) updateFields.image = imagePath;

        const article = await Article.findByIdAndUpdate(id, updateFields, { new: true });

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.status(200).json(article); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Articles
app.delete("/article/:id", authenticateToken, async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
});


// Create Media
app.post("/media", authenticateToken, upload.single("image"), async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        
        let imagePath = "";
        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 
        } else if (imageUrl) {
            imagePath = imageUrl; 
        } else {
            return res.status(400).json({ error: "No image provided" });
        }

        const media = new Media({
            title,
            description,
            image: imagePath, 
        });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Media
app.get("/media", async (req, res) => {
    const media = await Media.find();
    res.json(media);
});

// Update Media
app.put("/media/:id", authenticateToken, upload.single("image"), async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const { id } = req.params; 

        let imagePath = imageUrl; 

        if (req.file) {
            imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const updateFields = { title, description };
        if (imagePath) updateFields.image = imagePath;

        const media = await Media.findByIdAndUpdate(id, updateFields, { new: true });

        if (!media) {
            return res.status(404).json({ error: "Media not found" });
        }

        res.status(200).json(media); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Media
app.delete("/media/:id", authenticateToken, async (req, res) => {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
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