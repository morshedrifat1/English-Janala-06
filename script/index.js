// active button status
function removeSty() {
  const allBtn = document.querySelectorAll(".btn");
  for (const bt of allBtn) {
    bt.classList.remove("text-primary");
    bt.classList.remove("active");
  }
}

// document.getElementById("lesson-container").addEventListener("click", (event) => {
//   const tar = event.target;
//   if (tar.tagName == "BUTTON" || tar.tagName == "I") {
//     if (tar.parentElement.tagName == 'DIV') {
//       removeSty();
//       tar.classList.add("active");
//     }
//     else if (tar.parentElement.tagName == 'BUTTON') {
//       const scBT = tar.parentElement;
//       removeSty();
//       scBT.classList.add('active')
//     }

//   }
// });

// spin loader section
const showLoader = () => {
  document.getElementById("spin-loader").classList.remove("hidden");
  document.getElementById("lessonContent-container").classList.add("hidden");
  document.getElementById("selectLesson").classList.add("hidden");
};

const hideLoader = () => {
  document.getElementById("spin-loader").classList.add("hidden");
  document.getElementById("lessonContent-container").classList.remove("hidden");
};

// lessons name load and display

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLesson(data.data));
};

const displayLesson = (lessonS) => {
  const lessonContainer = document.getElementById("lesson-container");
  lessonS.forEach((lesson) => {
    const createLessonDiv = document.createElement("div");
    createLessonDiv.innerHTML = `
            <button id="btn-${lesson.level_no}" onclick="loadLessonContent(${lesson.level_no})" class="btn btn-lg md:btn-xl cursor-pointer border border-primary hover:bg-primary text-primary font-primary group hover:text-white text-sm font-semibold w-full rounded-md"><i class="fa-solid fa-book-open text-base mr-[6px] text-primary group-hover:text-white"></i> ${lesson.lessonName}</button>
        `;
    lessonContainer.appendChild(createLessonDiv);

    // active button status
    const lessBtn = document.getElementById(`btn-${lesson.level_no}`);
    lessBtn.addEventListener("click", () => {
      removeSty();
      lessBtn.classList.add("active");
    });
  });
};

// lesson content load and display

const loadLessonContent = (level) => {
  showLoader();
  const lessonContentApi = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(lessonContentApi)
    .then((response) => response.json())
    .then((data) => lessonContainerDisplay(data.data));
};

const lessonContainerDisplay = (lessonsData) => {
  document.getElementById("selectLesson").classList.add("hidden");
  const lessonContentContainer = document.getElementById(
    "lessonContent-container"
  );
  lessonContentContainer.classList.remove("hidden");
  lessonContentContainer.innerHTML = "";
  if (lessonsData.length === 0) {
    showLoader();
    lessonContentContainer.innerHTML = `
        <div class="bg-[#F8F8F8] rounded-xl grid justify-center justify-items-center gap-4 col-span-full">
          <img class="justify-items-center" src="img/alert-error.png" alt="">
          <p class="font-second text-center text-[#79716B] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h1 class="font-second text-[#292524] text-xl sm:text-[34px] font-medium">নেক্সট Lesson এ যান</h1>
        </div>
        `;
    hideLoader();
  }
  lessonsData.forEach((lesson) => {
    const createLessonDiv = document.createElement("div");
    createLessonDiv.innerHTML = `
            <div class="p-5 bg-white rounded-xl">
          <div class=" p-5 border border-gray-200 rounded-xl hover:bg-[#f1f8ff] hover:cursor-pointer group">
            <div class="text-center space-y-6">
              <h2 class="font-third text-2xl sm:text-3xl font-bold text-black">${
                lesson.word
              }</h2>
              <p class="font-third text-lg sm:text-xl font-medium text-black">Meaning /Pronounciation</p>
              <h2 class="font-second text-xl sm:text-2xl font-semibold text-[#18181B]">"${
                lesson.meaning == null ? "অর্থ নেই" : lesson.meaning
              } / ${lesson.pronunciation}"</h2>
            </div>
            <div class="flex justify-between pt-10">
              <button id="wordDetails" onclick="showLessonDetails(${
                lesson.id
              })" class="bg-[#e8f4ff] p-3 rounded-xl group-hover:bg-white hover:cursor-pointer border border-gray-200"><i class="fa-solid fa-circle-info text-xl text-[#374957]"></i></button>
              <button onclick="pronounceWord('${
                lesson.word
              }')" class="bg-[#e8f4ff] p-3 rounded-xl group-hover:bg-white hover:cursor-pointer border border-gray-200"><i class="fa-solid fa-volume-high text-lg text-[#374957]"></i></button>
            </div>
          </div>
        </div>

        `;
    lessonContentContainer.append(createLessonDiv);
    hideLoader();
  });
};

// lessons details popup

const showLessonDetails = (wordId) => {
  const lessonDetailsApi = `https://openapi.programming-hero.com/api/word/${wordId}`;
  fetch(lessonDetailsApi)
    .then((response) => response.json())
    .then((data) => loadLessonDetails(data.data));
};

const loadLessonDetails = (lessonDetail) => {
  const detailPopup = document.getElementById("lesson-det");

    detailPopup.innerHTML = `
        <h1 class="font-primary font-semibold text-xl md:text-3xl text-black">${
          lessonDetail.word
        } (<i class="fa-solid fa-microphone-lines"></i><span> :${
      lessonDetail.pronunciation
    }</span>)</h1>
              <div class="space-y-3">
                <h3 class="font-primary font-semibold text-lg md:text-xl text-black">Meaning</h3>
                <p class="font-second text-xl font-medium text-black">${
                  lessonDetail.meaning == null
                    ? "অর্থ পাওয়া যায়নি"
                    : lessonDetail.meaning
                }</p>
              </div>
              <div class="space-y-3">
                <h3 class="font-primary font-semibold text:lg md:text-xl text-black">Example</h3>
                <p class="font-primary text-lg md:text-xl text-black">${
                  lessonDetail.sentence
                }</p>
              </div>
              <div class="space-y-3">
                <h3 class="font-second font-medium text-lg md:text-xl text-black">সমার্থক শব্দ গুলো</h3>
                <div id="ty" class="flex gap-3 flex-wrap">

                  ${
                    lessonDetail.synonyms.length > 0
                      ? lessonDetail.synonyms
                          .map(
                            (synonym) =>
                              `<button class="bg-[rgb(237,247,255)] border border-[#D7E4EF] font-primary text-base text-black rounded-lg px-4 py-2">${synonym}</button>`
                          )
                          .join(" ")
                      : ""
                  }

                  
                </div>
              </div>
          <div class="modal-action flex justify-start">
            <form method="dialog">
              <button class="bg-primary px-8 py-2 rounded-lg text-lg text-white font-second font-medium cursor-pointer">Complete Learning</button>
            </form>
            </div>
    `;

    document.getElementById("my_modal_4").showModal();
};

// word read sound function
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

loadLesson();
