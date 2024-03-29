/**Packages */
const mongoose = require("mongoose");

/**Using Schemas */
const schema = require("../schemas/teacher.Schema");

schema.statics = {
    create: function (data, cb) {
        let doc = new this(data);
        doc.save(cb);
    },
    getAll: function (query, cb) {
        this.find(query, cb);
    },
    getByDocumento: function (query, cb) {
        this.find(query, cb);
    },
    update: function (query, data, cb) {
        this.findOneAndUpdate(query, { $set: data }, { new: true }, cb);
    },
    delete: function (query, cb) {
        this.findOneAndDelete(query, cb);
    }

};
const dto = mongoose.model("coll_teacher", schema);
module.exports = dto;