/**
 * main.js - Core Portfolio Functionality
 * Randi Arrasyid - Dark Sky Blue Cyber Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbar();
  initScrollSpy();
  initStatCounters();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCustomCursor();
  initScrollReveal();
  initBackToTop();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const words = [
    'Junior Web Developer',
    'IT Support Specialist',
    'Data Administrator',
    'Full Stack Developer (PHP & MySQL)',
    'Flutter App Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 105;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. FLOATING NAVBAR & MOBILE TOGGLE
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.floating-navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Add shadow styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. SCROLL SPY (HIGHLIGHT ACTIVE NAV LINK)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* ==========================================================================
   4. STAT COUNTERS ANIMATION
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          const duration = 2000; // ms
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeProgress);

            stat.textContent = current + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              stat.textContent = target + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-container');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   5. PROJECT FILTER SYSTEM
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT DETAIL MODAL WITH REAL DATA RANDI ARRASYID
   ========================================================================== */
const projectData = {
  1: {
    title: 'E-Library — Sistem Informasi Perpustakaan Berbasis Web V 1.0',
    category: 'Academic Project - Web Development',
    tag: 'Academic Project',
    image: 'assets/projects/library/library-dashboard.png',
    description: 'Sistem Informasi Perpustakaan Berbasis Web V 1.0 (E-Library) yang dirancang untuk mengotomatisasi seluruh alur operasional perpustakaan secara modern dan terstruktur. Mengintegrasikan dashboard metrik inventaris, katalogisasi buku, transaksi sirkulasi peminjaman dengan perhitungan denda otomatis Rp 1.000/hari jika melewati masa pinjam 7 hari, serta rekapitulasi data anggota.',
    features: [
      'Dashboard Administrator: Kartu ringkasan metrik real-time untuk total buku, jumlah anggota terdaftar, transaksi sirkulasi aktif, dan laporan sirkulasi',
      'Katalog & Kelola Data Buku: Tabel interaktif DataTables dilengkapi ID Buku, Judul, Pengarang, Penerbit, Tahun terbit, serta aksi cepat Edit dan Hapus',
      'Master Data Anggota: Formulir terstruktur penambahan anggota baru dengan ID Anggota otomatis, Nama, Jenis Kelamin, Kelas, dan Nomor Telepon/HP',
      'Sirkulasi & Denda Otomatis: Pencatatan peminjaman dengan masa pinjam 7 hari dan kalkulasi denda keterlambatan Rp 1.000/hari secara otomatis',
      'Log Riwayat Peminjaman Buku: Rekam jejak seluruh riwayat transaksi peminjaman buku beserta tanggal peminjaman dan tanggal buku dikembalikan',
      'Manajemen Pengguna & Autentikasi: Hak akses multi-level administrator sistem dan logout aman'
    ],
    tech: ['PHP', 'MySQL', 'HTML5', 'CSS3 / Bootstrap', 'JavaScript', 'DataTables'],
    gallery: [
      { src: 'assets/projects/library/library-dashboard.png', label: 'Dashboard' },
      { src: 'assets/projects/library/library-data-buku.png', label: 'Data Buku' },
      { src: 'assets/projects/library/library-sirkulasi.png', label: 'Sirkulasi & Denda' },
      { src: 'assets/projects/library/library-riwayat.png', label: 'Riwayat Pinjam' },
      { src: 'assets/projects/library/library-tambah-anggota.png', label: 'Tambah Anggota' }
    ],
    demo: '#',
    code: '#'
  },
  2: {
    title: 'Cermin Kopi — Cafe & Eatery POS & Management System',
    category: 'Client Project • Full Stack Web & POS System',
    tag: 'Client Project',
    image: 'assets/projects/cermin-kopi-dashboard.jpg',
    description: 'Sistem manajemen kafe dan kasir (POS) berbasis web untuk "Cermin Kopi Cafe & Eatery" (powered by RanIQ.DEV / expertlyassistant). Mengintegrasikan dashboard pemantauan omset real-time, manajemen kapasitas 50 meja, reservasi, katalog 123 menu aktif dengan kode QR, kontrol akun kasir, rekapitulasi laporan transaksi harian/bulanan, serta integrasi penerimaan pembayaran instan via QRIS.',
    features: [
      'Dashboard Eksekutif Administrator: Pemantauan KPI Omset Hari Ini, Omset Bulanan (Rp 212.000 / 11 Transaksi), Kapasitas 50 Meja, dan 123 Menu Aktif',
      'Tabel Transaksi QRIS Otomatis: Pencatatan invoice transaksi penjualan terakhir (TRX) dengan status sukses real-time',
      'Top 5 Menu Terlaris: Widget analitik otomatis yang menampilkan menu paling diminati (Air Mineral, Buah Lechi, French Fries) untuk optimalisasi stok',
      'Katalog Menu & QR Ordering: Pengelolaan menu digital interaktif yang siap diakses pelanggan melalui scan barcode meja QR',
      'Multi-User & Kasir Management: Manajemen akun kasir, pengaturan operasional kafe, dan fitur pembersihan cache sistem sekali klik',
      'Modul Manajemen Lengkap: Menu terstruktur mencakup Daftar Meja, Reservasi, Inventory Bahan, Laporan Penjualan, Promo & Voucher, dan Keuangan'
    ],
    tech: ['PHP', 'MySQL', 'QRIS Payment Gateway', 'HTML5 / CSS3', 'JavaScript', 'RanIQ.DEV', 'POS Architecture'],
    gallery: [
      { src: 'assets/projects/cermin-kopi-dashboard.jpg', label: 'Dashboard POS' },
      { src: 'assets/projects/cermin-kopi-kpi.jpg', label: 'Metrik KPI' },
      { src: 'assets/projects/cermin-kopi-transaksi.jpg', label: 'Transaksi QRIS' },
      { src: 'assets/projects/cermin-kopi-mobile.png', label: 'Mobile Client' }
    ],
    demo: 'https://kopikita.expertlyassistant.com',
    code: 'https://wa.me/6282289209579?text=Halo%20Randi,%20saya%20tertarik%20dengan%20Sistem%20POS%20Cermin%20Kopi'
  },
  3: {
    title: 'Cermin Kopi Mobile App — Flutter Ordering Client',
    category: 'Mobile Application Development • Android & iOS',
    tag: 'Mobile App',
    image: 'assets/projects/cermin-kopi-mobile.png',
    description: 'Aplikasi mobile pemesanan Cermin Kopi berbasis framework Flutter & Dart yang terhubung langsung secara real-time ke sistem POS server kopikita.expertlyassistant.com. Memungkinkan pelanggan memesan aneka minuman dan makanan favorit (French Fries, Buah Lechi, Cermin Signature Coffee) langsung dari meja kafe melalui kode QR tanpa perlu mengantre di kasir.',
    features: [
      'Pemesanan Berbasis Meja QR: Pelanggan memindai QR code di meja (kapasitas hingga 50 meja) untuk memulai sesi pemesanan mandiri',
      'Katalog 123 Menu Interaktif: Navigasi kategori dinamis (Coffee, Non-Coffee, Snack, Beverage) dengan animasi transisi Flutter yang halus',
      'Kustomisasi Varian Pesanan: Pemilihan ukuran cup, level gula, catatan tambahan, dan kuantitas per item',
      'Checkout QRIS Terintegrasi: Pembuatan transaksi QRIS otomatis yang langsung diverifikasi dan terkirim ke antrean kasir & dapur',
      'Sinkronisasi Real-Time REST API: Pesanan langsung terhubung ke database backend POS dan tercatat di dashboard administrator',
      'Performa Tinggi Cross-Platform: Dibangun dengan Flutter 3.x untuk pengalaman pengguna 60 FPS mulus di Android & iOS'
    ],
    tech: ['Flutter', 'Dart', 'REST API', 'QRIS Gateway', 'State Management', 'Mobile UI/UX', 'MySQL'],
    gallery: [
      { src: 'assets/projects/cermin-kopi-mobile.png', label: 'Mobile UI' },
      { src: 'assets/projects/cermin-kopi-dashboard.jpg', label: 'POS Server' },
      { src: 'assets/projects/cermin-kopi-transaksi.jpg', label: 'Alur QRIS' }
    ],
    demo: 'https://kopikita.expertlyassistant.com',
    code: 'https://wa.me/6282289209579?text=Halo%20Randi,%20saya%20tertarik%20dengan%20Aplikasi%20Mobile%20Cermin%20Kopi'
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-img');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalDemo = document.getElementById('modal-demo');
  const modalCode = document.getElementById('modal-code');
  const galleryContainer = document.getElementById('modal-gallery-container');
  const galleryGrid = document.getElementById('modal-gallery');

  const detailButtons = document.querySelectorAll('.open-modal-btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (!data) return;

      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDescription.textContent = data.description;

      // Populate gallery thumbnails if available
      if (galleryContainer && galleryGrid) {
        galleryGrid.innerHTML = '';
        if (data.gallery && data.gallery.length > 0) {
          galleryContainer.classList.remove('hidden');
          data.gallery.forEach((item, idx) => {
            const thumbBtn = document.createElement('button');
            thumbBtn.type = 'button';
            thumbBtn.className = `relative rounded-lg overflow-hidden border-2 transition-all aspect-[16/10] group focus:outline-none ${idx === 0 ? 'border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]' : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-sky-500/50'}`;
            thumbBtn.innerHTML = `
              <img src="${item.src}" alt="${item.label}" class="w-full h-full object-cover">
              <span class="absolute inset-x-0 bottom-0 bg-slate-950/85 text-[9px] font-mono text-center py-0.5 text-slate-200 truncate">${item.label}</span>
            `;
            thumbBtn.addEventListener('click', () => {
              modalImage.src = item.src;
              modalImage.alt = item.label;
              galleryGrid.querySelectorAll('button').forEach(b => {
                b.classList.remove('border-sky-400', 'shadow-[0_0_12px_rgba(56,189,248,0.6)]');
                b.classList.add('border-slate-700', 'opacity-60');
              });
              thumbBtn.classList.remove('border-slate-700', 'opacity-60');
              thumbBtn.classList.add('border-sky-400', 'shadow-[0_0_12px_rgba(56,189,248,0.6)]');
            });
            galleryGrid.appendChild(thumbBtn);
          });
        } else {
          galleryContainer.classList.add('hidden');
        }
      }

      // Populate features
      modalFeatures.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-slate-300 text-xs sm:text-sm';
        li.innerHTML = `<span class="text-sky-400 font-bold">✓</span> <span>${feat}</span>`;
        modalFeatures.appendChild(li);
      });

      // Populate tech badges
      modalTech.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'px-2.5 py-1 text-xs rounded-full bg-sky-950/70 border border-sky-500/40 text-sky-300 font-medium';
        span.textContent = t;
        modalTech.appendChild(span);
      });

      if (data.demo && data.demo !== '#') {
        modalDemo.href = data.demo;
        modalDemo.target = '_blank';
        modalDemo.rel = 'noopener noreferrer';
        modalDemo.removeAttribute('download');
        modalDemo.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square text-xs"></i> <span>Kunjungi Sistem Live</span>`;
      } else {
        modalDemo.href = 'assets/cv-randi-arrasyid.pdf';
        modalDemo.setAttribute('download', 'CV_Randi_Arrasyid.pdf');
        modalDemo.target = '_self';
        modalDemo.removeAttribute('rel');
        modalDemo.innerHTML = `<i class="fa-solid fa-file-pdf"></i> <span>Lihat CV Lengkap</span>`;
      }

      if (data.code && data.code.startsWith('https://wa.me')) {
        modalCode.href = data.code;
        modalCode.innerHTML = `<i class="fa-brands fa-whatsapp text-emerald-400 text-sm"></i> <span>Tanya Proyek via WA</span>`;
      } else {
        modalCode.href = data.code || '#';
      }

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM & INTERACTIVE TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Harap isi semua kolom formulir yang diperlukan.', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Mengirim Pesan...
    `;
    submitBtn.disabled = true;

    // Simulate sending latency
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast('🚀 Pesan berhasil terkirim! Terima kasih telah menghubungi Randi Arrasyid.', 'success');
    }, 1200);
  });

  function showToast(msg, type = 'success') {
    if (!toast) return;

    if (toastMessage) toastMessage.textContent = msg;

    if (type === 'error') {
      toast.classList.remove('border-sky-500/50');
      toast.classList.add('border-rose-500/70');
    } else {
      toast.classList.remove('border-rose-500/70');
      toast.classList.add('border-sky-500/50');
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/* ==========================================================================
   8. CUSTOM CURSOR FOLLOWER (DESKTOP)
   ========================================================================== */
function initCustomCursor() {
  const follower = document.querySelector('.cursor-follower');
  const dot = document.querySelector('.cursor-dot');

  if (!follower || !dot) return;

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    follower.style.display = 'none';
    dot.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function loop() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(loop);
  }
  loop();

  const interactables = document.querySelectorAll('a, button, input, textarea, .glass-card, .filter-btn');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   9. SCROLL REVEAL ANIMATION
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
