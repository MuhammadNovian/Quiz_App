// Daftar Soal
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is the largest mammal?",
    answers: ["Elephant", "Whale", "Shark", "Rhino"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// DOM Elements
const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const loadingEl = document.getElementById('loading');
const quizContent = document.getElementById('quiz');
const reviewContent = document.getElementById('review');
const scoreEl = document.getElementById('score');
const reviewContainer = document.getElementById('review-container');

// Tampilkan soal dan jawaban
function showQuestion() {
  const question = questions[currentQuestion];
  questionContainer.textContent = question.question;

  answersContainer.innerHTML = '';
  question.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index, btn);
    answersContainer.appendChild(btn);
  });

  nextBtn.style.display = 'none';
}

function selectAnswer(index, btn) {
  const buttons = document.querySelectorAll('#answers button');
  
  // Reset warna semua tombol
  buttons.forEach(button => {
    button.style.backgroundColor = "#3498db";  // Warna asli
  });

  // Tandai tombol yang dipilih dengan warna penanda
  btn.style.backgroundColor = "#f39c12";  // Warna oranye saat dipilih

  // Simpan jawaban user
  userAnswers[currentQuestion] = index;

  nextBtn.style.display = 'block';
}

// Fungsi Next Button
nextBtn.addEventListener('click', () => {
  showLoading();

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
      nextBtn.style.display = 'none';
    } else {
      // Setelah soal terakhir, tampilkan halaman review
      showReview();
    }
    hideLoading();
  }, 1000);
});

// Fungsi untuk loading
function showLoading() {
  loadingEl.classList.remove('hide');
}

function hideLoading() {
  loadingEl.classList.add('hide');
}

// Fungsi untuk menampilkan halaman Review
function showReview() {
  // Menyembunyikan quiz content dan menampilkan review content
  quizContent.classList.add('hide');
  reviewContent.classList.remove('hide');

  // Menampilkan total score
  score = userAnswers.filter((answer, i) => answer === questions[i].correct).length;
  scoreEl.textContent = `Your Total Score: ${score} / ${questions.length}`;

  // Menampilkan review jawaban
  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const correctAnswer = q.correct;
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    reviewItem.innerHTML = `
      <div><strong>Q${i + 1}:</strong> ${q.question}</div>
      <div>Your Answer: <span class="${userAnswer === correctAnswer ? 'correct' : 'wrong'}">${q.answers[userAnswer]}</span></div>
      <div>Correct Answer: <span class="correct">${q.answers[correctAnswer]}</span></div>
    `;
    reviewContainer.appendChild(reviewItem);
  });
}

// Fungsi untuk merestart quiz
function restartQuiz() {
  // Reset semua variabel
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  
  // Menyembunyikan halaman review dan menampilkan kembali quiz content
  quizContent.classList.remove('hide');
  reviewContent.classList.add('hide');
  
  // Tampilkan soal pertama
  showQuestion();
}

// Mulai quiz
showQuestion();
