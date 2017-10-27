import './index.css';
import App from './scripts/App';

$('#start').on('click', function() {
    $('.landing-gate').css('display', 'none')
    $('.panel-controls').css('display', 'flex')
    window.app = new App();
})
window.onload = () => {
    $('.loader').css('display', 'none')
}
