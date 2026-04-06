// ─── Taylor Elizabeth | Casting Dashboard ────────────────────────────────────
// Contact information — update these values as needed
const TALENT = {
  name: "Taylor Elizabeth",
  phone: "+1 (555) 867-5309",
  email: "taylorrelizabethh81@gmail.com",
  title: "Talent | Actor & Model",
  website: "www.taylorelizabeth.com",
  instagram: "@taylorelizabeth",
  agency: "Premier Talent Agency",
  agencyPhone: "+1 (555) 200-0100"
};

// ─── DOWNLOAD PORTFOLIO PDF ───────────────────────────────────────────────────
function downloadPortfolio() {
  const a = document.createElement("a");
  a.href = "assets/Taylor_Elizabeth_Comp_Card.pdf";
  a.download = "Taylor_Elizabeth_Comp_Card.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ─── SAVE TO CONTACTS (vCard) ─────────────────────────────────────────────────
function saveToContacts() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${TALENT.name}`,
    `N:Elizabeth;Taylor;;;`,
    `TITLE:${TALENT.title}`,
    `ORG:${TALENT.agency}`,
    `TEL;TYPE=CELL,VOICE:${TALENT.phone}`,
    `EMAIL;TYPE=INTERNET:${TALENT.email}`,
    `URL:https://${TALENT.website}`,
    `X-SOCIALPROFILE;type=instagram:${TALENT.instagram}`,
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "TaylorElizabeth.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
