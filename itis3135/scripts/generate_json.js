document.addEventListener("DOMContentLoaded", () => {
  const genJsonBtn = document.getElementById("generate-json-btn");
  const form = document.getElementById("intro-form");
  const outputContainer = document.getElementById("output-container");
  const pageTitle = document.getElementById("page-title");
  const formSubtitle = document.getElementById("form-subtitle");

  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  genJsonBtn.onclick = () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 1. Collect Personal Data & Generate Initials
    const firstName = getVal("first-name");
    const middleName = getVal("middle-name");
    const lastName = getVal("last-name");
    const initials = (
      (firstName[0] || "") +
      (middleName[0] || "") +
      (lastName[0] || "")
    ).toUpperCase();

    const imageInput = document.getElementById("user-image");
    let imageUrl = getVal("default-image");
    if (imageInput && imageInput.files && imageInput.files[0]) {
      imageUrl = imageInput.files[0].name;
    }

    const courses = [];
    document.querySelectorAll(".course-entry").forEach((entry) => {
      courses.push({
        dept: entry.querySelector(".course-dept").value,
        number: entry.querySelector(".course-num").value,
        name: entry.querySelector(".course-name").value,
        reason: entry.querySelector(".course-reason").value
      });
    });

    const links = [];
    document.querySelectorAll(".link-entry").forEach((entry) => {
      links.push({
        name: entry.querySelector(".link-name").value,
        url: entry.querySelector(".link-url").value
      });
    });

    // 2. Build the JSON Object
    const introData = {
      personalInfo: {
        firstName: firstName,
        middleName: middleName || null,
        lastName: lastName,
        nickname: getVal("nickname") || null,
        mascot: `${getVal("mascot-adj")} ${getVal("mascot-animal")}`
      },
      imageContent: {
        imagePath: imageUrl,
        caption: getVal("caption"),
        statement: getVal("personal-state")
      },
      background: {
        personal: getVal("personal-bg"),
        professional: getVal("professional-bg"),
        academic: getVal("academic-bg"),
        subject: getVal("subject-bg"),
        computer: getVal("computer-bg")
      },
      extras: {
        funnyItem: getVal("funny-item") || null,
        shareItem: getVal("share-item") || null,
        quote: {
          text: getVal("quote"),
          author: getVal("quote-author")
        }
      },
      courses: courses,
      links: links
    };

    const jsonString = JSON.stringify(introData, null, 4);

    // 3. Update UI
    pageTitle.innerText = "Introduction JSON";
    form.style.display = "none";
    formSubtitle.style.display = "none";

    outputContainer.innerHTML = `
            <section>
                <h3>Generated JSON Data:</h3>
                <pre><code class="language-json">${jsonString}</code></pre>
                <div style="text-align: center; margin-top: 20px;">
                    <button type="button" id="json-back-btn">Back to Form</button>
                </div>
            </section>
        `;
    outputContainer.style.display = "block";

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }

    document.getElementById("json-back-btn").onclick = () => {
      outputContainer.style.display = "none";
      form.style.display = "block";
      pageTitle.innerText = "Introduction Form";
      formSubtitle.style.display = "block";
    };
  };
});
