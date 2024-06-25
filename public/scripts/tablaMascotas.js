function generarTablaMascotas(mascotas) {
    const container = document.getElementById('tablaMascotasContainer');
    container.innerHTML = ''; // Limpiar cualquier contenido previo
    if (mascotas.length === 0) {
      container.innerHTML = '<p>No hay mascotas disponibles.</p>';
      return;
    }
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    // Crear encabezado de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Nombre', 'Clase', 'Edad', 'Raza', 'Estado', 'Acción'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');
    mascotas.forEach(mascota => {
      const row = document.createElement('tr');
      row.dataset.id = mascota._id; // Guardar el ID en un atributo data
      const keys = ['nombre', 'clase', 'edad', 'raza', 'estado'];
      keys.forEach(key => {
        const cell = document.createElement('td');
        cell.appendChild(document.createTextNode(mascota[key] || ''));
        row.appendChild(cell);
      });
      // Crear celda de acción con botón de actualizar datos
      const actionCell = document.createElement('td');
      const actualizarDatosButton = document.createElement('button');
      actualizarDatosButton.textContent = 'Actualizar datos';
      actualizarDatosButton.addEventListener('click', () => {
        actualizarDatos(row);
      });
      actionCell.appendChild(actualizarDatosButton);
      row.appendChild(actionCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
  }
  
  function actualizarDatos(row) {
    const keys = ['nombre', 'clase', 'edad', 'raza'];
    keys.forEach((key, index) => {
      const cell = row.cells[index];
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cell.textContent;
      cell.innerHTML = '';
      cell.appendChild(input);
    });
    // Convertir la celda de estado en un select
    const estadoCell = row.cells[4];
    const currentState = estadoCell.textContent;
    const select = document.createElement('select');
    ['en_adopcion', 'adoptado', 'en_transito'].forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      if (state === currentState) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    estadoCell.innerHTML = '';
    estadoCell.appendChild(select);
    // Cambiar el botón a "Confirmar nuevos datos"
    const actionCell = row.cells[5]; // Columna de acción
    actionCell.innerHTML = '';
    const confirmarDatosButton = document.createElement('button');
    confirmarDatosButton.textContent = 'Confirmar nuevos datos';
    confirmarDatosButton.addEventListener('click', () => {
      confirmarNuevosDatos(row);
    });
    actionCell.appendChild(confirmarDatosButton);
  }
  
  async function confirmarNuevosDatos(row) {
    const id = row.dataset.id; // Obtener el ID del atributo data
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('Token de sesión no disponible');
    }
    const keys = ['nombre', 'clase', 'edad', 'raza'];
    const formData = {};
    keys.forEach((key, index) => {
      formData[key] = row.cells[index].querySelector('input').value;
    });
    formData.estado = row.cells[4].querySelector('select').value;
    try {
      const response = await fetch(`/api/animalitos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar los datos del animal');
      }
      const mascotaActualizada = await response.json();
      console.log('Datos del animal actualizados:', mascotaActualizada);
      alert('Datos del animal actualizados correctamente');
      // Actualizar la fila con los nuevos datos
      keys.forEach((key, index) => {
        row.cells[index].innerHTML = formData[key];
      });
      row.cells[4].innerHTML = formData.estado;
      // Cambiar el botón de vuelta a "Actualizar datos"
      const actionCell = row.cells[5]; // Columna de acción
      actionCell.innerHTML = '';
      const actualizarDatosButton = document.createElement('button');
      actualizarDatosButton.textContent = 'Actualizar datos';
      actualizarDatosButton.addEventListener('click', () => {
        actualizarDatos(row);
      });
      actionCell.appendChild(actualizarDatosButton);
    } catch (error) {
      console.error('Error al actualizar los datos del animal:', error);
      alert('Hubo un problema al actualizar los datos del animal');
    }
  }