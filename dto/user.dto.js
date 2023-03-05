

// Attention, on ne veut jamais transmettre le password, il ne sera donc pas présent
class UserDTO {
  constructor({ id, firstname, lastname, email, role }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
   
  }
}
module.exports =  { UserDTO } ;
// Si vous avez une gestion d'ajout de contacts à faire, souvent, on fait un dto en omettant les infos un peu perso (email, adresse, etc) et on ne rend dispo que les infos permettant de trouver le contact/savoir

