// ------------------------------
// Acessibilidade: acordeão com aria + teclado
// ------------------------------
document.querySelectorAll('.day-header').forEach((header, idx) => {
  header.setAttribute('tabindex', '0');
  header.setAttribute('role', 'button');
  // cria id para controle
  const content = header.nextElementSibling;
  if (content && content.classList.contains('day-content')) {
    const contentId = 'day-content-' + idx;
    content.id = contentId;
    header.setAttribute('aria-controls', contentId);
    header.setAttribute('aria-expanded', 'false');
  }

  header.addEventListener('click', () => toggleDay(header));
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDay(header);
    }
  });
});

function toggleDay(header) {
  const day = header.closest('.day');
  const section = header.closest('.trip-section');
  const content = header.nextElementSibling;
  const isActive = day.classList.contains('active');

  // fechar outros na mesma seção
  section.querySelectorAll('.day.active').forEach(d => {
    if (d !== day) {
      d.classList.remove('active');
      const h = d.querySelector('.day-header');
      if (h) h.setAttribute('aria-expanded', 'false');
    }
  });

  // toggle atual
  day.classList.toggle('active', !isActive);
  header.setAttribute('aria-expanded', String(!isActive));

  // ajustar smooth open (max-height já tratado pelo CSS)
  if (!isActive) {
    // scroll suave para o item aberto em telas pequenas
    if (window.innerWidth < 720) {
      setTimeout(() => day.scrollIntoView({behavior:'smooth', block:'center'}), 200);
    }
  }
}

// ------------------------------
// Galeria: preview, lazy loading, persistência (localStorage)
// ------------------------------
const upload = document.getElementById('photoUpload');
const gallery = document.getElementById('gallery');
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

function createGalleryItem(src, id) {
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-item';
  wrapper.dataset.id = id || Date.now().toString();

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Foto da viagem';
  img.loading = 'lazy';
  img.addEventListener('click', () => {
    modalImg.src = src;
    imgModal.style.display = 'flex';
    modalClose.focus();
  });

  const del = document.createElement('button');
  del.type = 'button';
  del.textContent = 'Excluir';
  del.style.cssText = 'padding:6px 8px;border-radius:8px;border:none;background:#A05A2C;color:#fff;cursor:pointer;font-size:12px';
  del.addEventListener('click', () => {
    wrapper.remove();
    saveGalleryToStorage();
  });

  wrapper.appendChild(img);
  wrapper.appendChild(del);
  return wrapper;
}

function loadGalleryFromStorage() {
  try {
    const raw = localStorage.getItem('tripGallery');
    if (!raw) return;
    const arr = JSON.parse(raw);
    arr.forEach(item => {
      const node = createGalleryItem(item.src, item.id);
      gallery.appendChild(node);
    });
  } catch (e) {
    console.warn('Erro ao carregar galeria:', e);
  }
}

function saveGalleryToStorage() {
  const arr = Array.from(gallery.children).map(node => {
    const img = node.querySelector('img');
    return { id: node.dataset.id, src: img ? img.src : '' };
  });
  localStorage.setItem('tripGallery', JSON.stringify(arr));
}

if (upload && gallery) {
  upload.addEventListener('change', function () {
    Array.from(this.files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const node = createGalleryItem(e.target.result);
        gallery.appendChild(node);
        saveGalleryToStorage();
      };
      reader.readAsDataURL(file);
    });
    this.value = '';
  });
}

// modal handlers
if (modalClose && imgModal) {
  modalClose.addEventListener('click', () => imgModal.style.display = 'none');
  imgModal.addEventListener('click', (e) => { if (e.target === imgModal) imgModal.style.display = 'none'; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') imgModal.style.display = 'none'; });
}

// initialize
loadGalleryFromStorage();
