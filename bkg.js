var targetHost = "marketplace.plantvsundead.com";
var colorRate = [3, 6, 8, 10, 13, 15, 17, 19];

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
        return "#ffc31c";
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

function init() {
    if (window.location.host !== targetHost) return;
    var modMPStyle = document.createElement('style');
    modMPStyle.type = 'text/css';
    modMPStyle.innerText = `.tw-h-80{height: 12.5rem;}`; //height of plant display
    document.head.appendChild(modMPStyle);

    document.querySelectorAll('.tw-text-center[data-v-4b7e9996]').forEach(function (i, obj) {
        calculateLE(i);

        // As the grid changes without the page reloading, listen to the change event
        i.addEventListener("DOMCharacterDataModified", function (event) {
            calculateLE(event.target.parentElement)
        }, false)
    });
}

let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href.split('?')[0];
  if (url !== lastUrl) {
    lastUrl = url.split('?')[0];
    setTimeout(init, 500);
  }
}).observe(document, {subtree: true, childList: true});

setTimeout(init, 1500);