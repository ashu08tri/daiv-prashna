import mongoose from "mongoose";
import { Schema } from "mongoose";

const customerSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["Admin", "Customer"], default: "Customer" },
    token: String
})

export const Customer = mongoose.models.customers || mongoose.model('customers', customerSchema);

const serviceSchema = new Schema({
    email: { type: String },
    name: String,
    place: String,
    reason: String,
    country: String,
    date: { type: Date },
    appDate: { type: Date },
    time: String,
    gender: String,
    nationality: String,
    organization: String,
    yogaType: String,
    vastuType: String,
    poojaType: String,
    astrologyType: String,
    shraddhaType: String,
    astroAmount: { type: Number },
    yogaAmount: { type: Number },
    vastuAmount: { type: Number },
    poojaAmount: { type: Number },
    shraddhaAmount: { type: Number },
    paid: {type: Boolean, default: false}
});

export const Service = mongoose.models.services || mongoose.model('services', serviceSchema);

const TestimonialSchema = new mongoose.Schema({
    name: String,
    review: String,
    image: String,
    rating: Number,
});

export const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

const MediaSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
});
export const Media = mongoose.model("Media", MediaSchema);

const ArticleSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
});

export const Article = mongoose.model("Article", ArticleSchema);

