
const days = document.querySelectorAll('.day');

days.forEach(day => {
  const header = day.querySelector('.day-header');

  if(header){
    header.addEventListener('click', () => {
      day.classList.toggle('active');
    });
  }
});

const countdown = document.getElementById('countdown');

if(countdown){
  const target = new Date('2026-06-03T18:35:00');

  function updateCountdown(){
    const now = new Date();
    const diff = target - now;

    if(diff <= 0){
      countdown.innerHTML = '🌍 A viagem começou!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    countdown.innerHTML = `${days} dias e ${hours} horas para a viagem`;
  }

  updateCountdown();
  setInterval(updateCountdown,1000);
}
