window.onload = async () => {
  const catImagesList = document.getElementById('cat-images-list');
  const dogImagesList = document.getElementById('dog-images-list');

  // const backendUrl = 'http://localhost:3000'
  const backendUrl = 'https://34.173.223.50:3000'
  const imagesUrl = 'https://miwcloudcomputing.blob.core.windows.net'

  try {
    // Obtener las imágenes desde el servidor
    const response = await fetch(backendUrl + '/images');
    const data = await response.json();
    console.log(data)
    console.log(data.catImages)

    // Mostrar las imágenes de "cat"
    if (data.catImages.length === 0) {
      catImagesList.textContent = 'Todavía no se han clasificado imágenes de gatos. Prueba a subir una foto o espera un rato.';
    } else {
      data.catImages.forEach(image => {
        const imgElement = document.createElement('img');
        // imgElement.src = `https://<your-storage-account-name>.blob.core.windows.net/cat/${image}`;
        imgElement.src = imagesUrl + `/cats/${image}`
        imgElement.alt = image;
        catImagesList.appendChild(imgElement);
      });
    }

    // Mostrar las imágenes de "dog"
    if (data.dogImages.length === 0) {
      dogImagesList.textContent = 'Todavía no se han clasificado imágenes de perros. Prueba a subir una foto o espera un rato.';
    } else {
      data.dogImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = imagesUrl + `/dogs/${image}`
        imgElement.alt = image;
        dogImagesList.appendChild(imgElement);
      });
    }

  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
    catImagesList.textContent = 'No se pudieron cargar las imágenes de gatos.';
    dogImagesList.textContent = 'No se pudieron cargar las imágenes de perros.';
  }
};
