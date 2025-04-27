// Daftar Soal
const questions = [
  {
    question: "1. Siapa penemu listrik?",
    answers: ["Thomas Edison", "Albert Einstein", "Karl Benz", "Benjamin Franklin"],
    correct: 3,
  },
  {
    question: "2. Apa unsur paling ringan di alam semesta?",
    answers: ["Helium", "Hidrogen", "Oksigen", "Karbon"],
    correct: 1,
  },
  {
    question: "3. Apa nama planet yang dikenal dengan 'Red Planet'?",
    answers: ["Mars", "Venus", "Jupiter", "Saturnus"],
    correct: 0,
  },
  {
    question: "4. Apa ibu kota Prancis?",
    answers: ["Berlin", "Madrid", "Paris", "Roma"],
    correct: 2,
  },
  {
    question: "5. Siapa penulis buku 'Harry Potter'?",
    answers: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Suzanne Collins"],
    correct: 1,
  },
  {
    question: "6. Satuan internasional untuk panjang adalah?",
    answers: ["Kilogram", "Liter", "Meter", "Watt"],
    correct: 2,
  },
  {
    question: "7. Benua mana yang memiliki jumlah negara terbanyak?",
    answers: ["Asia", "Afrika", "Eropa", "Amerika"],
    correct: 1,
  },
  {
    question: "8. Siapa yang pertama kali mengelilingi dunia?",
    answers: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "Marco Polo"],
    correct: 1,
  },
   {
    question: "9. Apa nama planet terbesar di tata surya kita?",
    answers: ["Mars", "Bumi", "Jupiter", "Uranus"],
    correct: 2,
  },
  {
    question: "10. Di negara mana Taj Mahal berada?",
    answers: ["Pakistan", "Bangladesh", "India", "Nepal"],
    correct: 2,
  },
  {
    question: "11. Siapa yang menemukan teori relativitas?",
    answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
    correct: 1,
  },
  {
    question: "12. Apa nama laut terbesar di dunia?",
    answers: ["Laut Kaspia", "Laut Mediterania", "Laut Karibia", "Laut Selatan"],
    correct: 0,
  },
  {
    question: "13. Mata uang yang digunakan di Jepang adalah?",
    answers: ["Dollar", "Won", "Yen", "Peso"],
    correct: 2,
  },
  {
    question: "14. Siapa yang pertama kali menciptakan mesin uap?",
    answers: ["Thomas Edison", "James Watt", "Nikola Tesla", "Henry Ford"],
    correct: 1,
  },
  {
    question: "15. Di bawah ini, yang mana yang merupakan gas yang paling banyak di atmosfer Bumi?",
    answers: ["Oksigen", "Karbon dioksida", "Nitrogen", "Hidrogen"],
    correct: 2,
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
