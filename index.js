document.getElementById('getSchemeBtn').addEventListener('click', function() {
    const mode = document.querySelector('select').value;
    const seed = document.querySelector('input').value.slice(1,);

    setColorScheme(mode, seed);
});

document.addEventListener('click', function(e) {
    if(e.target.parentNode.classList[0] === 'color-strip'){
        var textToCopy = e.target.dataset.hex;

        // Create a hidden textarea element
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = textToCopy;
        document.body.appendChild(textArea);

        // Programmatically trigger a copy command
        textArea.select();
        textArea.setSelectionRange(0, textToCopy.length);
        document.execCommand('copy');

        // Clean up the temporary textarea
        document.body.removeChild(textArea);
    }
});

function setColorScheme(mode, seed) {
    fetch(`https://www.thecolorapi.com/scheme?mode=${mode}&hex=${seed}`)
        .then(request => request.json())
        .then(data => {
            schemesHex = data.colors.map(function(color) {
                return color.hex.value;
            });
            setSchemeHtml(schemesHex);
        })
}

function setSchemeHtml(schemesHex) {
    console.log(document.getElementById('color-schemes'));
    document.getElementById('color-schemes').innerHTML = `
        <style>
            #strip1{
                height: 300px;
                background: ${schemesHex[0]};
            }
            
            #strip2{
                height: 300px;
                background: ${schemesHex[1]};
            }
            
            #strip3{
                height: 300px;
                background: ${schemesHex[2]};
            }
            
            #strip4{
                height: 300px;
                background: ${schemesHex[3]};
            }
            
            #strip5{
                height: 300px;
                background: ${schemesHex[4]};
            }
        </style>

        <div class="color-strip"><div id="strip1" data-hex="${schemesHex[0]}"></div><p data-hex="${schemesHex[0]}">${schemesHex[0]}</p></div>
        <div class="color-strip"> <div id="strip2" data-hex="${schemesHex[1]}"></div><p data-hex="${schemesHex[1]}">${schemesHex[1]}</p></div>
        <div class="color-strip"> <div id="strip3" data-hex="${schemesHex[2]}"></div><p data-hex="${schemesHex[2]}">${schemesHex[2]}</p></div>
        <div class="color-strip"> <div id="strip4" data-hex="${schemesHex[3]}"></div><p data-hex="${schemesHex[3]}">${schemesHex[3]}</p></div>
        <div class="color-strip"> <div id="strip5" data-hex="${schemesHex[4]}"></div><p data-hex="${schemesHex[4]}">${schemesHex[4]}</p></div>
`
}