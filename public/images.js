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
    console.log(url.replace("http://aws-s3-bucket.103.221.220.183.nip.io:3902/", ""));
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.margin = '10px';
    wrapper.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '200px';
    img.style.display = 'block';
    img.style.marginBottom = '5px';

    const btn = document.createElement('button');
    btn.innerText = 'Delete';
    btn.style.display = 'block';
    btn.onclick = async () => {
      const confirmDelete = confirm('Are you sure you want to delete this image?');
      if (confirmDelete) {
        try {
          const res = await fetch('/delete-image', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: url.replace("http://aws-s3-bucket.103.221.220.183.nip.io:3902/", "")}) 
          
          });

          const result = await res.json();
          if (res.ok) {
            alert('Image deleted');
            loadImages(); // reload the images
          } else {
            alert(`Delete failed: ${result.message || 'Unknown error'}`);
          }
        } catch (err) {
          alert('An error occurred while deleting the image');
          console.error(err);
        }
      }
    };

    wrapper.appendChild(img);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
  });
}

loadImages();
