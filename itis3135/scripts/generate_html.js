document.addEventListener("DOMContentLoaded", function () {
  const generateHtmlBtn = document.getElementById("generate-html-btn");
  const formElement = document.getElementById("intro-form");

  generateHtmlBtn.addEventListener("click", () => {
    // 1. Validate the form before generating
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    // 2. Gather Personal Data
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const nickname = document.getElementById("nickname").value;
    const mascotAdj = document.getElementById("mascot-adj").value;
    const mascotAnimal = document.getElementById("mascot-animal").value;
    const divider = document.getElementById("divider").value;

    const fullName = nickname
      ? `${firstName} "${nickname}" ${lastName}`
      : `${firstName} ${lastName}`;

    // Note: For a downloaded HTML file, a locally uploaded blob URL will break once the browser closes.
    // We will use the default relative image path to ensure it works in your project folder.
    const defaultImage = document.getElementById("default-image").value;
    const caption = document.getElementById("caption").value;

    // 3. Gather Backgrounds & Extras
    const personalBg = document.getElementById("personal-bg").value;
    const professionalBg = document.getElementById("professional-bg").value;
    const academicBg = document.getElementById("academic-bg").value;
    const subjectBg = document.getElementById("subject-bg").value;
    const computerBg = document.getElementById("computer-bg").value;
    const funnyItem = document.getElementById("funny-item").value;
    const shareItem = document.getElementById("share-item").value;
    const quote = document.getElementById("quote").value;
    const quoteAuthor = document.getElementById("quote-author").value;

    // 4. Map Courses
    let coursesList = "<ul>\n";
    document.querySelectorAll(".course-entry").forEach((entry) => {
      const dept = entry.querySelector(".course-dept").value;
      const num = entry.querySelector(".course-num").value;
      const name = entry.querySelector(".course-name").value;
      const reason = entry.querySelector(".course-reason").value;
      coursesList += `        <li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>\n`;
    });
    coursesList += "      </ul>";

    // 5. Map Links
    let linksList = "<ul>\n";
    document.querySelectorAll(".link-entry").forEach((entry) => {
      const name = entry.querySelector(".link-name").value;
      const url = entry.querySelector(".link-url").value;
      linksList += `        <li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>\n`;
    });
    linksList += "      </ul>";

    // 6. Construct the complete HTML string
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${firstName} ${lastName}'s ${mascotAdj} ${mascotAnimal} | Introduction</title>
    <style>
      body {
        font-family: 'Lato', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      figure { text-align: center; margin: 2rem 0; }
      img { max-width: 300px; border-radius: 8px; }
      blockquote {
        border-left: 4px solid #ccc;
        padding-left: 1rem;
        font-style: italic;
        margin-top: 2rem;
        color: #555;
      }
    </style>
  </head>
  <body>
    <header>
      <h2>${fullName} ${divider} ${mascotAdj} ${mascotAnimal}</h2>
    </header>
    
    <main>
      <figure>
        <img src="${defaultImage}" alt="Profile picture for ${firstName}" />
        <figcaption><em>${caption}</em></figcaption>
      </figure>

      <section>
        <ul>
          <li><strong>Personal Background:</strong> ${personalBg}</li>
          <li><strong>Professional Background:</strong> ${professionalBg}</li>
          <li><strong>Academic Background:</strong> ${academicBg}</li>
          <li><strong>Background in this Subject:</strong> ${subjectBg}</li>
          <li><strong>Primary Computer Platform:</strong> ${computerBg}</li>
          ${funnyItem ? `<li><strong>Funny/Interesting Item:</strong> ${funnyItem}</li>` : ""}
          ${shareItem ? `<li><strong>Also Sharing:</strong> ${shareItem}</li>` : ""}
        </ul>
      </section>

      <section>
        <h3>Courses I'm Taking</h3>
${coursesList}
      </section>

      <section>
        <h3>My Links</h3>
${linksList}
      </section>

      <blockquote>
        "${quote}" <br><strong>— ${quoteAuthor}</strong>
      </blockquote>
    </main>
  </body>
</html>`;

    // 7. Create a Blob and trigger the download
    const blob = new Blob([htmlTemplate], { type: "text/html" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "introduction.html";

    // Append, click, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
