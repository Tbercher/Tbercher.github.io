document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const outputContainer = document.getElementById("output-container");
  const pageTitle = document.getElementById("page-title");
  const formSubtitle = document.getElementById("form-subtitle");

  // Containers matching your HTML IDs
  const courseSection = document.getElementById("courses-container");
  const linkSection = document.getElementById("links-container");

  const DEFAULT_IMG = "images/myprofessionalheadshot.png";

  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  // --- 1. Dynamic Row Logic ---

  // Add Course Row
  const addCourseBtn = document.getElementById("add-course-btn");
  if (addCourseBtn) {
    addCourseBtn.onclick = () => {
      const newCourse = document.createElement("div");
      newCourse.className = "course-entry";
      newCourse.innerHTML = `
            <input type="text" class="course-dept" placeholder="Dept" required>
            <input type="text" class="course-num" placeholder="Number" required>
            <input type="text" class="course-name" placeholder="Course Name" required>
            <input type="text" class="course-reason" placeholder="Why?" required>
            <button type="button" class="delete-course-btn">Delete</button>
        `;
      courseSection.appendChild(newCourse);
    };
  }

  // Add Link Row
  const addLinkBtn = document.getElementById("add-link-btn");
  if (addLinkBtn) {
    addLinkBtn.onclick = () => {
      const newLink = document.createElement("div");
      newLink.className = "link-entry";
      newLink.innerHTML = `
            <label>Link Name: <input type="text" class="link-name" required></label>
            <label>URL: <input type="url" class="link-url" required></label>
            <button type="button" class="delete-link-btn">Delete</button>
        `;
      linkSection.appendChild(newLink);
    };
  }

  // Delete Logic (Prevents deleting the last remaining row)
  document.addEventListener("click", (e) => {
    if (
      e.target &&
      (e.target.classList.contains("delete-course-btn") ||
        e.target.classList.contains("delete-link-btn"))
    ) {
      const entryClass = e.target.classList.contains("delete-course-btn")
        ? ".course-entry"
        : ".link-entry";
      if (document.querySelectorAll(entryClass).length > 1) {
        e.target.parentElement.remove();
      } else {
        e.target.parentElement
          .querySelectorAll("input")
          .forEach((i) => (i.value = ""));
      }
    }
  });

  // --- 2. Button Logic (Reset vs Clear) ---

  // RESET BUTTON: Returns to the Trevor template
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      window.location.reload();
    };
  }

  // CLEAR BUTTON: Makes the form entirely blank
  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) {
    clearBtn.onclick = (e) => {
      e.preventDefault();

      // Wipe all main inputs
      form.querySelectorAll("input, textarea").forEach((input) => {
        if (!["submit", "reset", "button", "hidden"].includes(input.type)) {
          input.value = "";
        }
      });

      // Prune Courses to 1 empty row
      const courses = document.querySelectorAll(".course-entry");
      courses.forEach((c, index) => {
        if (index > 0) c.remove();
        else c.querySelectorAll("input").forEach((i) => (i.value = ""));
      });

      // Prune Links to 1 empty row
      const links = document.querySelectorAll(".link-entry");
      links.forEach((l, index) => {
        if (index > 0) l.remove();
        else l.querySelectorAll("input").forEach((i) => (i.value = ""));
      });

      // Reset image preview
      const previewImg = document.querySelector("#intro-form img");
      if (previewImg) previewImg.src = DEFAULT_IMG;
    };
  }

  // --- 3. Submit Logic ---
  form.onsubmit = (e) => {
    e.preventDefault();

    const firstName = getVal("first-name");
    const middleName = getVal("middle-name");
    const lastName = getVal("last-name");
    const ackStatement = getVal("ack-statement");
    const ackDate = getVal("ack-date");
    const customCaption = getVal("caption");

    const initials = (
      (firstName[0] || "") +
      (middleName[0] || "") +
      (lastName[0] || "")
    ).toUpperCase();

    // Build Course List
    let courseHTML = "<ul>";
    document.querySelectorAll(".course-entry").forEach((entry) => {
      const dept = entry.querySelector(".course-dept").value;
      const num = entry.querySelector(".course-num").value;
      const name = entry.querySelector(".course-name").value;
      const reason = entry.querySelector(".course-reason").value;
      if (dept || num) {
        courseHTML += `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
      }
    });
    courseHTML += "</ul>";

    // Build Links
    const linkArray = [];
    document.querySelectorAll(".link-entry").forEach((entry) => {
      const name = entry.querySelector(".link-name").value;
      const url = entry.querySelector(".link-url").value;
      if (name && url) {
        linkArray.push(`<a href="${url}" target="_blank">${name}</a>`);
      }
    });

    const imageInput = document.getElementById("user-image");
    const imageUrl =
      imageInput.files && imageInput.files[0]
        ? URL.createObjectURL(imageInput.files[0])
        : DEFAULT_IMG;

    outputContainer.innerHTML = `
            <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
                ${ackStatement} - ${initials} - ${ackDate}
            </p>

            <h2 style="text-align: center;">${firstName} ${middleName ? middleName + " " : ""}${lastName}'s ${getVal("mascot-adj")} ${getVal("mascot-animal")}</h2>
            
            <figure style="text-align: center;">
                <img src="${imageUrl}" alt="Profile Photo" style="max-width: 300px; border-radius: 10px;">
                <figcaption>${customCaption}</figcaption> 
            </figure>

            <ul style="list-style: none; padding: 0;">
                ${getVal("nickname") ? `<li><strong>Nickname:</strong> ${getVal("nickname")}</li>` : ""}
                <li><strong>Personal Background:</strong> ${getVal("personal-bg")}</li>
                <li><strong>Professional Background:</strong> ${getVal("professional-bg")}</li>
                <li><strong>Academic Background:</strong> ${getVal("academic-bg")}</li>
                <li><strong>Courses:</strong> ${courseHTML}</li>
            </ul>

            <p style="text-align: center; font-style: italic; margin-top: 20px;">"${getVal("quote")}" — ${getVal("quote-author")}</p>
            
            <div style="text-align: center; margin-top: 20px; font-weight: bold;">
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

    document.getElementById("reset-page-btn").onclick = () => {
      window.location.reload();
    };
  };
});
