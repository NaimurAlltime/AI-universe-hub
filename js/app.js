const loadAiData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools.slice(0, 6));
}

// display data 
const displayAiTools = tools => {
     // start Spinner or loader 
     toggleSpinner(true);
    // console.log(tools)

    const aiToolsContainer = document.getElementById('ai-tools-container');

    aiToolsContainer.innerText = '';

    //  show see more button 
    const seeMore = document.getElementById('see-more');
    seeMore.classList.remove('d-none');
        
    // display all phone 
    tools.forEach(tool => {
    //  console.log(tool)
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        
        toolDiv.innerHTML = `
        <div class="card h-100">
        <img class="img-fluid h-100" src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title mt-3 mb-2">Features:</h4>
           <ol>
             <li>${tool.features[0]}</li>
             <li>${tool.features[1]}</li>
             ${
              tool.features.length > 2
                 ? `<li>${tool.features[2]}</li>`
                 : ""
             }
             ${
              tool.features.length > 3
                 ? `<li>${tool.features[3]}</li>`
                 : ""
             }
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

// loading or toggleSpinner function 
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


// phone details function 
const loadAiToolDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  // console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  displayAiToolDetails(data.data);
}

// show dynamic data in modal 
const displayAiToolDetails = tool => {
  //  console.log(tool);

//modal left side
const leftId = document.getElementById('left-side');

leftId.innerText = "";
const div1 = document.createElement("div");

div1.innerHTML = `
      <h5 class="ms-4 mt-4 fw-bold fs-3 justify-content-start px-2">${tool.description}</h5>
      <div class="d-flex text-center fw-bold fs-6 justify-content-evenly px-2 my-5">

      <div class="text-success">${
          tool?.pricing ? `${tool.pricing[0].price}` : ""
        } <br> ${tool?.pricing ? `${tool.pricing[0].plan}` : ""}</div>
      <div class="text-warning">${
          tool?.pricing ? `${tool.pricing[1].price}` : ""
        } <br> ${tool?.pricing ? `${tool.pricing[1].plan}` : ""}</div>
      <div class="text-danger">${
          tool?.pricing ? `${tool.pricing[2].price}` : ""
        } <br> ${tool?.pricing ? `${tool.pricing[2].plan}` : ""}</div>

            </div>

             <div class="d-flex justify-content-evenly px-2">
              <div>
               <h4 class="fs-bold">Features</h4>
                      <ul>
                       <li>${tool.features["1"].feature_name}</li>
                       <li>${tool.features["2"].feature_name}</li>
                       <li>${tool.features["3"].feature_name}</li>
                       
                       </ul>
          
             </div>
             <div>
            <h4 class="fs-bold">Integrations</h4>
                      <ul>
                      
                      ${
                        tool?.integrations?.length > 0
                          ? `<li>${tool?.integrations[0]}</li>`
                          : "No Data Found"
                      }
                      ${
                        tool?.integrations?.length > 1
                          ? `<li>${tool?.integrations[1]}</li>`
                          : ""
                      }
                      ${
                        tool?.integrations?.length > 2
                          ? `<li>${tool?.integrations[2]}</li>`
                          : ""
                      }
                         
               </ul>
        </div>
   </div>
`;
leftId.appendChild(div1);


  //modal right side

        const rightId = document.getElementById('right-side');

      rightId.innerText = "";
      const div = document.createElement("div");
      let score = tool.accuracy.score * 100;
      // console.log(tool.accuracy.score);

      // modal pic and input output text 
          div.innerHTML = `
        <div class="position-relative">
        <img src="${
            tool.image_link[0]
          }" alt="" style="height:300px;" class="img-fluid">

          ${tool.accuracy.score? `<div class="position-absolute"><button class="btn btn-danger rounded" style="margin-top:-35.3rem; margin-left:23rem; px-3; overflow: hidden">${score}% accuracy</button></div>` : ''}

        </div>
        <div class="text-center pb-3">
        ${
          tool?.input_output_examples
            ? `<h4 class="mt-3">${tool?.input_output_examples[0]?.input}</h4>`
            : "Can you give any example?"
        }
        <br>
        ${
          tool?.input_output_examples
            ? `${tool?.input_output_examples[0]?.output}`
            : "No! Not Yet! Take a break!!!"
        }
        </div>

  `;
    rightId.appendChild(div);

}

// Sort By Date function 
const sortByDateBtn = async() => {
  // hide see more button 
  const seeMoreBtn = document.getElementById('see-more-btn');
    seeMoreBtn.classList.add("d-none");

    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayByDate(data.data.tools);
}

// display Sort By Date 
function displayByDate(sortedData){
  sortedData.sort((previous, current) => new Date(current.published_in) - new Date(previous.published_in));

 displayAiTools(sortedData);
}

loadAiData()