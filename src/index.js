const sequelize = new Sequelize(config);
require("./associations")(sequelize);
