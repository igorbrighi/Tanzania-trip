
document.querySelectorAll('.day').forEach(day=>{
  const header = day.querySelector('.day-header');

  if(header){
    header.addEventListener('click',()=>{
      day.classList.toggle('active');
    });
  }
});

const upload = document.getElementById('photoUpload');
const gallery = document.getElementById('gallery');

if(upload && gallery){
  upload.addEventListener('change', function(){
    Array.from(this.files).forEach(file=>{
      const reader = new FileReader();

      reader.onload = function(e){
        const img = document.createElement('img');
        img.src = e.target.result;
        gallery.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });
}
