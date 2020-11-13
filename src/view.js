class View {
    constructor(){

    }
    render(tier, data){

        data.forEach(item => {

            const containerID = item.part.replace(/\s/g, '_');
            const imgPath = `./images/${containerID}.png`;

            let html = `
                <div class="resource-container" id="${containerID}">
                    <div class="resource-title">
                        <h5>${item.part}</h5>
                        <img src="${imgPath}" alt="${containerID}">
                    </div>
                `;

            item.recipes.forEach(recipe => {

                const resID = `${item.part.replace(/\s/g, '_')}-${recipe.part.replace(/\s/g, '_')}`;

                const containerHTML = `
                    <div class="incrementer-container" id="${resID}">
                        <label for="quantity" class="incrementer-label">${recipe.part}</label>
                        <div class="incrementer-value-container">
                            <input type="text" value="0" class="incrementer-value" name="quantity">
                            <div class="button-container">
                                <i class="fas fa-minus-square minus fa-lg"></i>
                                <i class="fas fa-plus-square plus fa-lg"></i>
                            </div>
                        </div>
                    </div>
                `;

                html += containerHTML;
            });
            
            html += `
                <div class="info-container">
                    <h6>Supply/Demand</h6>
                    <p class="supply">0</p>
                    <p class="demand">0</p>
                    <div class="progress-bar">
                        <div class="negative-bar">
                            <div class="negative-value"></div>
                        </div>
                        <div class="bar-value">0</div>
                        <div class="positive-bar">
                            <div class="positive-value"></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            tier.innerHTML += html;
        });
    }
}

export {View as default};