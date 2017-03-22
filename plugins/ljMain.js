exports._ = require("ljSence");

exports.sence     = new exports._.sence();
exports.explosion = new exports._.explosion(exports.sence);
exports.block     = new exports._.block(exports.sence);
exports.entity    = new exports._.entity(exports.sence);
exports.lightning = new exports._.lightning(exports.sence);
exports.resource  = new exports._.resource(exports.sence);
exports.fly       = new exports._.fly(exports.sence);
exports.hurt      = new exports._.hurt(exports.sence);
