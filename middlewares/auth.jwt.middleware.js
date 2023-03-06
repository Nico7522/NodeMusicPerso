const userService = require("../services/user.service");
const {ErrorResponse} = require("../utils/error.response");
const jwt = require("../utils/jwt.utils");
//roles, contiendra un tableau avec les différents roles autorisés (ou ne sera pas existant, si pas de rôle précisé et juste besoin d'être connecté)
const authJwt = (roles) => {
      /**
   * Middleware Pagination
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
    return async (req,res,next) => {
        //Le token se trouvera dans les headers de la requête, dans une propriété appelé Authorization, et composée comme telle:
        // "Authorization": "Bearer ...token"

        //étape 1 : récup la valeur dans authorization
        const bearerToken = req.headers.authorization
        console.log('ccccccc', bearerToken);
        //étape 2 : découper ce que l'on vient de récupérer pour n'obtenir que le token

        const token = bearerToken.split(" ")[1]

        //Si pas de token -> l'utilisateur n'est pas connecté
        //On lui renvoie une erreur unauthorized 401

        if (!token || token === '' || token === undefined) {
            res.status(401).json(new ErrorResponse("Vous devez être connecté", 401))
        }
        //On essaie de décoder le token
        const payload = await jwt.decode(token)
        // Si on a reçu un tableau de rôle, on doit vérifier le rôle de l'utilisateur connecté pour voir si il est présent dans le tableau
        if(roles){
            //Nous avons accès dans payload.role, au rôle de l'utilisateur au moment où le token a été crée
            // Si la personne était admin à ce moment là, mais qu'on lui a retiré ce droit en db entre temps, elle aura accès à la reuqête alors qu'elle n'est pas sencée y avoir accès
            //On fera toujours donc une vérif DB plutôt que sur le payload

            // Comme on a accès à l'id via payload.id, on peut faire une requête db, pour récupérer l'utilisateur.
            const connectedUser = await userService.getById(payload.id)
            //Est-ce que le rôle de connectedUser est présent dans le tableau de roles reçu en paramètre
            const canAcces = roles.includes(connectedUser.role)
            //Si le rôle n'est pas dans le tableau de rôle
            if (!canAcces) {
                //On renvoie une erreur Forbidden 403
                res.status(403).json(new ErrorResponse("Acces denied", 403))
                return;
            }

        }
        req.user = payload;
        console.log('requser', req.user);
        next();
    }
}

module.exports = authJwt;