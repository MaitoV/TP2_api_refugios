document.addEventListener('DOMContentLoaded', () => {
    const botonGuardarAnimal = document.getElementById('guardarNuevoAnimal');
    botonGuardarAnimal.addEventListener('click', async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token de sesión no disponible');
        }
        const mascotaData = {
          nombre: document.getElementById('nombreMascota').value,
          clase: document.getElementById('clase').value,
          edad: document.getElementById('edad').value,
          raza: document.getElementById('raza').value,
          estado: document.getElementById('estado').value
        };
        const response = await fetch('/api/animalitos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(mascotaData)
        });
        if (!response.ok) {
          throw new Error('Error al guardar la nueva mascota');
        }
        const nuevaMascota = await response.json();
        console.log('Nueva mascota guardada:', nuevaMascota);
        alert('Nueva mascota guardada correctamente');
        document.getElementById('mascotaForm').reset();
      } catch (error) {
        console.error('Error al guardar la nueva mascota:', error);
        alert('Hubo un problema al guardar la nueva mascota');
      }
    });
  });