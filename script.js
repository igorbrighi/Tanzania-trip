// Navegação entre "páginas"
function showPage(id) {
  document.querySelectorAll('.home, .page').forEach(el => el.style.display = 'none');
  const el = document.getElementById(id);
  if (el) el.style.display = (id === 'home') ? 'flex' : 'block';

  // atualizar active no bottom-nav
  document.querySelectorAll('.bottom-nav a').forEach(a => a.classList.remove('active'));
  const links = { home: 0, safari: 1, zanzibar: 2 };
  const nav = document.querySelectorAll('.bottom-nav a')[links[id] ?? 0];
  if (nav) nav.classList.add('active');
}

// Acordeão: toggle e fechar os outros
document.addEventListener('click', function (e) {
  if (e.target.closest('.day-header')) {
    const day = e.target.closest('.day');
    const isActive = day.classList.contains('active');
    document.querySelectorAll('.day.active').forEach(d => d !== day && d.classList.remove('active'));
    day.classList.toggle('active', !isActive);
  }
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
  img.alt = 'Foto';
  img.addEventListener('click', () => {
    modalImg.src = src;
    imgModal.style.display = 'flex';
  });

  const del = document.createElement('button');
  del.textContent = 'Excluir';
  del.style.cssText = 'margin-top:6px;padding:6px 8px;border-radius:6px;border:none;cursor:pointer;background:#A05A2C;color:white;font-size:12px;';
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
    this.value = ''; // reset
  });
}

// Modal close
if (modalClose) modalClose.addEventListener('click', () => imgModal.style.display = 'none');
if (imgModal) imgModal.addEventListener('click', (e) => { if (e.target === imgModal) imgModal.style.display = 'none'; });

// Inicializa view
showPage('home');
