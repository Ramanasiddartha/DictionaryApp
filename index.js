let boxval=document.querySelector('.inpbox')
let box=document.querySelector('.box')
let baseurl="https://api.dictionaryapi.dev/api/v2/entries/en/"

function searchfunc(){
let val=boxval.value


 
let url=`${baseurl}${val}`
fetch(url)
        .then(response => response.json())
        .then(data => {
            let definition = data[0]?.meanings[0]?.definitions[0]?.definition|| "No definition found";
            let synonyms = data[0]?.meanings[0]?.synonyms?.slice(0, 3) || "No synonyms found";
            let example = data[0]?.meanings[0]?.definitions[0]?.example || "No example found";
            
            let audioIndex = 0;
            let audioUrl = null;
            while (audioIndex < data[0].phonetics.length && !audioUrl) {
                audioUrl = data[0].phonetics[audioIndex]?.audio || null;
                audioIndex++;
            }
            let audioPlayer = audioUrl ? `<audio controls><source src="${audioUrl}" type="audio/mpeg"></audio>` : ""; 



            box.innerHTML = " <h3>Meaning-</h3>" + definition + "<br>" + 
            " <h3>Synonyms-</h3>" + synonyms + "<br>" +
            " <h3>Example-</h3>" + example + "<br> " + 
            " <h3>pronunciation-</h3>" + audioPlayer  ;

            console.log(data)
        })
        .catch(error => console.error(error))

        
}



