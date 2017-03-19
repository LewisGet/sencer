exports.sence = function(basicEntity) {
    this.world = basicEntity.world;
    this.entity = basicEntity;

    this.locationToArray = function (value) {
        return [value.x, value.y, value.z];
    };

    this.createLocation = function (value) {
        return new org.bukkit.Location(this.world, value[0], value[1], value[2]);
    };

    this.getKevinEntity = function () {
        return org.bukkit.Bukkit.getPlayer("KevinWus");
    };

    this.getLewisEntity = function () {
        return org.bukkit.Bukkit.getPlayer("LewisJang");
    };

    this.lineXExecute = function (start, level, diff, execute_function) {
        var x = location.x;
        var y = location.y;
        var z = location.z;

        for (var execute_index = 0; execute_index < level; execute_index += diff)
        {
            var execute_location = [
                x + execute_index,
                y,
                z
            ];

            execute_location = this.createLocation(execute_location);

            execute_function(execute_location);
        }
    };

    this.lineZExecute = function (start, level, diff, execute_function) {
        var x = location.x;
        var y = location.y;
        var z = location.z;

        for (var execute_index = 0; execute_index < level; execute_index += diff)
        {
            var execute_location = [
                x,
                y,
                z + execute_index
            ];

            execute_location = this.createLocation(execute_location);

            execute_function(execute_location);
        }
    };

    this.area2DExecute = function (location, level, diff_x, diff_z, execute_function) {
        var x = location.x;
        var y = location.y;
        var z = location.z;

        for (var execute_x_index = 0; execute_x_index < level; execute_x_index += diff_x)
        {
            for (var execute_z_index = 0; execute_z_index < level; execute_z_index += diff_z)
            {
                var execute_location = [
                    x + execute_x_index,
                    y,
                    z + execute_z_index
                ];

                execute_location = this.createLocation(execute_location);

                execute_function(execute_location);
            }
        }
    };

    this.area3DExecute = function (location, level, diff_x, diff_y, diff_z, execute_function) {
        var x = location.x;
        var y = location.y;
        var z = location.z;

        for (var execute_y_index = 0; execute_y_index < level; execute_y_index += diff_x)
        {
            var execute_location = [
                x + execute_x_index,
                y,
                z + execute_z_index
            ];

            execute_location = this.createLocation(execute_location);

            this.area2DExecute(execute_location, level, diff_x, diff_z, execute_function);
        }
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
