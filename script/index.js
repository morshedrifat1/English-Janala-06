// lessons name load and display 

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((response) => response.json())
      .then((data) => displayLesson(data.data));
}

const displayLesson = (lessonS) => {
    console.log(lessonS);
    const lessonContainer = document.getElementById('lesson-container');
    lessonS.forEach((lesson) => {
        const createLessonDiv = document.createElement('div');
        createLessonDiv.innerHTML = `
            <button class="cursor-pointer border border-primary hover:bg-primary text-primary font-primary group hover:text-white text-sm font-semibold w-full px-2 py-[12px] rounded-md"><i class="fa-solid fa-book-open text-base mr-[6px] text-primary group-hover:text-white"></i>${lesson.lessonName}</button>
        `;
        lessonContainer.appendChild(createLessonDiv)
    });
}
loadLesson()