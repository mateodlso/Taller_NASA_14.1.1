document.getElementById('btnBuscar').addEventListener('click', function () {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarImagenes(data.collection.items))
      .catch(error => console.error('Error:', error));
  });

function mostrarImagenes(items) {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';
  contenedor.className = 'row';
  items.forEach(item => {
    const data = item.data[0];
    const imageUrl = item.links ? item.links[0].href : 'placeholder.png';

    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${imageUrl}" class="card-img-top" alt="${data.title}">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.description ? data.description : 'Sin descripción disponible.'}</p>
          <p class="card-text"><small class="text-muted">Fecha: ${data.date_created}</small></p>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  });
}
