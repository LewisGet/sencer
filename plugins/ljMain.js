exports._ = require("ljSence");

exports.sence     = new exports._.sence();
exports.explosion = new exports._.explosion(exports.sence);
exports.block     = new exports._.block(exports.sence);
exports.sentity   = new exports._.entity(exports.sence);
exports.lightning = new exports._.lightning(exports.sence);
exports.resource  = new exports._.resource(exports.sence);
exports.fly       = new exports._.fly(exports.sence);
exports.hurt      = new exports._.hurt(exports.sence);
exports.sitem     = new exports._.item(exports.sence);

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

events.playerChat(function (e) {
    //console.log(e.player);
    //console.log(e.message);

    // if type "c" to call fly
    /**
    if (e.message == "fly")
    {
        // do something
    }
    */
});

events.playerItemHeld(function (e) {
    //console.log(e.getNewSlot());

    // e.getNewSlot() 0 -> 8

    // if take first item will fly
    /**
    if (e.getNewSlot() == 0)
    {
        // do something
    }
    */

    // if player hold is dirt
    /**
    if (e.player.itemInHand.typeId == 3)
    {
        // do something
    }
    */
});
