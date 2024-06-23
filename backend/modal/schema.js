import mongoose from "mongoose";
import { Schema } from "mongoose";

const customerSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})

export const Customer = mongoose.models.customers || mongoose.model('customers', customerSchema);

const serviceSchema = new Schema({
    email: { type: String},
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
    shraddhaAmount: { type: Number}
});

export const Service = mongoose.models.services || mongoose.model('services', serviceSchema);
