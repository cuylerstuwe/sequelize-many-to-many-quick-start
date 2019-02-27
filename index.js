const Sequelize = require('sequelize');
const secrets = require('./secrets');

const sequelize = new Sequelize('test', 'root', secrets.dbPassword, {
    host: "localhost",
    dialect: "mysql"
});

const Puppy = sequelize.define("puppy", {
    name: {type: Sequelize.STRING},
    age: {type: Sequelize.INTEGER}
});

const Human = sequelize.define("human", {
    name: {type: Sequelize.STRING},
    age: {type: Sequelize.INTEGER}
});

Puppy.belongsToMany(Human, {through: "PuppyHumanConnection"});
Human.belongsToMany(Puppy, {through: "PuppyHumanConnection"});

async function main() {

    await sequelize.sync();

    const spot = await Puppy.create({name: "Spot", age: 1});
    const spike = await Puppy.create({name: "Spike", age: 2});

    const bob = await Human.create({name: "Bob", age: 46});
    const jane = await Human.create({name: "Jane", age: 26});

    spot.addHuman(bob);
    spot.addHuman(jane);

    spike.addHuman(jane);
}

main();
