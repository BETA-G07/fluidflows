document.getElementById("calculateButton").addEventListener("click", function () {
  const flowType = document.getElementById("flowType").value;
  const roughness = parseFloat(document.getElementById("surfroug").value);
  const diameter = parseFloat(document.getElementById("diameter").value);
  const reynolds = parseFloat(document.getElementById("reynolds").value);
  const resultElement = document.getElementById("result");

  let frictionFactor;

  if (isNaN(roughness) || isNaN(diameter) || isNaN(reynolds) || diameter === 0 || reynolds === 0) {
    resultElement.textContent = "Please enter valid, non-zero values for all inputs.";
    return;
  }

  if (flowType === "laminar") {
    frictionFactor = 16 / reynolds;
  } else {
    const term1 = 0.27 * (roughness / diameter);
    const term2 = Math.pow((7 / reynolds), 0.9);
    const denominator = -4 * Math.log10(term1 + term2);
    frictionFactor = Math.pow(1 / denominator, 2);
  }

  resultElement.textContent = `Friction Factor (${flowType} flow): ${frictionFactor.toFixed(10)}`;
});

