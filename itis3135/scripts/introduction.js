document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const outputContainer = document.getElementById("output-container");
  const addCourseBtn = document.getElementById("add-course-btn");
  const coursesContainer = document.getElementById("courses-container");
  const addLinkBtn = document.getElementById("add-link-btn");
  const linksContainer = document.getElementById("links-container");

  const pageTitle = document.getElementById("page-title");
  const formSubtitle = document.getElementById("form-subtitle");

  // Helper function to safely get trimmed values and avoid "null" crashes
  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  // --- 1. Dynamic Course/Link Management ---
  addCourseBtn.onclick = () => {
    const div = document.createElement("div");
    div.className = "course-entry";
    div.innerHTML = `
            <input type="text" class="course-dept" placeholder="Dept" required />
            <input type="text" class="course-num" placeholder="No." required />
            <input type="text" class="course-name" placeholder="Course Name" required />
            <input type="text" class="course-reason" placeholder="Reason" required />
            <button type="button" class="delete-course-btn">Delete</button>`;
    coursesContainer.appendChild(div);
    div.querySelector(".delete-course-btn").onclick = () => div.remove();
  };

  addLinkBtn.onclick = () => {
    const div = document.createElement("div");
    div.className = "link-entry";
    div.innerHTML = `
            <label>Link Name: <input type="text" class="link-name" required /></label>
            <label>URL: <input type="url" class="link-url" required /></label>
            <button type="button" class="delete-link-btn">Delete</button>`;
    linksContainer.appendChild(div);
    div.querySelector(".delete-link-btn").onclick = () => div.remove();
  };

  // --- 2. Reset Logic ---
  const resetFormUI = () => {
    form.reset();
    form.style.display = "block";
    pageTitle.style.display = "block";
    formSubtitle.style.display = "block";
    outputContainer.style.display = "none";
    window.scrollTo(0, 0);
  };

  document.getElementById("reset-btn").onclick = resetFormUI;

  document.getElementById("clear-btn").onclick = () => {
    form.querySelectorAll("input, textarea").forEach((i) => {
      if (!["button", "submit", "reset", "hidden"].includes(i.type))
        i.value = "";
    });
  };

  // --- 3. Submit Logic ---
  form.onsubmit = (e) => {
    e.preventDefault();

    const firstName = getVal("first-name");
    const middleName = getVal("middle-name");
    const lastName = getVal("last-name");
    const nickname = getVal("nickname");
    const mascotAdj = getVal("mascot-adj");
    const mascotAnimal = getVal("mascot-animal");

    // Generate initials safely
    const initials = (
      (firstName[0] || "") +
      (middleName[0] || "") +
      (lastName[0] || "")
    ).toUpperCase();

    // Conditional HTML for optional fields
    const nicknameHTML = nickname
      ? `<li><strong>Nickname:</strong> ${nickname}</li>`
      : "";
    const funnyItem = getVal("funny-item");
    const funnyHTML = funnyItem
      ? `<li><strong>Funny/Interesting item:</strong> ${funnyItem}</li>`
      : "";
    const shareItem = getVal("share-item");
    const shareHTML = shareItem
      ? `<li><strong>Also like to share:</strong> ${shareItem}</li>`
      : "";

    // Build Course List
    let courseHTML = "<ul>";
    document.querySelectorAll(".course-entry").forEach((entry) => {
      const dept = entry.querySelector(".course-dept").value;
      const num = entry.querySelector(".course-num").value;
      const name = entry.querySelector(".course-name").value;
      const reason = entry.querySelector(".course-reason").value;
      courseHTML += `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
    });
    courseHTML += "</ul>";

    // Build Links List
    const linkArray = [];
    document.querySelectorAll(".link-entry").forEach((entry) => {
      const name = entry.querySelector(".link-name").value;
      const url = entry.querySelector(".link-url").value;
      linkArray.push(`<a href="${url}" target="_blank">${name}</a>`);
    });
    const linksHTML = linkArray.join(" | ");

    // Handle Image
    const imageInput = document.getElementById("user-image");
    const imageFile = imageInput.files ? imageInput.files[0] : null;
    const imageUrl = imageFile
      ? URL.createObjectURL(imageFile)
      : getVal("default-image");

    outputContainer.innerHTML = `
            <h2 style="text-align: center;">${firstName} ${middleName ? middleName + " " : ""}${lastName}'s ${mascotAdj} ${mascotAnimal} | ITIS3135</h2>
            <figure style="text-align: center;">
                <img src="${imageUrl}" alt="${firstName}'s Photo" style="max-width: 300px; border-radius: 10px;">
                <figcaption>${firstName} ${middleName ? middleName + " " : ""}${lastName} (${initials})</figcaption>
            </figure>
            <ul style="list-style: none; padding: 0;">
                ${nicknameHTML}
                <li><strong>Personal Background:</strong> ${getVal("personal-bg")}</li>
                <li><strong>Professional Background:</strong> ${getVal("professional-bg")}</li>
                <li><strong>Academic Background:</strong> ${getVal("academic-bg")}</li>
                <li><strong>Background in this Subject:</strong> ${getVal("subject-bg")}</li>
                <li><strong>Primary Computer Platform:</strong> ${getVal("computer-bg")}</li>
                <li><strong>Courses:</strong> ${courseHTML}</li>
                ${funnyHTML}
                ${shareHTML}
            </ul>
            <p style="text-align: center; font-style: italic; margin-top: 20px;">"${getVal("quote")}" — ${getVal("quote-author")}</p>
            
            <div id="output-links" style="text-align: center; margin-top: 20px; font-weight: bold;">
                ${linksHTML}
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button type="button" id="reset-page-btn">Fill out the form again</button>
            </div>
        `;

    form.style.display = "none";
    pageTitle.style.display = "none";
    formSubtitle.style.display = "none";
    outputContainer.style.display = "block";
    document.getElementById("reset-page-btn").onclick = resetFormUI;
  };
});
