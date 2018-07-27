var np = require("numjs");

if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback){
      for (var i = 0; i < this.length; i++){
        callback.apply(this, [this[i], i, this]);
      }
    };
}

exports.sence = function() {
    this.world = (server.getWorlds())[0];

    this.getKevinEntity = function () {
        return org.bukkit.Bukkit.getPlayer("KevinWus");
    };

    this.getLewisEntity = function () {
        return org.bukkit.Bukkit.getPlayer("LewisJang");
    };

    this.getGoldEntity = function () {
        return org.bukkit.Bukkit.getPlayer("GoldJing");
    };

    this.getXyz = function (value) {
        return [value.x, value.y, value.z].slice();
    };

    this.command = function (value) {
        return server.dispatchCommand(
            org.bukkit.Bukkit.getConsoleSender(), value
        );
    };

    this.getXyzCopyMessage = function (location) {
        
    };

    this.getLocation = function (value, relative, entity) {
        if (typeof(entity) == "undefined")
        {
            entity = self;
        }

        if (typeof(value) == "undefined")
        {
            value = entity.location;

            return new org.bukkit.Location(this.world, value.x, value.y, value.z);
        }

        if (value.tolist)
        {
            value = value.tolist().slice();
        }

        if (Array.isArray(value))
        {
            if (relative)
            {
                var basic_location = entity.location;
                var basic_xyz = [basic_location.x, basic_location.y, basic_location.z].slice();

                value[0] = basic_xyz[0] + value[0];
                value[1] = basic_xyz[1] + value[1];
                value[2] = basic_xyz[2] + value[2];
            }

            return new org.bukkit.Location(this.world, value[0], value[1], value[2]);
        }

        return new org.bukkit.Location(this.world, value.x, value.y, value.z);
    };

    this.getRandomNextToLocation = function (max, min) {
        var xyz = [this.getRandomInt(max, min), this.getRandomInt(max, min), this.getRandomInt(max, min)];

        return this.getLocation(xyz, true);
    };

    this.getRandomInt = function (max, min) {
        var random_val = (Math.random() - 0.5);

        if (random_val < 0)
        {
            max *= -1;
            min *= -1;
        }

        return random_val;
    }

    this.execute = function (location, execute_function) {
        var location = this.getLocation(location);

        execute_function(location);
    };

    this.each_execute = function (locations, execute_function) {
        for (var i = 0; i < locations.length; i++)
        {
            execute_function(locations[i], i);
        }
    };

    this.rangeXYZ = function (x, y, z) {
        var locations = [];

        x_range = x.split("~");
        y_range = y.split("~");
        z_range = z.split("~");

        var lewis = this.getKevinEntity();

        for (var xi = parseInt(x_range[0]); xi <= parseInt(x_range[1]); xi++)
        {
            for (var yi = parseInt(y_range[0]); yi <= parseInt(y_range[1]); yi++)
            {
                for (var zi = parseInt(z_range[0]); zi <= parseInt(z_range[1]); zi++)
                {
                    var location = this.getLocation([xi, yi, zi]);
                    locations.push(location);
                }
            }
        }

        return locations;
    };

    this.getLineLocation = function(a, b, sec, fps) {
        a = this.getXyz(this.getLocation(a));
        b = this.getXyz(this.getLocation(b));

        var frames = sec * fps;

        var locations = np.array([
            this.linspace(a[0], b[0], frames),
            this.linspace(a[1], b[1], frames),
            this.linspace(a[2], b[2], frames)
        ]).T.tolist();

        var return_locations = [];

        locations.forEach(function(location){
            return_locations.push(sence.getLocation(location));
        });

        return return_locations;
    };

    this.animationMove = function(entity, a, b, sec, basic_time, fps) {
        var locations = this.getLineLocation(a, b, sec, fps);

        for (var i = 0; i < locations.length; i++)
        {
            var location = locations[i];
            var excute_time = parseInt((i * (1000 / fps)) + basic_time);

            (function(excute_time, location, entity) {
                setTimeout(function(){
                    entity.teleport(location);
                }, excute_time);
            })(excute_time, location, entity);
        }
    };

    this.linspace = function (a, b, n) {
        if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
        if(n<2) { return n===1?[a]:[]; }
        var i,ret = Array(n);
        n--;
        for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
        return ret;
    };
};

