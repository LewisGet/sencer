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

```