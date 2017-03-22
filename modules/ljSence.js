exports.sence = function() {
    this.nj = require("numjs");
    this.lo = require("lodash");
    this.world = (server.getWorlds())[0];

    this.getKevinEntity = function () {
        return org.bukkit.Bukkit.getPlayer("KevinWus");
    };

    this.getLewisEntity = function () {
        return org.bukkit.Bukkit.getPlayer("LewisJang");
    };

    this.getLocation = function (value) {
        if (value.tolist)
        {
            value = value.tolist();
        }

        if (Array.isArray(value))
        {
            return new org.bukkit.Location(this.world, value[0], value[1], value[2]);
        }

        return new org.bukkit.Location(this.world, value.x, value.y, value.z);
    };

    this.execute = function (location, execute_function) {
        location = this.getLocation(location);

        execute_function(location);
    };

    this.each_execute = function (locations, execute_function) {
        locations.forEach(function(location, index) {
            execute_function(location, index);
        });
    };

    this.rangeXYZ = function (basic, x, y, z) {
        var locations = [];

        nj_basic = this.nj.array(basic);

        x = x.split("~");
        y = y.split("~");
        z = z.split("~");

        x = this.lo.range(parseInt(x[0]), parseInt(x[1]));
        y = this.lo.range(parseInt(y[0]), parseInt(y[1]));
        z = this.lo.range(parseInt(z[0]), parseInt(z[1]));

        if (x.length == 0) { x = [0]; }
        if (y.length == 0) { y = [0]; }
        if (z.length == 0) { z = [0]; }

        x.forEach(function(x_value) {
            y.forEach(function(y_value) {
                z.forEach(function(z_value) {
                    locations.push((nj_basic.add([x_value, y_value, z_value])));
                });
            });
        });

        return locations;
    };
};

exports.explosion = function (sence) {
    this.sence = sence;

    this.create = function (location, level) {
        location = this.sence.getLocation(location);

        this.sence.world.createExplosion(location, level);
    };

    this.createBasic = function (location) {
        this.createExplosion(location, 10);
    };

    this.createKevin = function () {
        this.createBasicExplosion(this.sence.getKevinEntity().location);
    };

    this.createLewis = function () {
        this.createBasicExplosion(this.sence.getLewisEntity().location);
    };
};

exports.block = function (sence) {
    this.sence = sence;

    this.set = function (location, typeid, data) {
        location = this.sence.getLocation(location);

        location.block.setTypeId(typeid);
        location.block.setData(data);
    };

    this.remove = function (location) {
        this.set(location, 0, 0);
    };

    this.removeList = function (locations) {
        var block = this;

        locations.forEach(function(location) {
            block.remove(location);
        });
    };

    this.setList = function (locations, typeid, data) {
        var block = this;

        locations.forEach(function(location) {
            block.set(location, typeid, data);
        });
    };

    this.setBasic = function (location, typeid) {
        this.set(location, typeid, 0);
    };
};

exports.entity = function (sence) {
    this.sence = sence;
    this.type = org.bukkit.entity.EntityType;

    this.create = function (location, type) {
        location = this.sence.getLocation(location);

        return this.sence.world.spawnEntity(location, type);
    };

    this.createList = function (locations, type) {
        var entity = this;

        locations.forEach(function(location) {
            entity.createList(location, type);
        });
    };
};

exports.lightning = function (sence) {
    this.sence = sence;

    this.create = function (location) {
        location = this.sence.getLocation(location);

        this.sence.world.strikeLightning(location);
    };

    this.createList = function (locations) {
        var lightning = this;

        locations.forEach(function(location) {
            lightning.createList(location);
        });
    };
};

exports.resource = function (sence) {
    this.sence = sence;
    this.type = org.bukkit.Material;

    this.create = function (location, type) {
        location = this.sence.getLocation(location);
        var item = new org.bukkit.inventory.ItemStack(type, 1);
        
        this.sence.world.dropItem(location, item);
    };

    this.createList = function (locations, type) {
        var resource = this;

        locations.forEach(function(location) {
            resource.createList(location, type);
        });
    };
};

exports.fly = function (sence) {
    this.sence = sence;
    this.entity;
    this.x = 0;
    this.y = 5;
    this.z = 0;

    this.fly_vec = function () {
        return new org.bukkit.util.Vector(this.x, this.y, this.z);
    };

    this.fly_entity = function () {
        this.entity.setVelocity(this.fly_vec());
    };

    this.fly_lewis = function () {
        this.entity = this.sence.getLewisEntity();

        this.fly_entity();
    };

    this.fly_kevin = function () {
        this.entity = this.sence.getKevinEntity();

        this.fly_entity();
    };

    this.fly_block = function (location, typeid, data) {
        location = this.sence.getLocation(location);

        this.entity = this.sence.world.spawnFallingBlock(location, typeid, data);

        this.fly_entity();
    };

    this.fly_block_with_lewis = function (location, typeid, data) {
        this.fly_block(location, typeid, data);

        this.entity.setPassenger(this.sence.getLewisEntity());
    };

    this.fly_block_with_kevin = function (location, typeid, data) {
        this.fly_block(location, typeid, data);

        this.entity.setPassenger(this.sence.getKevinEntity());
    };
};

exports.hurt = function (sence) {
    this.sence = sence;
    this.entity;

    this.hurt = function () {
        this.entity.playEffect(org.bukkit.EntityEffect.HURT);
    };

    this.hurt_real = function (value) {
        this.entity.setHealth(this.entity.getHealth() - value);
        this.hurt();
    };

    this.hurt_lewis = function () {
        this.entity = this.sence.getLewisEntity();
        this.hurt();
    };

    this.hurt_kevin = function () {
        this.entity = this.sence.getKevinEntity();
        this.hurt();
    };

    this.hurt_lewis_real = function (value) {
        this.entity = this.sence.getLewisEntity();
        this.hurt_real(value);
    };

    this.hurt_kevin_real = function (value) {
        this.entity = this.sence.getKevinEntity();
        this.hurt_real(value);
    };
};
