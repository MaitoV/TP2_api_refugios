document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
  
    uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token de sesión no disponible');
      }
  
      const formData = new FormData();
      const fileInput = document.getElementById('archivoExcel');
      const file = fileInput.files[0];
      formData.append('archivoExcel', file);
  
      try {
        const response = await fetch('/api/animalitos/carga/archivo', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Error al cargar el archivo Excel');
        }
  
        const resultado = await response.json();
        console.log('Archivo cargado exitosamente:', resultado);
        alert('Archivo cargado exitosamente');
      } catch (error) {
        console.error('Error al cargar el archivo Excel:', error);
        alert('Hubo un problema al cargar el archivo Excel');
      }
    });
  });