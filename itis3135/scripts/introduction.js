document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const outputContainer = document.getElementById("output-container");
  const pageTitle = document.getElementById("page-title");
  const formSubtitle = document.getElementById("form-subtitle");

  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  // --- 1. Clear Button Logic ---
  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) {
    clearBtn.onclick = () => {
      // Standard form reset
      form.reset();

      // Manually empty all inputs to ensure they are truly blank
      form.querySelectorAll("input, textarea").forEach((input) => {
        if (!["submit", "button"].includes(input.type)) {
          input.value = "";
        }
      });

      // FIX: Force the image preview back to your professional headshot
      const previewImg = document.querySelector("#intro-form img");
      if (previewImg) {
        previewImg.src = "images/myprofessionalheadshot.png";
      }

      console.log("Form cleared and image reset to professional headshot.");
    };
  }

  form.onsubmit = (e) => {
    e.preventDefault();

    // Data Collection
    const firstName = getVal("first-name");
    const middleName = getVal("middle-name");
    const lastName = getVal("last-name");
    const mascotAdj = getVal("mascot-adj");
    const mascotAnimal = getVal("mascot-animal");
    const ackStatement = getVal("ack-statement");
    const ackDate = getVal("ack-date");
    const customCaption = getVal("caption");

    const initials = (
      (firstName[0] || "") +
      (middleName[0] || "") +
      (lastName[0] || "")
    ).toUpperCase();

    // Build Courses
    let courseHTML = "<ul>";
    document.querySelectorAll(".course-entry").forEach((entry) => {
      const dept = entry.querySelector(".course-dept").value;
      const num = entry.querySelector(".course-num").value;
      const name = entry.querySelector(".course-name").value;
      const reason = entry.querySelector(".course-reason").value;
      courseHTML += `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
    });
    courseHTML += "</ul>";

    // Build Links
    const linkArray = [];
    document.querySelectorAll(".link-entry").forEach((entry) => {
      const name = entry.querySelector(".link-name").value;
      const url = entry.querySelector(".link-url").value;
      linkArray.push(`<a href="${url}" target="_blank">${name}</a>`);
    });

    // Handle Image for Output
    const imageInput = document.getElementById("user-image");
    const imageUrl =
      imageInput.files && imageInput.files[0]
        ? URL.createObjectURL(imageInput.files[0])
        : "images/myprofessionalheadshot.png";

    // --- 2. Render Output ---
    outputContainer.innerHTML = `
            <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
                ${ackStatement} - ${initials} - ${ackDate}
            </p>

            <h2 style="text-align: center;">${firstName} ${middleName ? middleName + " " : ""}${lastName}'s ${mascotAdj} ${mascotAnimal} | ITIS3135</h2>
            
            <figure style="text-align: center;">
                <img src="${imageUrl}" alt="${firstName}'s Photo" style="max-width: 300px; border-radius: 10px;">
                <figcaption>${customCaption}</figcaption> 
            </figure>

            <ul style="list-style: none; padding: 0;">
                ${getVal("nickname") ? `<li><strong>Nickname:</strong> ${getVal("nickname")}</li>` : ""}
                <li><strong>Personal Background:</strong> ${getVal("personal-bg")}</li>
                <li><strong>Professional Background:</strong> ${getVal("professional-bg")}</li>
                <li><strong>Academic Background:</strong> ${getVal("academic-bg")}</li>
                <li><strong>Background in this Subject:</strong> ${getVal("subject-bg")}</li>
                <li><strong>Primary Computer Platform:</strong> ${getVal("computer-bg")}</li>
                <li><strong>Courses:</strong> ${courseHTML}</li>
                ${getVal("funny-item") ? `<li><strong>Funny/Interesting item:</strong> ${getVal("funny-item")}</li>` : ""}
                ${getVal("share-item") ? `<li><strong>Also like to share:</strong> ${getVal("share-item")}</li>` : ""}
            </ul>

            <p style="text-align: center; font-style: italic; margin-top: 20px;">"${getVal("quote")}" — ${getVal("quote-author")}</p>
            
            <div id="output-links" style="text-align: center; margin-top: 20px; font-weight: bold;">
                ${linkArray.join(" | ")}
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button type="button" id="reset-page-btn">Fill out the form again</button>
            </div>
        `;

    form.style.display = "none";
    pageTitle.style.display = "none";
    formSubtitle.style.display = "none";
    outputContainer.style.display = "block";

    // --- 3. Reset Button Logic ---
    const resetBtn = document.getElementById("reset-page-btn");
    if (resetBtn) {
      resetBtn.onclick = () => {
        window.location.reload();
      };
    }
  };
});
