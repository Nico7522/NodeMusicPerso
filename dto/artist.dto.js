class ArtistDTO {
  constructor({ id, firstname, lastname, birthdate, deathdate}) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname ?? null;
    this.birthdate = birthdate ?? null;
    this.deathdate = deathdate ?? null;
  }
}

class ArtistTrackDTO {
  constructor({ id, firstname, lastname, MM_Artist_Track }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname ?? null;
    this.feat = MM_Artist_Track ? MM_Artist_Track.feat : null
  }
}

module.exports = {ArtistDTO, ArtistTrackDTO};
