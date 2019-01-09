<!DOCTYPE html>
<html>
<head>
	<title>Game of Artur</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="games.js"></script>
	<link rel="shortcut icon" type="image/x-icon" href="cars/red-car.png">

</head>
<body>
	<div class="phone">
		<div class="flexer">
			<h1>Flip the Phone</h1>
			<img src="rotate.gif">
		</div>
	</div>
	<section id="player" class="flexer">
		<h1 id="headline">Game Of Artur</h1>
		<button id="play" class="gameButton" onclick="startGame()">
			START
		</button>
	</section>
	<div id="game">
		<div class="flexer">
			<h4 id="score"></h4>
			<h4 id="speed"></h4>	
		</div>
	</div>
	<div id="controller" class="controller">
			<div class="controllers controller-left">
				<div class="arrow" ontouchstart="arrowPressLeft()"ontouchend="arrowStopLeft()" id="left">
					
				</div>
				<div class="arrow" ontouchstart="arrowPressRight()" ontouchend="arrowStopRight()" id="right">
				</div>
			</div>
			<div class="controllers controller-right">
				<div class="arrow" ontouchstart="arrowPressUp()" ontouchend="arrowStopUp()" id="up"></div>
				<div class="arrow" ontouchstart="arrowPressDown()"  ontouchend="arrowStopDown()" id="down"></div>
			</div>
		</div>
<!--audio autoplay loop>
  <source src="old_school_oriental_hip_hop_instrumental.mp3" type="audio/mpeg">
</audio-->
</body>
</html>