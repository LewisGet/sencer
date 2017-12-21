exports._ = require("ljSence");

exports.sence     = new exports._.sence();
exports.explosion = new exports._.explosion(exports.sence);
exports.block     = new exports._.block(exports.sence);
exports.sentity   = new exports._.entity(exports.sence);
exports.lightning = new exports._.lightning(exports.sence);
exports.resource  = new exports._.resource(exports.sence);
exports.fly       = new exports._.fly(exports.sence);
exports.hurt      = new exports._.hurt(exports.sence);

/**
    爆炸方塊飛行特效
*/
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

exports.sence2_1_explosion = function () {
    var kevin = exports.sence.getKevinEntity();
    exports.explosion.create(kevin.location, 5);
};

exports.sence2_1_spawn_all = function () {
    for (var i = 0; i < 10; i++)
    {
        exports.sentity.create([35 + parseInt((Math.random() - 0.5) * 100), 4, -561 + parseInt((Math.random() - 0.5) * 100)], exports.sentity.type.ZOMBIE);
    }
};

exports.sence2_1_spawn_1 = function () {
    exports.sentity.create([35, 4, -561], exports.sentity.type.ZOMBIE);
};

exports.sence2_1_spawn_2 = function () {
    exports.sentity.create([55, 4, -529], exports.sentity.type.ZOMBIE);
};

exports.sence2_1_spawn_3 = function () {
    exports.sentity.create([22, 4, -569], exports.sentity.type.ZOMBIE);
};

// 永夜
/**
setInterval(function(){
    var world = (server.getWorlds())[0];
    world.setFullTime(90000);
}, 1000);
*/