exports.explosion = function (sence) {
    this.sence = sence;

    this.create = function (location, level) {
        location = this.sence.getLocation(location);

        this.sence.world.createExplosion(location, level);
    };

    this.createList = function (locations, level) {
        var explosion = this;

        locations.forEach(function(location) {
            explosion.create(location, level);
        });
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

    this.create = function (location, type, relative) {
        location = this.sence.getLocation(location, relative);

        return this.sence.world.spawnEntity(location, type);
    };

    this.createList = function (locations, type) {
        var entity = this;

        locations.forEach(function(location) {
            entity.createList(location, type);
        });
    };

    this.creeper = function (location, relative) {
        return this.create(location, this.type.CREEPER, relative);
    };

    this.chicken = function (location, relative) {
        return this.create(location, this.type.CHICKEN, relative);
    };

    this.cow = function (location, relative) {
        return this.create(location, this.type.COW, relative);
    };

    this.zombie = function (location, relative) {
        return this.create(location, this.type.ZOMBIE, relative);
    };

    this.endermanTakeBlock = function (enderman, blockLocal) {
        var itemForEnderMan = new org.bukkit.material.MaterialData(blockLocal.block.getTypeId(), blockLocal.block.getData());

        // remove block
        blockLocal.block.setTypeId(0);

        enderman.teleport(blockLocal);

        enderman.carriedMaterial = itemForEnderMan;
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
            lightning.create(location);
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
            resource.create(location, type);
        });
    };
};

exports.fly = function (sence) {
    this.sence = sence;
    this.entity = this.sence.getLewisEntity();
    this.x = 0;
    this.y = 5;
    this.z = 0;

    this.entity_direction_vec = function (motVec, addVec) {
        motVec = (typeof motVec !== 'undefined') ?  motVec : [1, 1, 1];
        addVec = (typeof addVec !== 'undefined') ?  addVec : [0, 0, 0];

        var direction = this.entity.location.direction;
        
        this.x = parseInt(direction.x * motVec[0]) + addVec[0];
        this.y = parseInt(direction.y * motVec[1]) + addVec[1];
        this.z = parseInt(direction.z * motVec[2]) + addVec[2];

        return this.fly_vec();
    };

    this.fly_vec = function (xyz) {
        xyz = (typeof xyz !== 'undefined') ?  xyz : [0, 0, 0];

        if (xyz = [0, 0, 0])
        {
            return new org.bukkit.util.Vector(this.x, this.y, this.z);
        }

        return new org.bukkit.util.Vector(xyz[0], xyz[1], xyz[2]);
    };

    this.fly_entity = function (vec) {
        if (typeof vec == 'undefined')
        {
            this.entity.setVelocity(this.fly_vec());

            return true;
        }

        this.entity.setVelocity(vec);

        return true;
    };

    this.fly_lewis = function (vec) {
        this.entity = this.sence.getLewisEntity();

        this.fly_entity(vec);
    };

    this.fly_kevin = function (vec) {
        this.entity = this.sence.getKevinEntity();

        this.fly_entity(vec);
    };

    this.fly_block = function (location, typeid, data, vec) {
        location = this.sence.getLocation(location);

        this.entity = this.sence.world.spawnFallingBlock(location, typeid, data);

        this.fly_entity(vec);
    };

    this.fly_block_with_player = function (player, typeid, data, vec) {
        var xyz = this.sence.getXyz(player.location);

        // 防止方塊生成時被玩家卡住
        xyz[1] += 3;

        var location = this.sence.getLocation(xyz);
        location.direction = player.location.direction;

        this.fly_block(location, typeid, data, vec);

        this.entity.setPassenger(player);
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
