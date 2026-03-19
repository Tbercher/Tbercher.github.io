document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const outputContainer = document.getElementById("output-container");
  const pageTitle = document.getElementById("page-title");
  const formSubtitle = document.getElementById("form-subtitle");

  const courseSection = document.getElementById("courses-container");
  const linkSection = document.getElementById("links-container");

  const DEFAULT_IMG = "images/myprofessionalheadshot.png";

  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  // --- 1. Dynamic Row Logic ---
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

  // --- 2. Button Logic ---
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      window.location.reload();
    };
  }

  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) {
    clearBtn.onclick = (e) => {
      e.preventDefault();
      form.querySelectorAll("input, textarea").forEach((input) => {
        if (!["submit", "reset", "button", "hidden"].includes(input.type)) {
          input.value = "";
        }
      });
      const courses = document.querySelectorAll(".course-entry");
      courses.forEach((c, index) => {
        if (index > 0) c.remove();
        else c.querySelectorAll("input").forEach((i) => (i.value = ""));
      });
      const links = document.querySelectorAll(".link-entry");
      links.forEach((l, index) => {
        if (index > 0) l.remove();
        else l.querySelectorAll("input").forEach((i) => (i.value = ""));
      });
    };
  }

  // --- 3. Submit Logic ---
  form.onsubmit = (e) => {
    e.preventDefault();

    const firstName = getVal("first-name");
    const middleName = getVal("middle-name");
    const nickname = getVal("nickname");
    const lastName = getVal("last-name");
    const mascotAdj = getVal("mascot-adj");
    const mascotAnimal = getVal("mascot-animal");

    const ackStatement = getVal("ack-statement");
    const ackDate = getVal("ack-date");
    const customCaption = getVal("caption");

    // Backgrounds
    const personalSt = getVal("personal-state");
    const personalBg = getVal("personal-bg");
    const professionalBg = getVal("professional-bg");
    const academicBg = getVal("academic-bg");
    const subjectBg = getVal("subject-bg");
    const computerBg = getVal("computer-bg");

    // Optional extras
    const funnyItem = getVal("funny-item");
    const shareItem = getVal("share-item");

    const initials = (
      (firstName[0] || "") +
      (middleName[0] || "") +
      (lastName[0] || "")
    ).toUpperCase();
    const headerTitle = `${firstName} ${middleName ? middleName + " " : ""}${nickname ? `"${nickname}" ` : ""}${lastName}'s ${mascotAdj} ${mascotAnimal}`;

    let courseHTML = "<ul>";
    document.querySelectorAll(".course-entry").forEach((entry) => {
      const dept = entry.querySelector(".course-dept").value;
      const num = entry.querySelector(".course-num").value;
      const name = entry.querySelector(".course-name").value;
      const reason = entry.querySelector(".course-reason").value;
      if (dept && num) {
        courseHTML += `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
      }
    });
    courseHTML += "</ul>";

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
            

            <h2 style="text-align: center;">${headerTitle}</h2>
            
            <figure style="text-align: center;">
                <img src="${imageUrl}" alt="Profile Photo" style="max-width: 300px; border-radius: 10px;">
                <figcaption>${customCaption}</figcaption> 
            </figure>
            <p>${personalSt}</p>
            <ul style="list-style: none; padding: 0;">
            <li><h3>Background & Interests</h3></li>
                <li><strong>\u2022Personal Background:</strong> ${personalBg}</li>
                <li><strong>\u2022Professional Background:</strong> ${professionalBg}</li>
                <li><strong>\u2022Academic Background:</strong> ${academicBg}</li>
                <li><strong>\u2022Subject Background:</strong> ${subjectBg}</li>
                <li><strong>\u2022Primary Computer:</strong> ${computerBg}</li>
                ${funnyItem ? `<li><strong>\u2022Funny/Interesting Item:</strong> ${funnyItem}</li>` : ""}
                ${shareItem ? `<li><strong>\u2022I'd also like to share:</strong> ${shareItem}</li>` : ""}
                <li><strong><h3>Courses:</h3></strong> ${courseHTML}</li>
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
