import '../styles/incrementer.css';

class Incrementer{
    constructor(){
        this.pattern = /^[0-9]*$/ ;
        this.focusVal = 0;
    }
    init(tier, callback){
        
        const inputs = tier.querySelectorAll('.incrementer-value');
        const addButtons = tier.querySelectorAll('i.plus');
        const minusButtons = tier.querySelectorAll('i.minus');

        inputs.forEach(input => {
            // reset value
            input.value = 0;

            input.disabled = false;

            input.addEventListener('focus', e => {
                this.focusVal = parseFloat(e.target.value);
                console.log('setting focus', this.focusVal)
            })

            // add event listener for any input
            input.addEventListener('input', e => {
                console.log('taking input', e.target.value, this.focusVal)
                if(!this.validCheck(e.target)){
                    return;
                }

                const diff = parseFloat(e.target.value) - this.focusVal;
                console.log('recalc', diff)
                callback(tier.getAttribute('id'), e.target.parentElement.parentElement.getAttribute('id'), diff);
                this.focusVal = e.target.value;
            });
        });

        // add event listener to each button
        addButtons.forEach(button => {
            button.addEventListener('click', e => {
                if(e.ctrlKey){
                    this.incrementUp(e.target.parentElement.previousElementSibling, 100);
                    callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), 100);
                } else if(e.shiftKey){
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
                if(e.ctrlKey){
                    if(e.target.parentElement.previousElementSibling.value >= 100){
                        this.incrementDown(e.target.parentElement.previousElementSibling, -100);
                        callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), -100);
                    }
                } else if(e.shiftKey){
                    if(e.target.parentElement.previousElementSibling.value >= 10){
                        this.incrementDown(e.target.parentElement.previousElementSibling, -10);
                        callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), -10);
                    } 
                } else {
                    if(e.target.parentElement.previousElementSibling.value >= 1){
                        this.incrementDown(e.target.parentElement.previousElementSibling, -1);
                        callback(tier.getAttribute('id'), e.target.parentElement.parentElement.parentElement.getAttribute('id'), -1);
                    } 
                }
            });
        });
    }
    incrementUp(target, val){
        target.value = parseFloat(target.value) + val;
    }
    incrementDown(target, val){
        target.value = parseFloat(target.value) + val;
    }
    setValue(target, val){
        target.value = val;
    }
    validCheck(target){
        if(!Number.isNaN(parseFloat(target.value)) && target.value.length){
            return true;
        } 
        return false;
    }
}

export {Incrementer as default};