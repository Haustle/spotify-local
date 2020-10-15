// in order for a song to complete or elgible 

// requirements:
    // link (youtube link, or .mp3 file) : string
    // song title : string
    // artist name : String[] put artist or producer here
// other
    // cover : string
    // album : string
    // track number : int
    // genre : string

 const songs = [
    {
        link: "https://youtu.be/FmdbshoVkX4",
        cover: 'https://i1.sndcdn.com/artworks-000635319700-i0bjpg-t500x500.jpg',
        title: 'Black Emperor',
        artist: ["Earl Sweatshirt"],
        genre: 'Rap'
    },
    {
        link: "https://www.youtube.com/watch?v=es5kXMW7sew",
        cover: "https://images.rapgenius.com/ba9649834fe2c4b933132270882c3c1e.500x500x1.jpg",
        title: "Wind in My Sails",
        artist: ["Alchemist","Earl Sweatshirt"],
        album: "Wind in Sails",
        genre: 'Rap'
    },
    {
        link: "jeans.mp3",
        cover: "https://sharegoodvibes.files.wordpress.com/2016/03/a1f0f-12912415_585823724912748_1144921058_n.jpg?w=640",
        title: "Balmain Jeans",
        artist: ["Lil Yachty", "Playboi Carti"],
        genre: 'Rap'
    }

]

exports.songs = songs;