$(document).ready(() => {

    var row1 = document.getElementById('row1');
    row1.draggable = true;
    row1.addEventListener('drag', (event) => {
        event.dataTransfer.setData('text', event.target.id);
    });

    var rink = document.getElementById('rink');
    rink.addEventListener('dragover', (event) => {
        console.log(event.clientX + ',' + event.clientY);
    });
});