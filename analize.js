const fileInput = document.getElementById('file-input');
const clasifyButton = document.getElementById('clasify-button');
const processButton = document.getElementById('process-button');
const title = document.getElementById('title');
const imagePreview = document.getElementById('image-preview');

// const backendUrl = 'http://localhost:3000'
const backendUrl = 'https://34.173.223.50:3000'

// Función para mostrar la vista previa de la imagen seleccionada
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // Cuando la imagen se haya leído correctamente, mostrarla en el contenedor
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // Mostrar la imagen
    };

    // Leer el archivo como una URL de datos (base64)
    reader.readAsDataURL(file);
  } else {
    // Si no hay archivo, ocultar la imagen
    imagePreview.style.display = 'none';
  }
});

// Función para enviar una petición de clasificación de imagen
clasifyButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Por favor, selecciona una imagen primero.');
    return;
  }

  // Crear un FormData para enviar el archivo
  const formData = new FormData();
  formData.append('image', file);

  title.textContent = 'Procesando...';

  try {
    // Enviar la imagen al servidor
    const response = await fetch(backendUrl + '/analyze-image', {
      method: 'POST',
      body: formData,
    });

    // Obtener el resultado del servidor
    const data = await response.json();
    title.textContent = data.message;
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    title.textContent = 'Error procesando la imagen.';
  }
});

// Función para enviar una imágen al proceso de clasificación automático de imágenes
processButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Por favor, selecciona una imagen primero.');
    return;
  }

  // Crear un FormData para enviar el archivo
  const formData = new FormData();
  formData.append('image', file);

  title.textContent = 'Subiendo...';

  try {
    // Enviar la imagen al servidor
    const response = await fetch(backendUrl + '/upload-image', {
      method: 'POST',
      body: formData,
    });

    // Obtener el resultado del servidor
    const data = await response.json();
    title.textContent = data.message;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    title.textContent = 'Error subiendo la imagen.';
  }
});
