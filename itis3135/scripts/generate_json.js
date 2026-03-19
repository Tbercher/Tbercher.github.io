document.addEventListener("DOMContentLoaded", function () {
  const generateJsonBtn = document.getElementById("generate-json-btn");
  const formElement = document.getElementById("intro-form");

  generateJsonBtn.addEventListener("click", () => {
    // 1. Check if the form is valid before generating the JSON
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    // 2. Gather simple text/date inputs
    const formData = {
      personalInfo: {
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        lastName: document.getElementById("last-name").value,
        nickname: document.getElementById("nickname").value,
        acknowledgmentStatement: document.getElementById("ack-statement").value,
        acknowledgmentDate: document.getElementById("ack-date").value,
        mascotAdjective: document.getElementById("mascot-adj").value,
        mascotAnimal: document.getElementById("mascot-animal").value,
        divider: document.getElementById("divider").value,
      },
      content: {
        caption: document.getElementById("caption").value,
        personalBackground: document.getElementById("personal-bg").value,
        professionalBackground:
          document.getElementById("professional-bg").value,
        academicBackground: document.getElementById("academic-bg").value,
        subjectBackground: document.getElementById("subject-bg").value,
        primaryComputer: document.getElementById("computer-bg").value,
        funnyItem: document.getElementById("funny-item").value,
        shareItem: document.getElementById("share-item").value,
      },
      courses: [],
      extras: {
        quote: document.getElementById("quote").value,
        quoteAuthor: document.getElementById("quote-author").value,
        links: [],
      },
    };

    // 3. Gather Course Data
    document.querySelectorAll(".course-entry").forEach((entry) => {
      formData.courses.push({
        department: entry.querySelector(".course-dept").value,
        number: entry.querySelector(".course-num").value,
        name: entry.querySelector(".course-name").value,
        reason: entry.querySelector(".course-reason").value,
      });
    });

    // 4. Gather Link Data
    document.querySelectorAll(".link-entry").forEach((entry) => {
      formData.extras.links.push({
        name: entry.querySelector(".link-name").value,
        url: entry.querySelector(".link-url").value,
      });
    });

    // 5. Convert the JavaScript object to a formatted JSON string (2 spaces indentation)
    const jsonString = JSON.stringify(formData, null, 2);

    // 6. Create a Blob (file-like object) containing the JSON data
    const blob = new Blob([jsonString], { type: "application/json" });

    // 7. Create a temporary download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "introduction_data.json"; // Name of the downloaded file

    // Append link to body, click it, and immediately remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
