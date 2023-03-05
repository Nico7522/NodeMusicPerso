// Import de jsonwebtoken pour pouvoir utiliser la librairie et les méthodes associées

const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } = process.env;

const jwt = {
  // Génération d'un token à partir des infos du user, d'options et d'un secret
  generate: ({ id, role }) => {
    // la génération du token peut échouer, on va renvoyer une promesse lors de la génération pour gérer les erreurs
    return new Promise((resolve, reject) => {
      //#startregien
      // La méthode sign de jsonwebtoken nous permet de crée un token à partir de plusieurs infos -> //sign(pauload, secret, options/headers)
      // payload : les infos qui proviennent de l'utilisateur que l'on veut allez stocker dans notre token.
      // secret : chaine de caractères qui va servir pour le hash, souvent généré aléatoirement, c'est l'API qui détient ce secret pour encoder/décoder le token et cette info ne doit donc jamais apparaitre en clair, dans le code et sur git (on utilisera les variables d'environnements) et ne pas oublié le GITIGNORE

      // options/headers : les 2 noms sont souvent rencontrés, contiendra toutes les options qu'on veut fournir pour créer le token, nous allons utiliser :
      //algorithme : méthode de hash
      //expireIn : durée de vie du token
      //iisuer : MusicAPI : de qui provient le token (API)
      //audience : Angular : a qui est destiné le token (la ou les applis qui vont l'utiliser). Une chaine si une appli et un tableau si plusieurs applis
      //#endregion

      const payload = { id, role };
      const secret = JWT_SECRET;
      const options = {
        algorithm: "HS512", //Méthode de hashage
        expiresIn: "365d",
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      };
      //En plus du payload, secret et options, on aura un callback avec gestion d'erreur ou token si pas d'erreur
      jsonwebtoken.sign(payload, secret, options, (error, token) => {
        //Si y'a une erreur
        if (error) {
          // On reject la promesse
          reject(error);
        }
        // Sinon, on res
        resolve(token);
      });
    });
  },
  // Renvoie des infos de user (payload), à partir d'un token (décodé), d'options et d'un secret
  decode: (token) => {
    if (!token || token === "") {
      // On renvoie directement une promesse rejetée
      return Promise.reject("No token");
    }
    // Si on a un token, là, on renvoie une promesse dans la quelle on promet de faire la vérification
     return new Promise((resolve, reject) => {

        const options = {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE
        }
        //verify (token, secret, header)
        //4ème paramètre, une méthode avec erreur ou payload
        jsonwebtoken.verify(token, JWT_SECRET, options, (error,payload) => {
            if (error) {
                reject(error)
            }
            resolve(payload)
        })
     });
  },
};

module.exports = jwt;
