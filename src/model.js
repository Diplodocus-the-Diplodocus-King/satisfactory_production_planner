import './styles/incrementer.css';

class Model {
    constructor(){
        this.data = new Array();
    }
    init(tier, uiCallback, incCallback){
        const filename = `assets/json/${tier.getAttribute('id')}.json`;

        fetch(filename).then(response => {
            return response.json();
        }).then(data => {
            // writing data to global variable
            this.data.push({
                tier: `${tier.getAttribute('id')}`,
                data: data
            });
            // fire view render call back
            uiCallback(tier, data); 

        }).then(() => {
            // assign incrementer function to each element - note this has to be done once all ui elements have been loaded for each tier section
            incCallback(tier, (tier, part, value) => this.calc(tier, part, value));

        }).catch(err => {
            console.log('rejected', err);
        });
    }
    calc(tier, part, value){
        // get output
        this.data.forEach(item => {
            if(item.tier === tier){

                const selectedPart = part.slice(0, part.indexOf('-')).replace(/_/g, ' ');
                const selectedRecipe = part.slice(part.indexOf('-') + 1, part.length).replace(/_/g, ' ');

                item.data.forEach(dataItem => {
                    if(dataItem.part === selectedPart){
                        dataItem.recipes.forEach(recipe => {
                            if(recipe.part === selectedRecipe){

                                // Collect output and print to display as supply
                                const outputContainer = document.querySelector(`#${part.slice(0, part.indexOf('-'))}`);
                                const supply = outputContainer.querySelector('.supply');
                                // const supplyVal = parseFloat(supply.innerText) + (value*recipe.output);
                                const supplyVal = parseFloat(supply.innerText) + (value*recipe.output);
                                supply.innerText = supplyVal;

                                // Update supply/demand bar
                                const supplyBar = outputContainer.querySelector('.bar-value');
                                const supplyBarVal = parseFloat(supplyBar.innerText) + (value*recipe.output);
                                supplyBar.innerText = supplyBarVal;

                                const supplyPositiveBar = outputContainer.querySelector('.positive-value');
                                const supplyNegativeBar = outputContainer.querySelector('.negative-value');

                                if(supplyBarVal > 0){
                                    supplyPositiveBar.style.width = `${(supplyBarVal/supplyVal)*100}px`;
                                    supplyNegativeBar.style.width = '0px';
                                } else if(supplyBarVal < 0){
                                    supplyPositiveBar.style.width = '0px';
                                    supplyNegativeBar.style.width = `${-1*(supplyBarVal/supplyVal)*100}px`;
                                    if(parseFloat(supplyNegativeBar.style.width.slice(0, -2)) > 100 || supplyVal === 0){
                                        supplyNegativeBar.style.width = '100px';
                                    }
                                } else{
                                    supplyPositiveBar.style.width = '0px';
                                    supplyNegativeBar.style.width = '0px';
                                }

                                // Collect by products and print to display as supply
                                if(recipe.byProduct){
                                    const byProductContainer = document.querySelector(`#${recipe.byProduct.replace(/\s/g,'_')}`);
                                    const byProduct = byProductContainer.querySelector('.supply');
                                    const byProductVal = parseFloat(byProduct.innerText) + (value*recipe.output2);
                                    byProduct.innerText = byProductVal;

                                    // Update supply/demand bar
                                    const byProductBar = byProductContainer.querySelector('.bar-value');
                                    const byProductBarVal = parseFloat(byProductBar.innerText) + (value*recipe.output2);
                                    byProductBar.innerText = byProductBarVal;

                                    const byProductPositiveBar = byProductContainer.querySelector('.positive-value');
                                    const byProductNegativeBar = byProductContainer.querySelector('.negative-value');

                                    if(byProductBarVal > 0){
                                        byProductPositiveBar.style.width = `${(byProductBarVal/byProductVal)*100}px`;
                                        byProductNegativeBar.style.width = '0px';
                                    } else if(byProductBarVal < 0){
                                        byProductPositiveBar.style.width = '0px';
                                        byProductNegativeBar.style.width = `${-1*(byProductBarVal/byProductVal)*100}px`;
                                        if(parseFloat(byProductNegativeBar.style.width.slice(0, -2)) > 100 || byProductVal === 0){
                                            byProductNegativeBar.style.width = '100px';
                                        }
                                    } else{
                                        byProductPositiveBar.style.width = '0px';
                                        byProductNegativeBar.style.width = '0px';
                                    }
                                }
                                
                                // Collect inputs and print to display as demand
                                if(recipe.input1){
                                    const input1Container = document.querySelector(`#${recipe.input1.replace(/\s/g,'_')}`);
                                    const demand1 = input1Container.querySelector('.demand');
                                    const demand1Val = parseFloat(demand1.innerText) + (value*recipe.rate1);
                                    const supply1Val = parseFloat(input1Container.querySelector('.supply').innerText);
                                    demand1.innerText = demand1Val;

                                    const demand1Bar = input1Container.querySelector('.bar-value');
                                    const demand1BarVal = parseFloat(demand1Bar.innerText) + (-1*value*recipe.rate1);
                                    demand1Bar.innerText = demand1BarVal;

                                    const demand1PositiveBar = input1Container.querySelector('.positive-value');
                                    const demand1NegativeBar = input1Container.querySelector('.negative-value');
    
                                    if(demand1BarVal > 0){
                                        demand1PositiveBar.style.width = `${(demand1BarVal/supply1Val)*100}px`;
                                        demand1NegativeBar.style.width = '0px';
                                    } else if(demand1BarVal < 0){
                                        demand1PositiveBar.style.width = '0px';
                                        demand1NegativeBar.style.width = `${-1*(demand1BarVal/supply1Val)*100}px`;
                                        if(parseFloat(demand1NegativeBar.style.width.slice(0, -2)) > 100 || supply1Val === 0){
                                            demand1NegativeBar.style.width = '100px';
                                        }
                                    } else{
                                        demand1PositiveBar.style.width = '0px';
                                        demand1NegativeBar.style.width = '0px';
                                    }

                                } 
                                
                                if(recipe.input2){

                                    const input2Container = document.querySelector(`#${recipe.input2.replace(/\s/g,'_')}`);
                                    const demand2 = input2Container.querySelector('.demand');
                                    const demand2Val = parseFloat(demand2.innerText) + (value*recipe.rate2);
                                    const supply2Val = parseFloat(input2Container.querySelector('.supply').innerText);
                                    demand2.innerText = demand2Val;
                                    
                                    const demand2Bar = input2Container.querySelector('.bar-value');
                                    const demand2BarVal = parseFloat(demand2Bar.innerText) + (-1*value*recipe.rate2);
                                    demand2Bar.innerText = demand2BarVal;

                                    const demand2PositiveBar = input2Container.querySelector('.positive-value');
                                    const demand2NegativeBar = input2Container.querySelector('.negative-value');
                                    
                                    if(demand2BarVal > 0){
                                        demand2PositiveBar.style.width = `${(demand2BarVal/supply2Val)*100}px`;
                                        demand2NegativeBar.style.width = '0px';
                                    } else if(demand2BarVal < 0){
                                        demand2PositiveBar.style.width = '0px';
                                        demand2NegativeBar.style.width = `${-1*(demand2BarVal/supply2Val)*100}px`;
                                        if(parseFloat(demand2NegativeBar.style.width.slice(0, -2)) > 100 || supply2Val === 0){
                                            demand2NegativeBar.style.width = '100px';
                                        }
                                    } else{
                                        demand2PositiveBar.style.width = '0px';
                                        demand2NegativeBar.style.width = '0px';
                                    }

                                } 
                                
                                if(recipe.input3){

                                    const input3Container = document.querySelector(`#${recipe.input3.replace(/\s/g,'_')}`);
                                    const demand3 = input3Container.querySelector('.demand');
                                    const demand3Val = parseFloat(demand3.innerText) + (value*recipe.rate3);
                                    const supply3Val = parseFloat(input3Container.querySelector('.supply').innerText);
                                    demand3.innerText = demand3Val;

                                    const demand3Bar = input3Container.querySelector('.bar-value');
                                    const demand3BarVal = parseFloat(demand3Bar.innerText) + (-1*value*recipe.rate3);
                                    demand3Bar.innerText = demand3BarVal;

                                    const demand3PositiveBar = input3Container.querySelector('.positive-value');
                                    const demand3NegativeBar = input3Container.querySelector('.negative-value');
    
                                    if(demand3BarVal > 0){
                                        demand3PositiveBar.style.width = `${(demand3BarVal/supply3Val)*100}px`;
                                        demand3NegativeBar.style.width = '0px';
                                    } else if(demand3BarVal < 0){
                                        demand3PositiveBar.style.width = '0px';
                                        demand3NegativeBar.style.width = `${-1*(demand3BarVal/supply3Val)*100}px`;
                                        if(parseFloat(demand3NegativeBar.style.width.slice(0, -2)) > 100 || supply3Val === 0){
                                            demand3NegativeBar.style.width = '100px';
                                        }
                                    } else{
                                        demand3PositiveBar.style.width = '0px';
                                        demand3NegativeBar.style.width = '0px';
                                    }
                                } 
                                
                                if(recipe.input4){

                                    const input4Container = document.querySelector(`#${recipe.input4.replace(/\s/g,'_')}`);
                                    const demand4 = input4Container.querySelector('.demand');
                                    const demand4Val = parseFloat(demand4.innerText) + (value*recipe.rate4);
                                    const supply4Val = parseFloat(input4Container.querySelector('.supply').innerText);
                                    demand4.innerText = demand4Val;

                                    const demand4Bar = input4Container.querySelector('.bar-value');
                                    const demand4BarVal = parseFloat(demand4Bar.innerText) + (-1*value*recipe.rate4);
                                    demand4Bar.innerText = demand4BarVal;

                                    const demand4PositiveBar = input4Container.querySelector('.positive-value');
                                    const demand4NegativeBar = input4Container.querySelector('.negative-value');
    
                                    if(demand4BarVal > 0){
                                        demand4PositiveBar.style.width = `${(demand4BarVal/supply4Val)*100}px`;
                                        demand4NegativeBar.style.width = '0px';
                                    } else if(demand4BarVal < 0){
                                        demand4PositiveBar.style.width = '0px';
                                        demand4NegativeBar.style.width = `${-1*(demand4BarVal/supply4Val)*100}px`;
                                        if(parseFloat(demand4NegativeBar.style.width.slice(0, -2)) > 100 || supply4Val === 0){
                                            demand4NegativeBar.style.width = '100px';
                                        }
                                    } else{
                                        demand4PositiveBar.style.width = '0px';
                                        demand4NegativeBar.style.width = '0px';
                                    }
                                }
                                if(recipe.power){

                                    const powerContainer = document.querySelector(`#power`);
                                    const powerDemand = powerContainer.querySelector('.demand');
                                    const powerDemandVal = parseFloat(powerDemand.innerText) + (value*recipe.power);
                                    const powerSupplyVal = parseFloat(powerContainer.querySelector('.supply').innerText);
                                    powerDemand.innerText = powerDemandVal;

                                    const powerDemandBar = powerContainer.querySelector('.bar-value');
                                    const powerDemandBarVal = parseFloat(powerDemandBar.innerText) + (-1*value*recipe.power);
                                    powerDemandBar.innerText = powerDemandBarVal;

                                    const powerDemandPositiveBar = powerContainer.querySelector('.positive-value');
                                    const powerDemandNegativeBar = powerContainer.querySelector('.negative-value');
    
                                    if(powerDemandBarVal > 0){
                                        powerDemandPositiveBar.style.width = `${(powerDemandBarVal/powerSupplyVal)*100}px`;
                                        powerDemandNegativeBar.style.width = '0px';
                                    } else if(powerDemandBarVal < 0){
                                        powerDemandPositiveBar.style.width = '0px';
                                        powerDemandNegativeBar.style.width = `${-1*(powerDemandBarVal/powerSupplyVal)*100}px`;
                                        if(parseFloat(powerDemandNegativeBar.style.width.slice(0, -2)) > 100 || powerSupplyVal === 0){
                                            powerDemandNegativeBar.style.width = '100px';
                                        }
                                    } else{
                                        powerDemandPositiveBar.style.width = '0px';
                                        powerDemandNegativeBar.style.width = '0px';
                                    }
                                } 
                            }
                        })
                    }
                });
            }
        });


        // take power consumption and send to demand display (value*power), do diff for this also
        // take building type and push to tally
    }
}

export {Model as default};