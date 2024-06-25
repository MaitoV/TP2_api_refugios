document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token de sesión no disponible');
      return;
    }
    try {
      const response = await fetch('/api/animalitos/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener la lista de mascotas');
      }
      const mascotas = await response.json();
      generarTablaMascotas(mascotas);
    } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
    }
  });