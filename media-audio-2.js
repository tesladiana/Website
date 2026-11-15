<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<title>Melodies · Lady Tesla Diana</title>
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
<a href="#" onclick="showPage('music');return false;">Melodies</a>
<a href="../photos/index.html">Gallery</a>
<a href="../index.html#news">News</a>
<a href="../index.html#discourse">Decrees</a>
<a href="../index.html#lineage">Lineage</a>
<a href="../games/index.html">Revels</a>
<a href="../index.html#store">Store</a>
<a href="../index.html#story">Story</a>
</nav>
</div>
<!-- MUSIC -->
<div class="inner-page" id="music">
<h2 class="page-title">Melodies</h2>
<p class="page-tagline">Melodies worthy of the Lady herself.</p>
<div style="display:flex;flex-direction:column;gap:2rem;width:100%;max-width:600px;padding:0 1rem;">
<!-- Baby Mine -->
    <div class="music-card">
      <div class="music-card-title">Baby Mine</div>
      <div class="music-card-sub">O'Malley's favorite song</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('baby')" id="btn-baby">
          <span id="icon-baby">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap">
          <div class="music-bar" id="bar-baby"></div>
        </div>
      </div>
    </div>

    <!-- Royal Music 1 — Bold -->
    <div class="music-card">
      <div class="music-card-title">Royal Proclamation</div>
      <div class="music-card-sub">Bold &mdash; A march fit for a sovereign</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal1')" id="btn-royal1">
          <span id="icon-royal1">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap">
          <div class="music-bar" id="bar-royal1"></div>
        </div>
      </div>
    </div>
    <div class="music-card">
      <div class="music-card-title">Royal Woodwinds</div>
      <div class="music-card-sub">Sixty seconds of regal woodwinds</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal2')" id="btn-royal2">
          <span id="icon-royal2">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap"><div class="music-bar" id="bar-royal2"></div></div>
      </div>
    </div>

    <div class="music-card">
      <div class="music-card-title">Dance of the Sugar Plum Fairy</div>
      <div class="music-card-sub">Electro &mdash; The Nutcracker, reimagined for the court</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal3')" id="btn-royal3">
          <span id="icon-royal3">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap"><div class="music-bar" id="bar-royal3"></div></div>
      </div>
    </div>

    <div class="music-card">
      <div class="music-card-title">Inspirational Symphony</div>
      <div class="music-card-sub">Soaring and royal, for the Lady's grandest moments</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal4')" id="btn-royal4">
          <span id="icon-royal4">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap"><div class="music-bar" id="bar-royal4"></div></div>
      </div>
    </div>
    <div class="music-card">
      <div class="music-card-title">Everybody Wants to Be a Cat</div>
      <div class="music-card-sub">Berlioz's favorite song</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal5')" id="btn-royal5">
          <span id="icon-royal5">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap"><div class="music-bar" id="bar-royal5"></div></div>
      </div>
    </div>
    <div class="music-card">
      <div class="music-card-title">I Can't Wait to Be King</div>
      <div class="music-card-sub">Kableton's favorite song</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal6')" id="btn-royal6">
          <span id="icon-royal6">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap"><div class="music-bar" id="bar-royal6"></div></div>
      </div>
    </div>
<div class="music-card">
      <div class="music-card-title">Friend Like Me</div>
      <div class="music-card-sub">A showman's promise</div>
      <div class="music-controls">
        <button class="music-btn" onclick="toggleTrack('royal7')" id="btn-royal7">
          <span id="icon-royal7">&#9654;</span> Play
        </button>
        <div class="music-progress-wrap"><div class="music-bar" id="bar-royal7"></div></div>
      </div>
    </div>
<!-- Royal Music 2 — Soft -->
</div>
</div>
<!-- AUDIO ELEMENTS -->
<audio id="audio-baby" loop="" preload="metadata"><source src="media/1648575552.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal1" loop="" preload="metadata"><source src="media/95fdc1e3fe.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal2" loop="" preload="metadata"><source src="media/99a99ef5a2.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal3" loop="" preload="metadata"><source src="media/574ee6f8c6.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal4" loop="" preload="metadata"><source src="media/aea0c982d2.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal5" loop="" preload="metadata"><source src="media/everybody-wants-to-be-a-cat.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal6" loop="" preload="metadata"><source src="media/cant-wait-king.mp3" type="audio/mpeg"/></audio>
<audio id="audio-royal7" loop="" preload="metadata"><source src="media/friend-like-me.mp3" type="audio/mpeg"/></audio>
<div id="now-playing" onclick="stopAll()" style="display:none;position:fixed;bottom:2rem;left:2rem;font-family:'Title Wave',serif;font-weight:700;font-size:0.75rem;color:#C9A84C;letter-spacing:0.15em;text-transform:uppercase;border:1px solid rgba(201,168,76,0.3);padding:0.4rem 0.8rem;background:#000;z-index:97;cursor:pointer;">
  ▶ <span id="now-playing-title"></span>   ▮▮
</div>
<script src="../assets/js/main.js"></script>
<script>
// open this section directly (originally reached via the menu)
(function(){var p=document.getElementById('music');p.classList.add('visible');currentPage='music';document.getElementById('backBtn').classList.add('show');})();
// back from the menu returns to the home page hero
var _goBack=goBack;goBack=function(){if(currentPage)return _goBack();location.href='../index.html';};
</script>
</body>
</html>
