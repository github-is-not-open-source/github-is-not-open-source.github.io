const girl = document.getElementById("girl");
const exam = document.getElementById("exam");
const curious = document.getElementById("curious");

girl.addEventListener('click', () => {
    exam.style.display = 'block';
    document.body.style.cursor = 'default';
    curious.style.visibility = 'hidden';
  });

const okay = document.getElementById('okay');
const nokay = document.getElementById('nokay');
const page2 = document.getElementById('page2');

okay.addEventListener('click', () => {
    page2.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
    document.body.style.cursor = 'default';
})

nokay.addEventListener('click', () => {
    page2.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
    document.body.style.cursor = 'default';
})