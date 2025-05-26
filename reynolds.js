const unitSystemSelector = document.getElementById("unitSystem");

const velocityLabel = document.getElementById("velocityUnit");
const densityLabel = document.getElementById("densityUnit");
const viscosityLabel = document.getElementById("viscosityUnit");
const diameterLabel = document.getElementById("diameterUnit");

unitSystemSelector.addEventListener("change", updateUnitLabels);

function updateUnitLabels() {
    const system = unitSystemSelector.value;
    if (system === "si") {
        velocityLabel.textContent = "m/s";
        densityLabel.textContent = "kg/m³";
        viscosityLabel.textContent = "Pa·s";
        diameterLabel.textContent = "m";
    } else {
        velocityLabel.textContent = "ft/s";
        densityLabel.textContent = "lb/ft³";
        viscosityLabel.textContent = "lb/ft·s";
        diameterLabel.textContent = "ft";
    }
}

document.getElementById("reynoldsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const system = unitSystemSelector.value;

    const velocity = parseFloat(document.getElementById("velocity").value);
    const density = parseFloat(document.getElementById("density").value);
    const viscosity = parseFloat(document.getElementById("viscosity").value);
    const diameter = parseFloat(document.getElementById("diameter").value);

    let reynolds;

    if (system === "si") {
        reynolds = (density * velocity * diameter) / viscosity;
    } else {
        // AE: all units are in lb/ft³, ft/s, ft, lb/ft·s
        reynolds = (density * velocity * diameter) / viscosity;
    }

    let flowType = "";
    if (reynolds < 2100) {
        flowType = "Laminar Flow";
    } else if (reynolds <= 4000) {
        flowType = "Transition Flow";
    } else {
        flowType = "Turbulent Flow";
    }

    document.getElementById("result").innerHTML =
        `Reynolds Number: <strong>${reynolds.toFixed(3)}</strong><br>` +
        `Flow Type: <strong>${flowType}</strong>`;
});

