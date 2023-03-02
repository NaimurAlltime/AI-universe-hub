const loadAiData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools);
}

const displayAiTools = tools => {
    console.log(tools)
    const aiToolsContainer = document.getElementById('ai-tools-container')
        
    // display all phone 
    tools.forEach(tool => {
     console.log(tool)
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        
        toolDiv.innerHTML = `
        <div class="card h-100">
        <img class="img-fluid" src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title mt-3 mb-2">Features:</h4>
           <ol>
             <li> ${tool.features[0]} </li>
             <li> ${tool.features[1]} </li>
             <li> ${tool.features[2]} </li>
            </ol>
            <hr>
           <div class="d-flex justify-content-between mt-3">
            <div>
              <h4 class="card-title">${tool.name}</h4>
              <p class="pt-2"><i class="fa-sharp fa-solid fa-calendar-days"></i> <span class="ms-2"> 11/01/2022</span> </p>
             </div>
             <div>
               <button class="btn text-danger fs-2" type="submit"><i class="fa-solid fa-arrow-right"></i></button>
             </div>
           </div>
        </div>
      </div>
        `;
    
        aiToolsContainer.appendChild(toolDiv);
    });
}


loadAiData()