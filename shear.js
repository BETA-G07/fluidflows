const unitSystem = document.getElementById("unitSystem");

const muLabel = document.getElementById("viscosityUnit");
const vLabel = document.getElementById("velocityUnit");
const vLabel2 = document.getElementById("velocityUnit2");
const yLabel = document.getElementById("distanceUnit");
const yLabel2 = document.getElementById("distanceUnit2");

unitSystem.addEventListener("change", updateUnits);

function updateUnits() {
  const sys = unitSystem.value;
  if (sys === "si") {
    muLabel.textContent = "Pa·s";
    vLabel.textContent = vLabel2.textContent = "m/s";
    yLabel.textContent = yLabel2.textContent = "m";
  } else {
    muLabel.textContent = "lb/ft·s";
    vLabel.textContent = vLabel2.textContent = "ft/s";
    yLabel.textContent = yLabel2.textContent = "ft";
  }
}

document.getElementById("shearForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const mu = parseFloat(document.getElementById("viscosity").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const v2 = parseFloat(document.getElementById("v2").value);
  const y1 = parseFloat(document.getElementById("y1").value);
  const y2 = parseFloat(document.getElementById("y2").value);
  const sys = unitSystem.value;

  const du = v2 - v1;
  const dy = y2 - y1;

  if (dy === 0) {
    document.getElementById("result").innerHTML = `<span style="color:red">Error: y₂ - y₁ cannot be 0 (division by zero)</span>`;
    return;
  }

  const shearRate = du / dy; // 1/s
  let shearStress;
  let stressUnit;

  if (sys === "si") {
    shearStress = -mu * shearRate;
    stressUnit = "Pa";
  } else {
    const gc = 32.174; // lb·ft/(lbf·s²)
    shearStress = -(mu * shearRate) / gc;
    stressUnit = "lbf/ft²";
  }

  document.getElementById("result").innerHTML =
    `Shear Rate: <strong>${shearRate.toFixed(10)} 1/s</strong><br>` +
    `Shear Stress: <strong>${shearStress.toFixed(10)} ${stressUnit}</strong>`;
});

updateUnits();
