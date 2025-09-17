import { songData } from './scripts/data.js'

const genreRadios = document.getElementById("genre-radios")
const surpriseMeBtn = document.getElementById("surprise-me")
const getSongBtn = document.getElementById("get-song-btn")
const indieOnlyOption = document.getElementById("indie-only-opt")

const songModal = document.getElementById("song-modal")
const songModalInner = document.getElementById("song-modal-inner")
const closeModalBtn = document.getElementById("modal-close-btn")

closeModalBtn.addEventListener("click", closeModal)

getSongBtn.addEventListener("click", renderSong)

// surpriseMeBtn.addEventListener("click", renderSong)

function renderSong(){
 const songObject = getSingleSongObject()
 songModalInner.innerHTML = `
    <p class="song-details">Title: ${songObject.title}</p>
    <p class="song-details">Artists: ${songObject.artist}</p>
    ${songObject.link}
 `
    songModal.style.display = 'flex'
    indieOnlyOption.parentElement.classList.add('hidden')
    getSongBtn.classList.add('hidden')
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


function closeModal(){
    songModal.style.display = 'none'
    indieOnlyOption.parentElement.classList.remove('hidden')
    getSongBtn.classList.remove('hidden')
    songModalInner.innerHTML = ""
    console.log("bruh")
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
