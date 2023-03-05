const {AlbumDTO} = require("./album.dto");
const {ArtistTrackDTO} = require('./artist.dto')
class TrackDTO {
  constructor({ id, title, duration, Genre, Albums, Artists }) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.genre = Genre;
    this.albums = Albums ? Albums.map(album => new AlbumDTO(album)) : [];
    this.artists = Artists ? Artists.map(artist => new ArtistTrackDTO(artist)): [];
  }
}

module.exports = {TrackDTO};
