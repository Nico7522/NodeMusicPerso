// DTO -> Data Transfert Object
// On passe souvent (essayez toujours (si c'est possible)) par un DTO pour
// Sécurité : enlever des données à ne pas transmettre au front (ex, un password hashé)
// Avoir plusieurs modèles différents à envoyer au front

class GenreDTO {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

module.exports = { GenreDTO };
