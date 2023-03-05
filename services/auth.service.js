const argon2 = require("argon2");
const { UserDTO } = require("../dto/user.dto");
const db = require("../models");

// 2 façons de faire : un service User + un service Auth et les 2 controllers associés
// Ou un seul service UserService
const authService = {
  register: async (userToAdd) => {
    // Hashage du password
    const hashPsw = await argon2.hash(userToAdd.password);
    // Remplacement du password sur le userToAdd
    userToAdd.password = hashPsw;

    // Ajour en DB
    const user = await db.User.create(userToAdd);

    return user ? new UserDTO(user) : null;
  },

  login: async (email, password) => {
    // Récupérer l'utilisateur qui possède cet email
    const user = await db.User.findOne({ where: { email } });
    // Si vérif pas ok -> return null
    console.log("email", email);
    if (!user) {
      return null;
    }

    // Si utilisateur
    // Vérifier que le password entré = password hashé
    const isValid = await argon2.verify(user.password, password); // On compare le password en db (hashé) au password entré pour se connecter (en clair), si les 2 concordent, argon.verify renvoie true, sinon false

    // Si vérif pas ok -> return null
    if (!isValid) {
      return null;
    }
    // Si vérif ok -> renvoie le user
    return new UserDTO(user);
  },
};

module.exports = authService;
