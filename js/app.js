const loadAiData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools.slice(0, 6));
}

const displayAiTools = tools => {
     // start Spinner or loader 
     toggleSpinner(true);
    console.log(tools)

    const aiToolsContainer = document.getElementById('ai-tools-container');

    aiToolsContainer.innerText = '';

    //  show see more button 
    const seeMore = document.getElementById('see-more');
    seeMore.classList.remove('d-none');
        
    // display all phone 
    tools.forEach(tool => {
     console.log(tool)
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        
        toolDiv.innerHTML = `
        <div class="card h-100">
        <img class="img-fluid h-100" src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title mt-3 mb-2">Features:</h4>
           <ol>
             <li> ${tool.features[0] ? tool.features[0] : 'features not found'} </li>
             <li> ${tool.features[1] ? tool.features[1] : 'features not found'} </li>
             <li> ${tool.features[2] ? tool.features[2] : 'features not found'} </li>
            </ol>
            <hr>
           <div class="d-flex justify-content-between mt-3">
            <div>
              <h4 class="card-title">${tool.name}</h4>
              <p class="pt-2"><i class="fa-sharp fa-solid fa-calendar-days"></i> <span class="ms-2"> ${tool.published_in}</span> </p>
             </div>
             <div>
               <button onclick="loadAiToolDetails('${tool.id}')" class="btn text-danger fs-3"  data-bs-toggle="modal" data-bs-target="#aiToolDetailsModal" type="submit"><i class="fa-solid fa-arrow-right"></i></button>
             </div>
           </div>
        </div>
      </div>
        `;
    
        aiToolsContainer.appendChild(toolDiv);
    });
     // stop Spinner or loader 
     toggleSpinner(false);
}

// loading 
const toggleSpinner = isLoading => {
  const loadingSection = document.getElementById('loading');
  if(isLoading){
      loadingSection.classList.remove('d-none');
  }else{
      loadingSection.classList.add('d-none');
  }

}

// see more data 
const seeMoreData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools);

    // hide see more button 
    const seeMore = document.getElementById('see-more');
    seeMore.classList.add('d-none');
}


// phone details 
const loadAiToolDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  displayAiToolDetails(data.data);
}
/* <img src="${tool.image_link[0]}" class="img-fluid"> */
// display Phone Details 
const displayAiToolDetails = tool => {
     console.log(tool);
     console.log(tool.features[1].feature_name);

    //  document.getElementById('modal-body').innerHTML = `
    //  <img src="${tool.image_link[0]}" class="img-fluid">
    //  <img src="${tool.image_link[0]}" class="img-fluid">
    //  `;
    // card one description 
    document.getElementById('tool-description').innerText = tool.description;
     
    // pricing data
    document.getElementById('pricing-plan-1').innerText = tool.pricing[0].plan;
    document.getElementById('pricing-price-1').innerText = tool.pricing[0].price;
    document.getElementById('pricing-plan-2').innerText = tool.pricing[1].plan;
    document.getElementById('pricing-price-2').innerText = tool.pricing[1].price;
    document.getElementById('pricing-plan-3').innerText = tool.pricing[2].plan;
    document.getElementById('pricing-price-3').innerText = tool.pricing[2].price;

    // Features data
    document.getElementById('features-li-1').innerText = tool.features[1].feature_name;
    document.getElementById('features-li-2').innerText = tool.features[2].feature_name;
    document.getElementById('features-li-3').innerText = tool.features[3].feature_name;

    // integrations data
    document.getElementById('integrations-li-1').innerText = tool.integrations[0];
    document.getElementById('integrations-li-2').innerText = tool.integrations[1];
    document.getElementById('integrations-li-3').innerText = tool.integrations[2];

}

loadAiData()