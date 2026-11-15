<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport"/>
<title>Revels · Lady Tesla Diana</title>
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
<a href="../photos/index.html">Gallery</a>
<a href="../index.html#news">News</a>
<a href="../index.html#discourse">Decrees</a>
<a href="../index.html#lineage">Lineage</a>
<a href="#" onclick="showPage('games');return false;">Revels</a>
<a href="../index.html#store">Store</a>
<a href="../index.html#story">Story</a>
</nav>
</div>
<!-- GAMES -->
<div class="inner-page" id="games">
<h2 class="page-title">Revels</h2>
<p class="page-tagline">Games worthy of the royal court.</p>
<div class="revels-host" id="rv-host"></div>
<template id="rv-tpl">
<div class="games" id="menu">
<div class="gcard" onclick="showTrivia()">
<div class="gcard-title">Trivia</div>
<div class="gcard-sub">How well do you know the court?</div>
<button class="btn" onclick="event.stopPropagation();showTrivia()">▶ Play</button>
</div>
<div class="gcard" onclick="showJumpy()">
<div class="gcard-title">Jumpy Kitty</div>
<div class="gcard-sub">Flap between the palace columns</div>
<button class="btn" onclick="event.stopPropagation();showJumpy()">▶ Play</button>
</div>
<div class="gcard" onclick="showCrossy()">
<div class="gcard-title">Crossy Cat</div>
<div class="gcard-sub">Race the royal cats to the water</div>
<button class="btn" onclick="event.stopPropagation();showCrossy()">▶ Play</button>
</div>
</div>
<!-- TRIVIA LEVELS -->
<div class="hidden" id="trivia-levels">
<p class="sub">Choose your examination</p>
<div class="menu">
<button class="btn" onclick="startLevel('first')">First Grade · 10 Questions</button>
<button class="btn" onclick="startLevel('fourth')">Fourth Grade · 10 Questions</button>
<button class="btn" onclick="startLevel('eighth')">Eighth Grade · 5 Seconds Each</button>
<button class="btn" onclick="startLevel('tenth')">The Sovereign's Trial · 4 Seconds Each</button>
</div>
<button class="btn ghost" onclick="backToMenu()">All Games</button>
</div>
<!-- TRIVIA QUIZ -->
<div class="card hidden" id="trivia-card">
<div class="qnum" id="hud-trivia"></div>
<div class="timerbar hidden" id="timer-wrap"><div id="timer-fill"></div></div>
<div class="question" id="question"></div>
<div class="answers" id="answers"></div>
<div id="feedback"></div>
<div class="row"><button class="btn hidden" id="next" onclick="nextQuestion()">Next</button>
<button class="btn ghost" onclick="showTrivia()">Quit Quiz</button></div>
</div>
<!-- TRIVIA RESULT -->
<div class="card hidden" id="trivia-result">
<div id="result-title"></div>
<p class="sub" id="result-text"></p>
<button class="btn" onclick="startLevel(currentLevel)">Take It Again</button>
<button class="btn ghost" onclick="showTrivia()">Choose Another Level</button>
<button class="btn ghost" onclick="backToMenu()">All Games</button>
</div>
<!-- JUMPY CAT -->
<div class="hidden" id="jumpy-view">
<div id="j-select">
<p class="sub">Choose your cat for Jumpy Kitty</p>
<div class="cats" id="j-cats"></div>
<button class="btn" onclick="jumpyStart()">Start</button>
<button class="btn ghost" onclick="backToMenu()">All Games</button>
</div>
<div class="hidden play" id="j-play">
<div class="gbar"><span>Hearts <b id="j-lives"></b></span><span>Score <b id="j-score">0</b></span><span>Best <b id="j-best">0</b></span></div>
<canvas class="board" height="640" id="j-canvas" width="480"></canvas>
<div id="jmsg"></div>
<div class="row">
<button class="btn" id="j-flap">Flap</button>
<button class="btn power" id="j-pass" onclick="usePass()" style="display:none;">Passage (10)</button>
<button class="btn ghost" onclick="jumpyEnd()">End Game</button>
</div>
</div>
<div class="card hidden" id="j-end">
<div class="endtitle" id="j-result"></div>
<p class="sub" id="j-summary"></p>
<button class="btn" onclick="jumpyStart()">Play Again</button>
<button class="btn ghost" onclick="showJumpySelect()">Choose Another Cat</button>
<button class="btn ghost" onclick="backToMenu()">All Games</button>
</div>
</div>
<div class="hidden" id="crossy-view">
<div id="c-select">
<p class="sub">Choose your cat for Crossy Cat</p>
<div class="cats" id="c-cats"></div>
<button class="btn" onclick="crossyStart()">Start the Crossing</button>
<button class="btn ghost" onclick="backToMenu()">All Games</button>
</div>
<div class="hidden play" id="c-play">
<div class="gbar"><span>Jumps <b id="c-jumps">0</b> / 1000</span><span id="c-msg">Watch for carriages!</span></div>
<canvas class="board" height="640" id="c-canvas" width="480"></canvas>
<div class="row">
<button class="btn" onclick="crossyMove(-1)">Left</button>
<button class="btn" onclick="crossyMove(0)">Jump</button>
<button class="btn" onclick="crossyMove(1)">Right</button>
</div>
<div class="row">
<button class="btn power" id="c-power" onclick="crossyPower()">Power</button>
<button class="btn ghost" onclick="crossyQuit()">End Game</button>
</div>
</div>
<div class="card hidden" id="c-end">
<div class="endtitle" id="c-result"></div>
<p class="sub" id="c-summary"></p>
<button class="btn" onclick="crossyStart()">Play Again</button>
<button class="btn ghost" onclick="showCrossy()">Choose Another Cat</button>
<button class="btn ghost" onclick="backToMenu()">All Games</button>
</div>
</div>
</template>
</div>
<!-- FLOATING MUSIC INDICATOR -->
<script src="../assets/js/main.js"></script>
<script src="revels.js"></script>
<script src="crossy.js"></script>
<script>
// open this section directly (originally reached via the menu)
(function(){var p=document.getElementById('games');p.classList.add('visible');currentPage='games';document.getElementById('backBtn').classList.add('show');})();
// back from the menu returns to the home page hero
// leaving Revels stops any running game and resets it to the game list
// phones: hide the big title while a game screen is open so the game fits, and start each screen on page 1
(function(){var page=document.getElementById('games'),R=document.getElementById('rv-host').shadowRoot;
function sync(){page.classList.toggle('pg-compact',R.getElementById('menu').classList.contains('hidden'));if(window.Pager)Pager.go(page,0);}
['showTrivia','showJumpy','showCrossy','backToMenu','startLevel','jumpyStart','crossyStart','showJumpySelect','nextQuestion','jumpyEnd','crossyQuit'].forEach(function(n){var f=window[n];if(typeof f!=='function')return;window[n]=function(){var r=f.apply(this,arguments);sync();return r;};});
sync();})();
var _goBack=goBack;goBack=function(){if(currentPage==='games'&&window.backToMenu)backToMenu();if(currentPage)return _goBack();location.href='../index.html';};
</script>
</body>
</html>
