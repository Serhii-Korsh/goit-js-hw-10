import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

    const delay = Number(form.delay.value);

    const state = form.state.value;
    form.delay.value = '';

   const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        icon: '',
        close: false,
        position: "topRight"
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        icon: '',
        close: false,
        position: "topRight"
      });
    });
});







