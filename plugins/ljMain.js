exports._ = require("ljSence");

exports.sence     = new exports._.sence();
exports.explosion = new exports._.explosion(exports.sence);
exports.block     = new exports._.block(exports.sence);
exports.sentity   = new exports._.entity(exports.sence);
exports.lightning = new exports._.lightning(exports.sence);
exports.resource  = new exports._.resource(exports.sence);
exports.fly       = new exports._.fly(exports.sence);
exports.hurt      = new exports._.hurt(exports.sence);


var explosion_action = function (event) {
    var blocks = event.blockList();

    for (var i = 0; i < blocks.length; i++)
    {
        var block = blocks[i];

        var x = (Math.random() - 0.5) * 8;
        var y = (Math.random() * 5);
        var z = (Math.random() - 0.5) * 8;

        var fly_block = block.world.spawnFallingBlock(block.location, block.typeId, block.data);

        fly_block.setVelocity(new org.bukkit.util.Vector(x, y, z));

        block.setTypeId(0);
    }
};

events.blockExplode(function (event) {
    explosion_action(event);
});

events.entityExplode(function (event) {
    explosion_action(event);
});
