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
                        <ul>
                           <li>1.${ai.features[0]}</li>
                           <li>2.${ai.features[1]}</li>
                           <li>3.${ai.features[2] ? ai.features[2] : ""}</li
                       </ul>
                    </div><br><br>
                    <hr>
                    <div class="ml-3 mt-4 mb-7">
                    <span class="font-bold ">${ai.name}</span><br>
                    <div class="flex items-center justify-between">
                       <div class="flex gap-2">
                       <img src="images/calender.png" alt="" class="w-5">
                       <span>${ai.published_in}</span>
                       </div>
                       <button class="btn btn-error"><i class="fas fa-arrow-right text-red"></i></button>
                    </div>
                  </div>
        `
        aiContainer.appendChild(aiDiv);
    });
}

loadAi(6);

document.getElementById("show-all").addEventListener('click', function(){
    loadAi();
    showAll.classList.add('hidden');
})