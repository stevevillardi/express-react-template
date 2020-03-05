const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailboxSchema = new Schema({
    email: { type: String, required: true },

    sourceEnv: { type: String, required: true },
    // sourceEnvType: { type: Number, default: 1 },
    // sourceDescription: { type: String, required: false },
    // sourceAdminEmail: { type: String, required: true },
    // sourceAdminPassword: { type: String, required: true },

    targetEnv: { type: String, required: true },
    // targetEnvType: { type: Number, default: 1 },
    // targetDescription: { type: String, required: false },
    // targetAdminEmail: { type: String, required: true },
    // targetAdminPassword: { type: String, required: true },

    sourceEmail: { type: String, required: true },
    targetEmail: { type: String, required: true },
    mailboxSize: { type: String, default: "0.0GB" },
    itemCount: { type: Number, default: 0 },
    migrationStatus: { type: String, default: "Not Started" }
});

const Mailbox = mongoose.model("Mailbox", mailboxSchema);

module.exports = Mailbox;
