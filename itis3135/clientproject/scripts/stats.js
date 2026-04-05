let isMetric = false;

const imperialData = {
  height: { value: "6'0\"" },
  weight: { value: "140 lbs" },
  chest: { value: "32 in" },
  waist: { value: "27 in" },
  hair: { value: "Sandy Brown" },
  eyes: { value: "Brown" },
  shoes: { value: "US 12" }
};

const metricData = {
  height: { value: "182.9 cm" },
  weight: { value: "63.5 kg" },
  chest: { value: "81 cm" },
  waist: { value: "69 cm" },
  hair: { value: "Sandy Brown" },
  eyes: { value: "Brown" },
  shoes: { value: "EU 46" }
};

function toggleUnits() {
  isMetric = !isMetric;
  const data = isMetric ? metricData : imperialData;

  for (const [id, obj] of Object.entries(data)) {
    const cell = document.getElementById(id);
    if (cell) cell.textContent = obj.value;
  }

  const btn = document.getElementById("toggle-btn");
  if (btn)
    btn.textContent = isMetric
      ? "Switch to Imperial / US"
      : "Switch to Metric / EU";
}

function downloadCompCard() {
  const link = document.createElement("a");
  link.href = "assets/Taylor_Elizabeth_Comp_Card.pdf";
  link.download = "Taylor_Elizabeth_Comp_Card.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
