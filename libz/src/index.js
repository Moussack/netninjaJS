import './ninja-ui/styles/style.css';
import './ninja-ui/styles/tooltip.css';
import Tooltip from './ninja-ui/tooltips';

// create tooltip
const tooltip = new Tooltip(document.querySelector('.tooltip'));
tooltip.init();
