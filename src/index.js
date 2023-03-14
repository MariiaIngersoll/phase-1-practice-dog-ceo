console.log('%c HI', 'color: firebrick')
let breeds = []

document.addEventListener("DOMContentLoaded", function () {
    uploadImg()
    loadDogBreeds()

})

function uploadImg() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    fetch(imgUrl)
        .then(res => res.json())
        .then(results => {
            results.message.forEach(image => {
                addImage(image)
            });
        })
}
function addImage(image) {
    const container = document.getElementById("dog-image-container")
    const newImage = document.createElement('img')
    newImage.src = image
    container.append(newImage)
}

function loadDogBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(results => {
            breeds = Object.keys(results.message)
            updateBreedList(breeds)
        })
}
function removeChildren(element) {
    let child = element.lastElementChild
    while(child){
        element.removeChild(child);
        child = element.lastElementChild
    }
    
}
function updateBreedList(breeds) {
    const ul = document.getElementById('dog-breeds')
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))

}
function addBreed(breed) {
    const ul = document.getElementById('dog-breeds')
    let li = document.createElement('li')
    li.textContent = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener("click", addColor)
}
function addColor(event) {
    event.target.style.color = "purple"
}

function addBreedSelectListener() {
    const breedDropDown = document.getElementById("breed-dropdown")
    breedDropDown.addEventListener("change", function (e) {
        updateBreedList(breeds.filter(breed => breed.startWith(e.target.value))
        )
    })
}
