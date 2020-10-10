const fs = require('fs');
const ID3Writer = require('browser-id3-writer');
const path = require('path');


const getVideoId = (link: any) : boolean => {

    const url: any = new URL(link); // establish as url so we can parse

    const videoId: string = url.searchParams.get('v');
    if(videoId == undefined || videoId == null ){ // check if videoId found
        return false; 
    }
    return true;
}

const download = (link: string) : boolean => {
    return true
}

// https://github.com/egoroof/browser-id3-writer#add-a-tag

const tagChange = (fileName: string, songInfo : any) => {
    // this is hardcoded for now to use just one song
    const songsFolder = path.join(__dirname, 'songs');

    // names of the files
    // const songname = fs.readdirSync(songsFolder)[0]
    // const coverName = fs.readdirSync(songsFolder)[1]
    // console.log(coverName);

    // // file dirs with extensions
    const songFile = path.join(__dirname, 'songs', fileName);
    const coverFile = path.join(__dirname, 'songs', 'cover.jpg');

    console.log(`This is path: ${songFile}`);

    const SongBuffer = fs.readFileSync(songFile); // returns buffer of song
    const coverBuffer = fs.readFileSync(coverFile)
    const writer = new ID3Writer(SongBuffer);


    writer.setFrame('TIT2',songInfo.title) // set song name
        .setFrame('TPE1',songInfo.artist) // artist must be a list
        .setFrame('TALB', songInfo.album ?? songInfo.title)
        .setFrame('TCON', songInfo.genre)
        .setFrame('APIC', {
            type: 3,
            data: coverBuffer,
            description: 'Super Picture'
        })
    writer.addTag();
    const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
    fs.writeFileSync(songFile, taggedSongBuffer)

}
const songA = {
    title: 'Wind In My Sails',
    artist: ['Earl Sweatshirt'],
    album: 'Wind In My Sails',
    trackNum: '1',
    genre: ['Rap']
}
tagChange("Earl Sweatshirt - Wind In My Sails.mp3", songA);