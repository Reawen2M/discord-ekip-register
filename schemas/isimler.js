const { Schema, model } = require("mongoose");

const schema = Schema({
	guildID: { type: String, default: "" },
	userID: { type: String, default: "" },
	isimler: { type: Array, default: [] },
	yetkili: {type: String, default: ""}
});

module.exports = model("isimler", schema);