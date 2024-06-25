document.addEventListener('DOMContentLoaded', async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token de sesión no disponible');
      }
      // Obtener los datos del refugio desde el servidor
      const response = await fetch('/api/refugios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include' // Para enviar las cookies de sesión si es necesario
      });
      if (!response.ok) {
        throw new Error('No se pudieron obtener los datos del refugio');
      }
      const refugio = await response.json();
      // Llenar los campos del formulario con los datos del refugio si existen
      document.getElementById('nombre').value = refugio.nombre || '';
      document.getElementById('direccion').value = refugio.direccion || '';
      document.getElementById('provincia').value = refugio.provincia || '';
      document.getElementById('localidad').value = refugio.localidad || '';
      document.getElementById('codigoPostal').value = refugio.codigoPostal || '';
      document.getElementById('telefono').value = refugio.telefono || '';
      // Manejar el envío del formulario para actualizar los datos del refugio
      const refugioForm = document.getElementById('refugioForm');
      refugioForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = {
          nombre: document.getElementById('nombre').value,
          direccion: document.getElementById('direccion').value,
          provincia: document.getElementById('provincia').value,
          localidad: document.getElementById('localidad').value,
          codigoPostal: document.getElementById('codigoPostal').value,
          telefono: document.getElementById('telefono').value
        };
        const updateResponse = await fetch(`/api/refugios/${refugio._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        if (!updateResponse.ok) {
          throw new Error('Error al actualizar los datos del refugio');
        }
        const refugioActualizado = await updateResponse.json();
        console.log('Refugio actualizado:', refugioActualizado);
        alert('Datos del refugio actualizados correctamente');
      });
    } catch (error) {
      console.error('Error al cargar o actualizar los datos del refugio:', error);
      // Manejar errores según sea necesario
    }
  });