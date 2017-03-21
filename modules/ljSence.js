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

        if (x.length == 0) { x = [basic[0]]; }
        if (y.length == 0) { y = [basic[1]]; }
        if (z.length == 0) { z = [basic[2]]; }

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
        if (Array.isArray(location))
        {
            location = this.sence.createLocation(location);
        }

        location.block.setTypeId(typeid);
        location.block.setData(data);
    };

    this.setBasic = function (location, typeid) {
        this.set(location, typeid, 0);
    };
};
