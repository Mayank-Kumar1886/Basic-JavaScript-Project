const input = document.querySelector("#input");
const Btn = document.querySelector("#Btn");
const output = document.querySelector("#meaning");

Btn.addEventListener('click',async()=>{
    const value = input.value;
    if(value === ""){
        alert("Please enter a word");
    }
    else{
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
        let meaning = await fetch(url);
        meaning = await meaning.json();
        output.textContent = meaning[0]['meanings'][0]["definitions"][0]["definition"]
    }
})