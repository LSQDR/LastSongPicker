import { songData } from './scripts/data.js'

const genreRadios = document.getElementById("genre-radios")
const surpriseMeBtn = document.getElementById("surprise-me")
const getSongBtn = document.getElementById("get-song-btn")
const indieOnlyOption = document.getElementById("indie-only-opt")

const songModal = document.getElementById("song-modal")
const songModalInner = document.getElementById("song-modal-inner")
const closeModalBtn = document.getElementById("modal-close-btn")

closeModalBtn.addEventListener("click", closeModal)

getSongBtn.addEventListener("click", function(){
    const song = getSingleSongObject()
    renderSong(song)
})

surpriseMeBtn.addEventListener("click", function(){
    const song = getRandomSongObject()
    renderSong(song)
})

function renderSong(func){
 const songObject = func
 songModalInner.innerHTML = `
    <p class="song-details">Title: ${songObject.title}</p>
    <p class="song-details">Artists: ${songObject.artist}</p>
    ${songObject.link}
 `
    songModal.style.display = 'flex'
    indieOnlyOption.parentElement.classList.add('hidden')
    indieOnlyOption.checked = false
    getSongBtn.classList.add('hidden')

    renderGenreRadios(songData)
}

function getSingleSongObject(){
    const songsArray = getMatchingSongsArray()

    if(songsArray.length === 1){
        return songsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * songsArray.length)
        return songsArray[randomNumber]
    }
}

    
function getMatchingSongsArray(){    
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedGenre = document.querySelector('input[type="radio"]:checked').value
        const isIndie = indieOnlyOption.checked

        const matchingSongsArray = songData.filter(function(song){
            if(isIndie){
                return song.genresTag.includes(selectedGenre) && song.isIndie
            }
            else {
                return song.genresTag.includes(selectedGenre)
            }
        })
        return matchingSongsArray
    }
    
    
}

function getRandomSongObject(){
    let allSongsArray = []
    
    for (let song of songData){
        allSongsArray.push(song)

    }
    const randomNumber = Math.floor(Math.random() * allSongsArray.length)
    return allSongsArray[randomNumber]

}

function closeModal(){
    songModal.style.display = 'none'
    indieOnlyOption.parentElement.classList.remove('hidden')
    getSongBtn.classList.remove('hidden')
    songModalInner.innerHTML = ""
}

function getGenresArray(songs) {
    const genresArray = []
    for (let song of songs) {
        for (let genre of song.genresTag) {
            if (!genresArray.includes(genre)){
                genresArray.push(genre)
            }
        }
    }
    return genresArray
}


function renderGenreRadios(genre){

    let radioItems = ``
    const genres = getGenresArray(genre)
    for (let genre of genres){
        radioItems += `
        <div class="radio">
            <label for="${genre}">${genre}</label>
            <input 
            type="radio" 
            id="${genre}" 
            value="${genre}" 
            name="genres"
            >
        </div>
        `
    }
    genreRadios.innerHTML = radioItems

}

renderGenreRadios(songData)
