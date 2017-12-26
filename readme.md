demo code

```js
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
setInterval(function(){
    var world = (server.getWorlds())[0];
    world.setFullTime(90000);
}, 1000);

exports.demo_fly_block = function (entity, block_id) {
    var fly = new exports._.fly(exports.sence);


    // small fly
    var fly_vec = fly.entity_direction_vec([3, 1, 3]);

    fly.fly_block_with_player(sence.getLewisEntity(), block_id, 0, fly_vec);
};

```