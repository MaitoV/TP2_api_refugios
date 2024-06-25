document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.btn');
  
    // Verificar si existe un token en el sessionStorage
    const token = sessionStorage.getItem('token');
  
    if (token) {
      // Si hay un token, cambiar el texto del botón a "Dashboard"
      loginBtn.textContent = 'Dashboard';
      loginBtn.style.backgroundColor = 'black';

      // Redirigir al usuario al hacer clic en el botón
      loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/dashboard';
      });
    } else {
      // Si no hay un token, redirigir al usuario a la página de inicio de sesión
      loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/ingresar'; // Asegúrate de que esta ruta es la correcta para tu página de inicio de sesión
      });
    }
  });