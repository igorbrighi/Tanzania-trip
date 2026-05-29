// ACORDEÃO: abre/fecha dias, fechando os outros dentro da mesma seção
document.addEventListener('click', function (e) {
  const header = e.target.closest('.day-header');
  if (!header) return;

  const day = header.closest('.day');
  const section = header.closest('.trip-section');
  const isActive = day.classList.contains('active');

  // fecha todos os dias da mesma seção
  section.querySelectorAll('.day.active').forEach(d => {
    if (d !== day) d.classList.remove('active');
  });

  // toggle do clicado
  day.classList.toggle('active', !isActive);
});

// Upload e galeria com preview, remoção e modal fullscreen
const upload = document.getElementById('photoUpload');
const gallery = document.getElementById('gallery');
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

function createGalleryItem(src) {
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-item';

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Foto da viagem';
  img.addEventListener('click', () => {
    modalImg.src = src;
    imgModal.style.display = 'flex';
  });

  const del = document.createElement('button');
  del.textContent = 'Excluir';
  del.style.cssText = 'margin-top:2px;padding:4px 6px;border-radius:6px;border:none;cursor:pointer;background:#444;color:white;font-size:11px;';
  del.addEventListener('click', () => wrapper.remove());

  wrapper.appendChild(img);
  wrapper.appendChild(del);
  return wrapper;
}

if (upload && gallery) {
  upload.addEventListener('change', function () {
    Array.from(this.files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const item = createGalleryItem(e.target.result);
        gallery.appendChild(item);
      };
      reader.readAsDataURL(file);
    });
    this.value = '';
  });
}

if (modalClose) modalClose.addEventListener('click', () => imgModal.style.display = 'none');
if (imgModal) imgModal.addEventListener('click', (e) => {
  if (e.target === imgModal) imgModal.style.display = 'none';
});
