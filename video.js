
document.addEventListener("DOMContentLoaded", function () {
  const wrap = document.createElement("div");
  wrap.id = "floating-video";
  wrap.className = "fv fixed bottom-4 right-4";
  wrap.innerHTML = `
    <video id="fv-video" autoplay muted loop playsinline width="200" height="112">
      <source src="video.mp4" type="video/mp4">
    </video>
    <button class="fv-btn fv-close">×</button>
    <button class="fv-btn fv-mute">🔊</button>
  `;
  document.body.appendChild(wrap);


});


(function(){
    const wrap = document.getElementById('floating-video');
    const vid  = document.getElementById('fv-video');
    const btnClose = wrap.querySelector('.fv-close');
    const btnMute  = wrap.querySelector('.fv-mute');

 
    const tryPlay = () => vid.play().catch(() => {/* ignore autoplay block */});
    document.addEventListener('DOMContentLoaded', tryPlay);
    window.addEventListener('load', tryPlay);

   
    const updateMuteIcon = () => btnMute.textContent = vid.muted ? '🔇' : '🔊';
    btnMute.addEventListener('click', () => { vid.muted = !vid.muted; updateMuteIcon(); tryPlay(); });
    updateMuteIcon();


    btnClose.addEventListener('click', () => wrap.remove());

    // ——— Drag to move 
    let dragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;

    const getRect = () => wrap.getBoundingClientRect();

    const onPointerDown = (e) => {
      // ignore clicks on buttons
      if (e.target.closest('.fv-btn')) return;
      dragging = true;
      wrap.classList.add('dragging');
      startX = e.clientX; startY = e.clientY;
      const rect = getRect();
      // translate fixed coords to left/top if using right/bottom
      const style = getComputedStyle(wrap);
      const left = style.left !== 'auto' ? parseFloat(style.left) : (window.innerWidth - rect.right);
      const top  = style.top !== 'auto' ? parseFloat(style.top) : (window.innerHeight - rect.bottom);
      startLeft = style.left !== 'auto' ? left : rect.left;
      startTop  = style.top  !== 'auto' ? top  : rect.top;
      // normalize to left/top for easier math
      wrap.style.left = rect.left + 'px';
      wrap.style.top  = rect.top  + 'px';
      wrap.style.right = 'auto';
      wrap.style.bottom = 'auto';
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let newLeft = startLeft + dx;
      let newTop  = startTop  + dy;
      // keep inside viewport
      const rect = getRect();
      const maxLeft = window.innerWidth - rect.width;
      const maxTop  = window.innerHeight - rect.height;
      newLeft = Math.max(0, Math.min(maxLeft, newLeft));
      newTop  = Math.max(0, Math.min(maxTop, newTop));
      wrap.style.left = newLeft + 'px';
      wrap.style.top  = newTop  + 'px';
    };

    const onPointerUp = () => { dragging = false; wrap.classList.remove('dragging'); };

    wrap.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch support
    wrap.addEventListener('touchstart', (e) => onPointerDown(e.touches[0]), {passive:false});
    window.addEventListener('touchmove',  (e) => { if (dragging) onPointerMove(e.touches[0]); }, {passive:false});
    window.addEventListener('touchend', onPointerUp);
  })();
