var scriptState = true;
document.addEventListener("keydown", function (event) {
    var state = scriptState;
    if (event.keyCode == 113 && state == true) {
        //f2
        state = false;
        scriptState = state;

        document.querySelectorAll('.tw-text-center[data-v-4b7e9996]').forEach(function (i, obj) {
            calculateLE(i)

            // As the grid changes without the page reloading, listen to the change event
            i.addEventListener("DOMCharacterDataModified", function (event) {
                calculateLE(event.target.parentElement)
            }, false)
        });
    }
    if (event.keyCode == 114 && state == false) {
        //f3
        state = true;
        scriptState = state;
    }
});


function calculateLE(divElement) {
    let parent = divElement.parentElement
    let leSplit = divElement.innerText.split(' ')[1].split('/')
    let rateClass = "le rate-calculated"
    let rateText = "LE: " + (leSplit[0] / leSplit[1]).toFixed(2) + " Hour"

    if (parent.getElementsByClassName(rateClass).length == 0) {
        let clone = divElement.cloneNode()
        clone.className = rateClass
        clone.innerText = rateText
        parent.appendChild(clone)
    } else {
        parent.getElementsByClassName(rateClass)[0].innerText = rateText
    }
}
