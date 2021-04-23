import '../styles/incrementer.css';

class Incrementer{
    constructor(){
        this.pattern = /^(\s*|\d+)$/;
    }
    init(tier, callback){
        
        const inputs = tier.querySelectorAll('.incrementer-value');
        const addButtons = tier.querySelectorAll('i.plus');
        const minusButtons = tier.querySelectorAll('i.minus');

        inputs.forEach(input => {
            // reset value
            input.value = 0;

            input.disabled = true

            // add event listener for any input
            // input.addEventListener('input', e => {
            //     this.validCheck(e.target, inputM);
            //     callback(tier.getAttribute('id'), e.target.parentElement.parentElement.getAttribute('id'), e.target.value);
            // });
        });

        // add event listener to each button
        addButtons.forEach(button => {
            button.addEventListener('click', e => {
                if(e.shiftKey){
                    this.incrementUp(e.target.parentElement.previousElementSibling, 10);
                    callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), 10);
                } else {
                    this.incrementUp(e.target.parentElement.previousElementSibling, 1);
                    callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), 1);
                }
            });
        });

        minusButtons.forEach(button => {
            button.addEventListener('click', e => {
                if(e.shiftKey){
                    if(e.target.parentElement.previousElementSibling.value >= 10){
                        callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), -10);
                        this.incrementDown(e.target.parentElement.previousElementSibling, -10);
                    } 
                } else {
                    if(e.target.parentElement.previousElementSibling.value >= 1){
                        callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), -1);
                        this.incrementDown(e.target.parentElement.previousElementSibling, -1);
                    } 
                }
            });
        });
    }
    incrementUp(target, val){
        
        target.value = parseInt(target.value) + val;
    }
    incrementDown(target, val){

        target.value = parseInt(target.value) + val;
    }
    // validCheck(target, inputM){
    //     if(!this.pattern.test(target.value)){
    //         target.value = inputM;
    //     } else {
    //         inputM = target.value;
    //         return inputM;
    //     }
    // }
}

export {Incrementer as default};