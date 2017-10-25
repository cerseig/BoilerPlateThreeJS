import './index.css';
import App from './scripts/App';

// document.getElementById('start').addEventListener('click', () => {
//      window.app = new App();
//
// })

$('#start').on('click', function() {
    $('.landing-gate').css('display', 'none')
    $('.panel-controls').css('display', 'flex')
    window.app = new App();
})
window.onload = () => {
    $('.loader').css('display', 'none')
}
// window.app = new App();

// import Test from './scripts/Test';
// window.test = new Test();
