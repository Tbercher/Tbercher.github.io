document.addEventListener("DOMContentLoaded", () => {
  const genHtmlBtn = document.getElementById("generate-html-btn");
  const form = document.getElementById("intro-form");
  const outputContainer = document.getElementById("output-container");
  const pageTitle = document.getElementById("page-title");
  const formSubtitle = document.getElementById("form-subtitle");

  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  genHtmlBtn.onclick = () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const firstName = getVal("first-name");
    const middleName = getVal("middle-name");
    const lastName = getVal("last-name");
    const mascotAdj = getVal("mascot-adj");
    const mascotAnimal = getVal("mascot-animal");
    const ackStatement = getVal("ack-statement");
    const ackDate = getVal("ack-date");
    const customCaption = getVal("caption"); // Pulling from your caption field

    // Generate Initials for the top acknowledgement line only
    const initials = (
      (firstName[0] || "") +
      (middleName[0] || "") +
      (lastName[0] || "")
    ).toUpperCase();

    let coursesLi = "";
    document.querySelectorAll(".course-entry").forEach((entry) => {
      const dept = entry.querySelector(".course-dept").value;
      const num = entry.querySelector(".course-num").value;
      const name = entry.querySelector(".course-name").value;
      const reason = entry.querySelector(".course-reason").value;
      coursesLi += `            <li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>\n`;
    });

    const linkArray = [];
    document.querySelectorAll(".link-entry").forEach((entry) => {
      const name = entry.querySelector(".link-name").value;
      const url = entry.querySelector(".link-url").value;
      linkArray.push(`<a href="${url}" target="_blank">${name}</a>`);
    });

    // The Template String
    const rawHtmlCode = `<!DOCTYPE html>
<html lang="en">
<body>

    <header>
        <h1>${firstName} ${middleName ? middleName + " " : ""}${lastName}'s ${mascotAdj} ${mascotAnimal}</h1>
    </header>
    <main>
        <figure>
            <img src="${getVal("default-image")}" alt="${firstName}">
            <figcaption>${customCaption}</figcaption> 
        </figure>
        <p>${getVal("personal-state")}</p>
        <ul>
            ${getVal("nickname") ? `<li><strong>Nickname:</strong> ${getVal("nickname")}</li>` : ""}
            <li><strong>Personal Background:</strong> ${getVal("personal-bg")}</li>
            <li><strong>Professional Background:</strong> ${getVal("professional-bg")}</li>
            <li><strong>Academic Background:</strong> ${getVal("academic-bg")}</li>
            <li><strong>Subject Background:</strong> ${getVal("subject-bg")}</li>
            <li><strong>Computer Platform:</strong> ${getVal("computer-bg")}</li>
            <li><strong>Courses:</strong>
                <ul>
${coursesLi.trimEnd()}
                </ul>
            </li>
            ${getVal("funny-item") ? `<li><strong>Funny Item:</strong> ${getVal("funny-item")}</li>` : ""}
            ${getVal("share-item") ? `<li><strong>Shared Item:</strong> ${getVal("share-item")}</li>` : ""}
        </ul>
        <p><em>"${getVal("quote")}"</em> — ${getVal("quote-author")}</p>
        <nav>
            ${linkArray.join(" | ")}
        </nav>
    </main>
</body>
</html>`;

    pageTitle.innerText = "Introduction HTML";
    form.style.display = "none";
    formSubtitle.style.display = "none";

    outputContainer.innerHTML = `
            <section>
                <h3>Generated HTML Code:</h3>
                <pre><code class="language-html">${escapeHtml(rawHtmlCode)}</code></pre>
                <div style="text-align: center; margin-top: 20px;">
                    <button type="button" id="html-back-btn">Back to Form</button>
                </div>
            </section>
        `;
    outputContainer.style.display = "block";

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }

    document.getElementById("html-back-btn").onclick = () => {
      outputContainer.style.display = "none";
      form.style.display = "block";
      pageTitle.innerText = "Introduction Form";
      formSubtitle.style.display = "block";
    };
  };
});
