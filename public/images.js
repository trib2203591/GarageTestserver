async function loadImages() {
    const container = document.getElementById('images');
    const res = await fetch('/list-images');
    const data = await res.json();
  
    container.innerHTML = ''; // Clear old content
  
    if (!data || !data.images || data.images.length === 0) {
      container.innerText = 'No images found';
      return;
    }
  
    data.images.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.style.maxWidth = '200px';
      img.style.margin = '10px';
      container.appendChild(img);
    });
  }
  
  loadImages();