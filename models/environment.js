const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const environmentSchema = new Schema({
    email: { type: String, required: false },
    envName: { type: String, required: true },
    envType: { type: Number, default: 1 },
    description: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminPassword: { type: String, required: true }
});

const Environment = mongoose.model("Environment", environmentSchema);

module.exports = Environment;
