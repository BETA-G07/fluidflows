const densityData = {
  "Water (H2O)": {
    equation: "2-100",
    MW: 18.01528,
    C1: -13.851,
    C2: 0.64038,
    C3: -0.0019124,
    C4: 1.8211e-06
  },
  "Ethanol (C2H5OH)": {
    equation: "105",
    MW: 46.06844,
    C1: 1.6288,
    C2: 0.27469,
    C3: 514,
    C4: 0.23178
  },
  "Octane": {
    equation: "105",
    MW: 114.22852,
    C1: 0.5266,
    C2: 0.25693,
    C3: 568.7,
    C4: 0.28571
  },
  "Carbon Tetrachloride (CCl4)": {
    equation: "105",
    MW: 153.8227,
    C1: 0.99835,
    C2: 0.274,
    C3: 556.35,
    C4: 0.287
  },
  "Custom": {
    equation: "custom"
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('substanceSelectDensity');
  Object.keys(densityData).forEach(substance => {
    const option = document.createElement('option');
    option.value = substance;
    option.textContent = substance;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    const isCustom = select.value === 'Custom';
    document.getElementById('customDensityInputs').style.display = isCustom ? 'block' : 'none';

    if (!isCustom) {
      const T = parseFloat(document.getElementById('tempDensity').value);
      if (!isNaN(T)) {
        calculateDensity();
      }
    }
  });

  document.getElementById('tempDensity').addEventListener('input', () => {
    const selected = document.getElementById('substanceSelectDensity').value;
    if (selected && selected !== 'Custom') {
      calculateDensity();
    }
  });
});

function calculateDensity() {
  const substance = document.getElementById('substanceSelectDensity').value;
  const T = parseFloat(document.getElementById('tempDensity').value);
  const resultDiv = document.getElementById('densityResult');

  if (!substance || isNaN(T)) {
    resultDiv.innerHTML = "❗ Please select a substance and enter a valid temperature.";
    return;
  }

  let equation, MW, C1, C2, C3, C4;

  if (substance === 'Custom') {
    equation = document.getElementById('equationSelectDensity').value;
    MW = parseFloat(document.getElementById('mw').value);
    C1 = parseFloat(document.getElementById('dc1').value);
    C2 = parseFloat(document.getElementById('dc2').value);
    C3 = parseFloat(document.getElementById('dc3').value);
    C4 = parseFloat(document.getElementById('dc4').value);

    if ([MW, C1, C2, C3, C4].some(isNaN)) {
      resultDiv.innerHTML = "❗ Please enter all required constants including MW.";
      return;
    }
  } else {
    ({ equation, MW, C1, C2, C3, C4 } = densityData[substance]);
  }

  let density;
  if (equation === "105") {
    density = C1 + C2 * T + C3 * T ** 2 + C4 * T ** 3;
  } else if (equation === "2-100") {
    density = C1 / (1 + C2 * T + C3 * T ** 2 + C4 * T ** 3);
  } else {
    resultDiv.innerHTML = "❗ Unknown equation type.";
    return;
  }

  resultDiv.innerHTML = `
    <strong>Density for ${substance}:</strong><br>
    ${density.toFixed(3)} kg/m³<br>
    Molecular Weight: ${MW} g/mol
  `;
}
