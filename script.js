// Maps for resistor color codes and multipliers
const colorValues = {
    black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, gray: 8, white: 9
};
const multiplierValues = {
    black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
    green: 100000, blue: 1000000, violet: 10000000, gray: 100000000,
    white: 1000000000, gold: 0.1, silver: 0.01
};
const toleranceValues = {
    gold: 5, silver: 10
};

let currentDropdown = '';

function showDropdown(event, dropdownId) {
    // Hide previous dropdown if open
    if (currentDropdown) {
        document.getElementById(currentDropdown).style.display = "none";
        
    }
    // Show the clicked dropdown
    currentDropdown = dropdownId;
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = "block";
    dropdown.style.left = event.pageX + "px";
    dropdown.style.top = event.pageY + "px";
    if(dropdownId=="band1Dropdown")
    {
        document.getElementById('line1').style.display="block";
    }
    if(dropdownId=="band2Dropdown")
    {
        document.getElementById('line2').style.display="block";
    }
    if(dropdownId=="band3Dropdown")
    {
        document.getElementById('line3').style.display="block";
    }
    if(dropdownId=="band4Dropdown")
    {
        document.getElementById('line4').style.display="block";
    }
}

function changeColor(band, selectedColor) {
    document.getElementById(band).setAttribute("fill", selectedColor);
    document.getElementById(currentDropdown).style.display = "none"; 
}

// Function to calculate the resistance
// Function to calculate the resistance
function calculateResistance() { 
    const band1Color = document.getElementById('band1').getAttribute('fill');
    const band2Color = document.getElementById('band2').getAttribute('fill');
    const band3Color = document.getElementById('band3').getAttribute('fill');
    const band4Color = document.getElementById('band4').getAttribute('fill');

    // Fetch the numerical values of the bands
    const band1Value = colorValues[band1Color];
    const band2Value = colorValues[band2Color];
    const band3Multiplier = multiplierValues[band3Color];
    const band4Tolerance = toleranceValues[band4Color] || 20; 
    

    if (band1Value !== undefined && band2Value !== undefined && band3Multiplier !== undefined) {
        // Calculate resistance
        const resistanceValue = ((band1Value * 10) + band2Value) * band3Multiplier;
        const tolerance = band4Tolerance;

        document.getElementById('box1').innerHTML=band1Value;
        document.getElementById('box1').style.backgroundColor=colorValues[band1Color];
        document.getElementById('box2').innerHTML=band2Value;
        document.getElementById('box2').style.backgroundColor=colorValues[band2Color];
        document.getElementById('box3').innerHTML=band3Multiplier;
        document.getElementById('box3').style.backgroundColor=multiplierValues[band3Color];
        document.getElementById('box4').innerHTML=band4Tolerance;
        document.getElementById('box4').style.backgroundColor=toleranceValues[band4Color];
        
        document.getElementById('Intermediate').innerHTML = 
            `( ${band1Value}*10   +  ${band2Value} ) * ${band3Multiplier}`;

        
        document.getElementById('resistanceOutput').innerText = 
            `Resistance: ${resistanceValue}Ω ± ${tolerance}%`;
            
    } else {
        document.getElementById('resistanceOutput').innerText = "Invalid color selection";
    }
}

// Function to observe changes in the band colors and recalculate resistance
function observeBandChanges(bandId) {
    const bandElement = document.getElementById(bandId);
    
    const observer = new MutationObserver(() => {
        calculateResistance();
    });

    // Start observing the 'fill' attribute for changes
    observer.observe(bandElement, {
        attributes: true,
        attributeFilter: ['fill']
    });
}

// Add observers to all band elements on page load
window.onload = function() {
    observeBandChanges('band1');
    observeBandChanges('band2');
    observeBandChanges('band3');
    observeBandChanges('band4');

    // Initial calculation in case the bands already have colors set
    calculateResistance();
};



