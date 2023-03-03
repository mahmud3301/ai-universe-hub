const loadAi = async(limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAi(data.data.tools, limit);
    console.log(data.data.tools, limit);
}

const showAll = document.getElementById('show-all');

const displayAi = (ais, limit) => {
    const aiContainer = document.getElementById("ai-container");
    aiContainer.innerHTML = "";
    if( limit > 0 && ais.length > limit) {
        ais = ais.slice(0, limit);
        showAll.classList.remove('hidden');
    }

    ais.forEach(ai => {
        const aiDiv = document.createElement("div");
        aiDiv.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl p-5">
                    <figure><img src="${ai.image}" alt="" /></figure>
                    <h1 class="text-2xl font-bold mt-2">Features</h1><br>\
                    <div>
                        <ol class="list-decimal pl-5">
                           <li>${ai.features[0]}</li>
                           <li>${ai.features[1]}</li>
                           <li>${ai.features[2] ? ai.features[2] : "No features found"}</li>
                           <li>${ai.features[3] ? ai.features[3] : "No features found"}</li>
                       </ol>
                    </div><br><br>
                    <hr>
                    <div class="ml-3 mt-4 mb-7">
                    <span class="font-bold ">${ai.name}</span><br>
                    <div class="flex items-center justify-between">
                       <div class="flex gap-2">
                       <img src="images/calender.png" alt="" class="w-5">
                       <span>${ai.published_in}</span>
                       </div>
                       <label for="modal" class="btn border-0" style="background-color : #FEF7F7;" onclick="loadAiDetails('${ai.id}')"><i class="fas fa-arrow-right text-error"></i></label>
                    </div>
                  </div>
        `
        aiContainer.appendChild(aiDiv);
    });
}


const loadAiDetails = async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // fetch(url).then(res => res.json()).then(data => displayAiDetails(data.data))
    displayAiDetails(data.data);
};



displayAiDetails = (data) =>{
    const aiDetails = document.getElementById("aiDetails");
    aiDetails.innerHTML+=``
}




















loadAi(6);

document.getElementById("show-all").addEventListener('click', function(){
    loadAi();
    showAll.classList.add('hidden');
})