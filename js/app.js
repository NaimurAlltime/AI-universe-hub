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

// // ai tools details 
// const loadAiToolDetails = async(id) => {
//   const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
//   console.log(url)
//   const res = await fetch(url);
//   const data = await res.json();
//   displayAiToolDetails(data.data.tools);
// }
// // display Phone Details 
// const displayAiToolDetails = tool => {
//      console.log(tool);
//   const modalTitle = document.getElementById('aiToolDetailsModalLabel');
//   modalTitle.innerText = tool.name;
//   // document.getElementById('modal-body').innerHTML = `
//   // <img src="${phone.image}" class="img-fluid">
//   // <p class="mt-2">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found!'}</p>
//   // <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'Storage Data Information Not Found!'}</p>
//   // <p>DisplaySize
//   // : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'displaySize Data Information Not Found!'}</p>
// //  `
// }


// phone details 
const loadAiToolDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  displayAiToolDetails(data.data);
}

// display Phone Details 
const displayAiToolDetails = tool => {
     console.log(tool);


}

loadAiData()