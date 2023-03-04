const loadAi = async (limit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  displayAi(data.data.tools, limit);
}

// spinner
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById('spinner')
  if (isLoading === true) {
    spinner.classList.remove('hidden')
  } else {
    spinner.classList.add('hidden')
  }
}


// Cards Show
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
                           <li>${ai.features[0] ? ai.features[0] : "No Data Found"}</li>
                           <li>${ai.features[1] ? ai.features[1] : "No Data Found"}</li>
                           <li>${ai.features[2] ? ai.features[2] : "No Data Found"}</li>
                           <li>${ai.features[3] ? ai.features[3] : "No Data Found"}</li>
                       </ol>
                    </div><br><br>
                    <hr>
                    <div class="ml-3 mt-4 mb-7">
                    <span class="font-bold ">${ai.name ? ai.name : "No Data Found"}</span><br>
                    <div class="flex items-center justify-between">
                       <div class="flex gap-2">
                       <img src="images/calender.png" alt="" class="w-5">
                       <span>${ai.published_in ? ai.published_in : "No Data Found"}</span>
                       </div>
                       <label for="modal" class="btn border-0" style="background-color : #FEF7F7;" onclick="loadAiDetails('${ai.id}')"><i class="fas fa-arrow-right text-error"></i></label>
                    </div>
                  </div>
        `
    aiContainer.appendChild(aiDiv);
    // spinner off
    toggleSpinner(false)
  });
}

// Modal
const loadAiDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiDetails(data.data);
};

const displayAiDetails = (data, id) => {
  const { image_link, input_output_examples, description, pricing, features, integrations, accuracy } = data;
  const aiBody = document.getElementById("ai-body");
  aiBody.innerHTML = `
    <div class="p-5 border rounded-lg bg-red-50 border-red-300">
      <p class="text-xl font-bold text-left">${description ? description : "No Data Found"}</p>

      <div class="flex gap-5 justify-center p-3 grid lg:grid-cols-3 grid-cols-1">
      <div class="p-5 rounded-lg text-green-500 bg-white">
      <p class="text-center text-sm font-semibold">${pricing ? pricing[0].price : "Free Of Cost"}</p>
      <p class="text-center text-sm font-semibold">${pricing ? pricing[0].plan : "No Data Found"}</p>
      </div>
      <div class="p-5 rounded-lg text-yellow-300 bg-white">
      <p class="text-center text-sm font-semibold">${pricing ? pricing[1].price : "Free Of Cost"}</p>
      <p class="text-center text-sm font-semibold">${pricing ? pricing[1].plan : "No Data Found"}</p>
      </div>
      <div class="p-5 rounded-lg text-red-500 bg-white">
      <p class="text-center text-sm font-semibold">${pricing ? pricing[2].price : "Free Of Cost"}</p>
      <p class="text-center text-sm font-semibold">${pricing ? pricing[2].plan : "No Data Found"}</p>
      </div>
      </div>

      <div class="flex grid lg:grid-cols-2 grid-cols-1 justify-between p-3">
      <div class="p-5">
      <p class="text-xl font-bold">Features</p>
      <li>${features ? features[1].feature_name : "No Data Found"}</li>
      <li>${features ? features[2].feature_name : "No Data Found"}</li>
      <li>${features ? features[3].feature_name : "No Data Found"}</li>
      </div>
      <div class="p-5">
      <p class="text-xl font-bold">Integrations</p>
      <li>${integrations ? (integrations[0] ? integrations[0] : "No Data Found") : "No Data Found"}</li>
      <li>${integrations ? (integrations[1] ? integrations[1] : "No Data Found") : "No Data Found"}</li>
      <li>${integrations ? (integrations[2] ? integrations[2] : "No Data Found") : "No Data Found"}</li>
      <li>${integrations ? (integrations[3] ? integrations[3] : "No Data Found") : "No Data Found"}</li>
      <li>${integrations ? (integrations[4] ? integrations[4] : "No Data Found") : "No Data Found"}</li>
      </div>
      </div>
    </div>
  `
  const aiBody2 = document.getElementById("ai-body-2")
  aiBody2.innerHTML = "";
  aiBody2.innerHTML += `
  <div class="p-5 border border-gray-100 rounded-lg">
     
    <div>
    <button class="${data.accuracy.score ? 'block' : 'hidden'} bg-red-500 p-2 rounded-md w-fit h-fit text-white text-base absolute border-3 top-0 right-0"><span>${data.accuracy.score * 100 + "% "}Accuracy</span></button>
    <figure id="modalPhoto"><img src="${data.image_link[0] ? data.image_link[0] : "No Image"}" alt="" /></figure>
 </div>
        <p class="text-center text-xl font-bold p-2">${input_output_examples ? input_output_examples[0].input : "Can you give any example?"}</p>
        <p class="text-center ">${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
    </div>

    `;
}

// sort by date
const sortBtn = document.getElementById('sort-by-date-btn');
sortBtn.addEventListener('click', () => {
  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let aiData = data.data.tools;
      aiData.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
      displayAi(aiData);
    })
});

// show all
document.getElementById("show-all").addEventListener('click', function () {
  loadAi();
  showAll.classList.add('hidden');
});

loadAi(6);

