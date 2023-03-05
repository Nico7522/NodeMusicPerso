const { Sequelize } = require("sequelize");

// Récupération des variables d'environnement

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialisation Sequelize

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: "mariadb", // Pour travailler avec Sequelize, à changer si on veut un autre language et installer la librairie correspondante
});

// Création de l'objet DB

const db = {};

// Ajout de l'instance sequelize créee précédemment sur l'objet DB
db.sequelize = sequelize;

// Liaison modèles <-> DB

db.Genre = require("./genre.model")(sequelize);
db.Album = require("./album.model")(sequelize);
db.Artist = require("./artist.model")(sequelize);
db.Track = require("./track.model")(sequelize);
db.MM_Artist_Track = require("./mm_artist_track.model")(sequelize);
db.User = require('./user.model')(sequelize);
// db.MM_User_Like_Track = require('./mm_user_like_track.model')(sequelize);
// Définition des relations

// Track <-> Genre (One to Many)
db.Genre.hasMany(db.Track); // A.hasMany(B) indique une relation entre A et B et la foreign key sera côté B
db.Track.belongsTo(db.Genre); // A.belongTo(B) indique une relation entre A et B et la foreign key sera côté A

// Track <-> Album (Many to Many)
db.Track.belongsToMany(db.Album, { through: "MM_Album_Track" });
db.Album.belongsToMany(db.Track, { through: "MM_Album_Track" });
// A.belongsToMany(B, {through : C}) indique une relation entre A et B via une table intermédiaire où on aura deux foreign key, renvoyant à A (et B).

// Track <-> Artist (Many to Many avec attribut)

// Comme on a un attribut en plus, on crée un model, on l'associe à DB et dans le lien, plutôt que de mettre un nom pour la table intermédiaire, on met notre modèle.
db.Track.belongsToMany(db.Artist, { through: db.MM_Artist_Track });
db.Artist.belongsToMany(db.Track, { through: db.MM_Artist_Track });

// User <-> Track

db.Track.belongsToMany(db.User, { through: "MM_User_Like_Track" });
db.User.belongsToMany(db.Track, { through: "MM_User_Like_Track" });

// Export de DB

module.exports = db;
