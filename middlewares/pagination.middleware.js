const { Request, Response, NextFunction } = require("express");

/**
 * Fonctions middleware Pagination
 * @param {{ dafaultLimit: number?, maxLimit: number? }? } options
 * @returns {( req: Request , res: Response , next: NextFunction ) => undefined }
 */
const pagination = (options) => {
  // Récup des options fournies lors de l'utilisation du middleware dans la route
  // Si on a des options et si sur ces options on a la propriété defaultLimit qui a été fournie, on prend la valeur qui est dedans, sinon on met 20.
  const defaultLimit = options?.dafaultLimit ?? 20;
  // Si on a des options et si sur ces options on a la propriété defaultLimit qui a été fournie, on prend la valeur qui est dedans, sinon on met 50.
  const maxLimit = options?.maxLimit ?? 50;
  /**
   * Middleware Pagination
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  return (req, res, next) => {
    // Récupération des options éventuellement données dans la query de la requête
    const reqOffset = parseInt(req.query.offset);
    const reqLimit = parseInt(req.query.limit);

    // Vérification des valeurs de la requête et définition des vrais offset et limit
    // Si l'offset n'a pas été fourni dans la requête, si il est mal écrit (lettre) ou su c'est plus petit que 0, on met l'offset à 0 par faut, sinon on met la valeur de ka query
    const offset = (isNaN(reqOffset) || reqOffset < 0) ? 0 : reqOffset;
    // Si la limit n'a pas été fournie dans la requête ou si mal écrit ou plus petit = à 0, on met la valeur par défaut précalculée.
    // Sinon on met la valeur la plus petite entre la limite fournie dans la query et la limite max précalculée.
    const limit = (isNaN(reqLimit) || reqLimit <= 0) ? defaultLimit : Math.min(reqLimit, maxLimit);

    // On crée sur l'objet req (la requête) une noubelle prop pagination qui va contenir offset et limit
    req.pagination = { offset, limit }
    // Appel de la fonction next() pour continuer la requête
    next()
  };
};

module.exports = pagination;
