// function needs to bedefined first. Using arrow functio method
const toggleMode = () => {
    // the toggle method on a class list is a way to add or remove a scific class from an element
    document.body.classList.toggle('dark'); 
    document.body.classList.toggle('light');

    saveMode();
}
// save the mode in local storage
const saveMode = () => {
    // if else statement. If the body has a class of dark, then the current mode is dark. If not, then the current mode is light
    const currentMode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem ('mode', currentMode);
}
// get the button element by its id
const toggleBtn = document.getElementById('button');

// add event listemr to the button. once cliked will run the function toggleMode
toggleBtn.addEventListener('click', toggleMode);

// functin to apply the saved mode
const applySavedMode = () => {
    const savedMode = localStorage.getItem('mode');
    // savedmode has value dark, light, or null
    if (savedMode) {
        document.body.classList.add(savedMode)
// if there is no savedMode, then the default mode is light
    } else {
        document.body.classList.add('light');
    }
}

// add listener to the page load event
window.addEventListener('DOMContentLoaded', applySavedMode);
