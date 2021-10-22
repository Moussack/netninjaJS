import './ninja-ui/styles/style.css';
import Tooltip from './ninja-ui/tooltips';
import Dropdown from './ninja-ui/dropdown';

// create tooltip
const tooltip = new Tooltip(document.querySelector('.tooltip'));
tooltip.init();

// create dropdowns
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => {
   const instance = new Dropdown(dropdown);
   instance.init();
});
