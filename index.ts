const fs = require('fs');
const ID3Writer = require('browser-id3-writer');
const path = require('path');
const songList = require("./songList");

const getVideoId = (link: any) : boolean => {

    const url: any = new URL(link); // establish as url so we can parse

    const videoId: string = url.searchParams.get('v');
    if(videoId == undefined || videoId == null ){ // check if videoId found
        return false; 
    }
    return true;
}


// https://github.com/egoroof/browser-id3-writer#add-a-tag

const tagChange = (fileName: string, songInfo : any) => {
    // this is hardcoded for now to use just one song
    const songsFolder = path.join(__dirname, 'songs');


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

function validate(songInfo: object) : boolean{
    console.log("We're checking song requirements")

    // create a song interface
    // we port the values from songInfo into an interface
    // to make sure all of the requirements are met
        // ( contains link, song name, artistname)
    // if the interface is valid we return true

    // if not return false and print the missing attributes
    return true;
}

function downloadCheck(songInfo): boolean{
    console.log("Checking to see if we need to download a song or cover");

    // we need to check the link attribute to see if it's a youtube link or mp3
    // if its a youtube link we need to download
    // if the image is a url we need to download

    // only return true if the cover or the song needs to be downloaded
    return true;
}

function download(song : string = null, cover : string = null): boolean{
    // check song and cover to see if they're not null

    // return true only if the downloads were successful
    return true
}


function main(){
    const songs = songList.songs;
    for(var x = 0; x < songs.length; x++){
        var validated = validate(songs[x]);
        if(!validated){
            console.log("The given song info is not valid")
            return
        }
        var anyDownloads = downloadCheck(songs[x]);
        if(anyDownloads){
            var link
            download()
        }

        // tagChange can only be met if we've downloaded the song already
        tagChange("tyrus",songs[x]);
    }
}
main()
const songA = {
    title: 'Wind In My Sails',
    artist: ['Earl Sweatshirt'],
    album: 'Wind In My Sails',
    trackNum: '1',
    genre: ['Rap']
}
// tagChange("Earl Sweatshirt - Wind In My Sails.mp3", songA);