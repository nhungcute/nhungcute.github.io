const yourDate = new Date("2022-02-22T00:00:00"),
music = ['myheart','betifulinwhite','mylove'];

document.addEventListener('DOMContentLoaded', function(){
	var rootTime = document.querySelector("time");

	document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()}-${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)}-${yourDate.getFullYear()}`;

	document.querySelector("date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" DAYS";

	function olock() {
		var today = new Date(),
		hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
		min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
		sec =  Math.floor((today - yourDate) / 1000) % 60;
		rootTime.textContent = `${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
	} olock();
	var timer = setInterval(function(){olock()}, 1000);


	const audioElement = document.querySelector("audio");
    audioElement.setAttribute("src", `music/${music[Math.floor(Math.random() * music.length)]}.mp3`);

    // Thêm nút "Phát nhạc"
    /* const playButton = document.createElement("button");
    playButton.textContent = "Bấm để phát nhạc";
    document.body.appendChild(playButton);
	console.log("phát âm thanh");
	// Phát nhạc khi bấm nút
	playButton.addEventListener('click', function () {
		audioElement.play().then(() => {
			playButton.remove(); // Gỡ nút sau khi phát thành công
		}).catch(error => {
			console.log("Không thể phát âm thanh:", error);
		});
	}); */
	
	
	// Slideshow

	let currentSlideIndex = 0;

	// Hiển thị slide đầu tiên
	showSlide(currentSlideIndex);
	
	function showSlide(index) {
	  const slides = document.querySelectorAll('.slide');
	  slides.forEach((slide, i) => {
	    slide.style.display = i === index ? 'block' : 'none';
	  });
	}
	
	function changeSlide(direction) {
	  const slides = document.querySelectorAll('.slide');
	  currentSlideIndex += direction;
	
	  // Lặp lại nếu vượt quá số lượng slide
	  if (currentSlideIndex < 0) {
	    currentSlideIndex = slides.length - 1;
	  } else if (currentSlideIndex >= slides.length) {
	    currentSlideIndex = 0;
	  }
	
	  showSlide(currentSlideIndex);
	}
});
