const faqQuestions = document.querySelectorAll('.faq-question');
    
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isActive = question.classList.contains('active');
    
   
    faqQuestions.forEach(q => {
      q.classList.remove('active');
      q.nextElementSibling.classList.remove('active');
    });
    
    
    if (!isActive) {
      question.classList.add('active');
      answer.classList.add('active');
    }
  });
});