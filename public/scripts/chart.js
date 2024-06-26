document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el token del sessionStorage
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      console.error('No token found, redirecting to login.');
      window.location.href = '/login';
      return;
    }
  
    // Función para obtener las mascotas desde el servidor
    async function fetchMascotas() {
      try {
        const response = await fetch('/api/animalitos/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Función para dibujar el gráfico
    async function drawChart() {
      const mascotas = await fetchMascotas();
      if (!mascotas) {
        return;
      }
  
      // Procesar los datos para Chart.js
      const clases = mascotas.reduce((acc, mascota) => {
        acc[mascota.clase] = (acc[mascota.clase] || 0) + 1;
        return acc;
      }, {});
  
      const labels = Object.keys(clases);
      const data = Object.values(clases);
  
      const ctx = document.getElementById('mascotasChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de Mascotas',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    // Llamar a la función para dibujar el gráfico
    drawChart();
  });