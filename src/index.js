// Imports
import Model from './model';
import View from './view';
import Incrementer from './ui_files/incrementer';
import './styles/main.css';

// DOM Queries
const tiers = document.querySelectorAll('.tier');

// create parser object
const model = new Model();

// create ui object
const view = new View();

// create incrementer object
const incrementer = new Incrementer();

// render data for each tier and ui incrementer functionality
tiers.forEach(tier => {
    model.init(
        tier,  
        (tier, data) => view.render(tier, data),
        (tier, callback) => incrementer.init(tier, callback)
    );
});


