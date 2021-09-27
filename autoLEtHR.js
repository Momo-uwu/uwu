var scriptState = true;
var colorRate;

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
    let parent = divElement.parentElement;
    let leSplit = divElement.innerText.split(' ')[1].split('/');
    let rateClass = "le rate-calculated";
    let rate = leSplit[0] / leSplit[1];
    let rateText = "LE: " + rate.toFixed(2) + "/Hour";

    if (parent.getElementsByClassName(rateClass).length == 0) {
        let clone = divElement.cloneNode()
        clone.className = rateClass
        clone.innerText = rateText
        clone.style.color = getLEColorRate(rate);
        parent.appendChild(clone)
    } else {
        let leCalculated = parent.getElementsByClassName(rateClass)[0];
        leCalculated.innerText = rateText;
        leCalculated.style.color = getLEColorRate(rate);
    }
}

function getLEColorRate(rate) {
    let result = "#fff";
    if (rate >= colorRate[0] && rate < colorRate[1]) {
        return "#ff0000";
    } else if (rate >= colorRate[0] && rate < colorRate[1]) {
        return "#ef8e38";
    } else if (rate >= colorRate[1] && rate < colorRate[2]) {
        return "#fff200";
    } else if (rate >= colorRate[2] && rate < colorRate[3]) {
        return "#b7ff00";
    } else if (rate >= colorRate[3] && rate < colorRate[4]) {
        return "#00c8ff";
    } else if (rate >= colorRate[4] && rate < colorRate[5]) {
        return "#007bff";
    } else if (rate >= colorRate[5] && rate < colorRate[6]) {
        return "#9c6eff";
    } else if (rate >= colorRate[6] && rate < colorRate[7]) {
        return "#ff00ff";
    }
    return result;
}

colorRate = [3, 6, 8, 10, 13, 15, 17, 19];
