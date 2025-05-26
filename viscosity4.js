const viscosityData = {
  "Water (H2O)": {
    equation: "101",
    C1: -52.843,
    C2: 3703.6,
    C3: 5.866,
    C4: -5.879e-29,
    C5: 10
  },
  "Ethanol (C2H5OH)": {
    equation: "101",
    C1: 7.875,
    C2: 781.98,
    C3: -3.0418,
    C4: 0,
    C5: 0
  },
  "Octane": {
    equation: "101",
    C1: -98.805,
    C2: 3905.5,
    C3: 14.103,
    C4: -0.000025112,
    C5: 2
  },
  "Carbon Tetrachloride (CCl4)": {
    equation: "101",
    C1: 8.0738,
    C2: 1121.1,
    C3: -0.4726,
    C4: 0,
    C5: 0
  },
  "Custom": {
    equation: "custom"
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('substanceSelect');
  Object.keys(viscosityData).forEach(substance => {
    const option = document.createElement('option');
    option.value = substance;
    option.textContent = substance;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    const isCustom = select.value === 'Custom';
    document.getElementById('customInputs').style.display = isCustom ? 'block' : 'none';

    if (!isCustom) {
      // Auto-calculate for selected substance if temperature is already entered
      const T = parseFloat(document.getElementById('tempVisc').value);
      if (!isNaN(T)) {
        calculateViscosity();
      }
    }
  });

  document.getElementById('tempVisc').addEventListener('input', () => {
    const selected = document.getElementById('substanceSelect').value;
    if (selected && selected !== 'Custom') {
      calculateViscosity();
    }
  });
});

function calculateViscosity() {
  const substance = document.getElementById('substanceSelect').value;
  const T = parseFloat(document.getElementById('tempVisc').value);
  const resultDiv = document.getElementById('viscosityResult');

  if (!substance || isNaN(T)) {
    resultDiv.innerHTML = "❗ Please select a substance and enter a valid temperature.";
    return;
  }

  let equation, C1, C2, C3, C4, C5;

  if (substance === 'Custom') {
    equation = document.getElementById('equationSelect').value;
    C1 = parseFloat(document.getElementById('c1').value);
    C2 = parseFloat(document.getElementById('c2').value);
    C3 = parseFloat(document.getElementById('c3').value);
    C4 = parseFloat(document.getElementById('c4').value);
    C5 = parseFloat(document.getElementById('c5').value);

    if ([C1, C2, C3, C4, C5].some(isNaN)) {
      resultDiv.innerHTML = "❗ Please enter all C1 to C5 values.";
      return;
    }
  } else {
    ({ equation, C1, C2, C3, C4, C5 } = viscosityData[substance]);
  }

  let viscosity_Pa_s;
  if (equation === "101") {
    viscosity_Pa_s = Math.exp(C1 + (C2 / T) + C3 * Math.log(T) + C4 * Math.pow(T, C5));
    viscosity_lbfts = viscosity_Pa_s * 0.6719689948133;
  } else if (equation === "100") {
    viscosity_Pa_s = C1 + C2 * T + C3 * T ** 2 + C4 * T ** 3 + C5 * T ** 4;
    viscosity_lbfts = viscosity_Pa_s * 0.6719689948133;
  } else {
    resultDiv.innerHTML = "❗ Unknown equation type.";
    return;
  }

  resultDiv.innerHTML = `
    <strong>Viscosity for ${substance}:</strong><br>
    ${viscosity_Pa_s.toExponential(5)} Pa·s<br>
    ${viscosity_lbfts.toExponential(5)} lb/ft·s
  `;
}
