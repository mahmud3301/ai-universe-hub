const loadAi = async (limit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  displayAi(data.data.tools, limit);
  // console.log(data.data.tools, limit);
}

const showAll = document.getElementById('show-all');

const displayAi = (ais, limit) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = "";
  if (limit > 0 && ais.length > limit) {
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
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // fetch(url).then(res => res.json()).then(data => displayAiDetails(data.data))
  displayAiDetails(data.data);
  console.log(data.data);
};



const displayAiDetails = (data) => {
  const aiBody = document.getElementById("ai-body")
  aiBody.innerHTML = `
    <div class="card-body">
                  <p class="text-left text-xl font-bold">${data.description}
                  <p>
                  <div class="grid grid-cols-3 ">
                    <div class="card w-24 h-28 bg-base-100 text-neutral-content">
                      <div class="card-body items-center text-center">
                        <p class="text-center text-green-700 font-bold">${data.pricing[0]? data.pricing[0].price : "No Price"}</p>
                        <p class="text-center text-green-700 font-bold">${data.pricing[0] ? data.pricing[0].plan : "No Plan"}</p>
                      </div>
                    </div>
                    <div class="card w-24 h-28 bg-base-100 text-neutral-content">
                      <div class="card-body items-center text-center">
                        <p class="text-center text-yellow-300 font-bold">${data.pricing[1].price ? data.pricing[1].price : "No Price"}</p>
                        <p class="text-center text-yellow-300 font-bold">${data.pricing[1].plan ? data.pricing[1].plan : "No Plan"}</p>
                      </div>
                    </div>
                    <div class="card sm:w-32 w-24 h-28 bg-base-100 text-neutral-content">
                      <div class="card-body items-center text-center">
                        <p class="text-center text-red-800 font-bold"">${data.pricing[2].price ? data.pricing[2].price : "No Price"}</p>
                        <p class="text-center text-red-800 font-bold" >${data.pricing[2].plan ? data.pricing[2].plan : "No Plan"}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-around w-full">
                    <div class="w-full">
                      <h1 class="text-xl font-bold mt-5">Features</h1>
                      <ul class="card-body font-bold text-base">
                        <li class="list-disc">${data.features[1] ? data.features[1].feature_name : "No Features"}
                        <li>
                        <li class="list-disc">${data.features[2] ? data.features[2].feature_name : "No Features"}
                        <li>
                        <li class="list-disc">${data.features[3] ? data.features[3].feature_name : "No Features"}
                        <li>
                      </ul>
                    </div>
                    <div class="w-full">
                      <h1 class="text-xl font-bold mt-5">Integrations</h1>
                      <ul class="card-body font-bold text-xl">
                        <li class="list-disc">${data.integrations[0] ? data.integrations[0] : "No Intergration"}
                        <li>
                        <li class="list-disc">${data.integrations[1] ? data.integrations[1] : "No Intergration"}
                        <li>
                        <li class="list-disc">${data.integrations[2] ? data.integrations[2] : "No Intergration"}
                        <li>
                      </ul>
                    </div>
                  </div>
                </div>
    `;
  const aiBody2 = document.getElementById("ai-body-2")
  aiBody2.innerHTML = "";
  aiBody2.innerHTML += `
    <figure id="modalPhoto"><img
                    src="${data.image_link[0] ? data.image_link[0] : "No Image"}"
                    alt="" /></figure>
                <h1 class="text-xl font-bold text-center mt-3">${data.input_output_examples[0]? data.input_output_examples[0].input : "No Input"}</h1>
                <p class="mt-3 text-center mb-3">${data.input_output_examples[0]? data.input_output_examples[0].output : "No Output"}</p>
    `;
}

loadAi(6);

document.getElementById("show-all").addEventListener('click', function () {
  loadAi();
  showAll.classList.add('hidden');
})