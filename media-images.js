<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<title>Gallery · Lady Tesla Diana</title>
<link href="../assets/media/4762afa1d3.png" rel="icon" type="image/png"/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&amp;family=Cinzel:wght@400;700;900&amp;family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap" rel="stylesheet"/>
<link href="../assets/css/style.css" rel="stylesheet"/>
</head>
<body>
<canvas id="petal-canvas"></canvas>
<button class="back-btn" id="backBtn" onclick="goBack()">back</button>
<button id="story-back-btn" onclick="showStoryList()">story list</button>
<div id="lightbox">
<button id="lightbox-close" onclick="closeLightbox()">close</button>
<img alt="" id="lightbox-img" src=""/>
</div>
<div id="menu">
<nav class="menu-links">
<a href="../music/index.html">Melodies</a>
<a href="#" onclick="showPage('gallery');return false;">Gallery</a>
<a href="../index.html#news">News</a>
<a href="../index.html#discourse">Decrees</a>
<a href="../index.html#lineage">Lineage</a>
<a href="../games/index.html">Revels</a>
<a href="../index.html#store">Store</a>
<a href="../index.html#story">Story</a>
</nav>
</div>
<!-- GALLERY -->
<div class="inner-page" id="gallery">
<h2 class="page-title">Gallery</h2>
<div class="gallery-grid">
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Toby" src="media/toby.jpg"/>
<div class="gallery-card-caption">Toby Mac</div>
<div class="gallery-card-sub">The enormous heart</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Berlioz and O'Malley" src="media/f055105edb.jpg"/>
<div class="gallery-card-caption">Berlioz &amp; O'Malley</div>
<div class="gallery-card-sub">Brothers in the sun</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Berlioz and O'Malley" src="media/75999b1f3e.jpg"/>
<div class="gallery-card-caption">Berlioz &amp; O'Malley</div>
<div class="gallery-card-sub">Two brothers, one nap, zero distance between them</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Tesla Diana" src="media/5c5e17a22e.jpg"/>
<div class="gallery-card-caption">Lady Tesla Diana</div>
<div class="gallery-card-sub">The Lady, at ease on her own terms</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Tesla Diana" src="media/9e00fd5608.jpg"/>
<div class="gallery-card-caption">Lady Tesla Diana</div>
<div class="gallery-card-sub">The Lady herself, at rest — surveying her domain</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Tesla Diana crowned" src="media/b2d7168a89.jpg"/>
<div class="gallery-card-caption">Tessie — Crowned</div>
<div class="gallery-card-sub">As she was always meant to be seen</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Tesla at the sink" src="media/c56551bdaf.jpg"/>
<div class="gallery-card-caption">The Lady &amp; Her Fountain</div>
<div class="gallery-card-sub">Tessie drinks from the faucet. She does not ask permission.</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Tesla lounging" src="media/8a1d0cde60.jpg"/>
<div class="gallery-card-caption">Kableton — The Lord</div>
<div class="gallery-card-sub">Intelligent, insufferable, and entirely too pleased with himself</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="O'Malley" src="media/741ef00b04.jpg"/>
<div class="gallery-card-caption">O'Malley — The Jester</div>
<div class="gallery-card-sub">The only one she allows near. The court's quiet soul.</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Berlioz lounging" src="media/41f671dfbe.jpg"/>
<div class="gallery-card-caption">Berlioz at Watch</div>
<div class="gallery-card-sub">The Knight surveys the realm from his perch</div>
</div>
<div class="gallery-card" onclick="openLightbox(this)">
<img alt="Berlioz and Kableton" src="media/1cf4a7446d.jpg"/>
<div class="gallery-card-caption">Kableton &amp; Berlioz</div>
<div class="gallery-card-sub">The Lord and the Knight — a rare moment of stillness</div>
</div>
</div>
</div>
<script src="../assets/js/main.js"></script>
<script>
// open this section directly (originally reached via the menu)
(function(){var p=document.getElementById('gallery');p.classList.add('visible');currentPage='gallery';document.getElementById('backBtn').classList.add('show');})();
// back from the menu returns to the home page hero
var _goBack=goBack;goBack=function(){if(currentPage)return _goBack();location.href='../index.html';};
</script>
</body>
</html>
