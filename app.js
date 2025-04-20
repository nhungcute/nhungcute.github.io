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
	
	const apiURL = "https://api.github.com/repos/nhungcute/nhungcute.github.io/contents/slideshow";

fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        // Lọc file ảnh (jpg, jpeg, png)
        const images = data
            .filter(file => /\.(jpg|jpeg|png)$/i.test(file.name))
            .map(file => file.download_url);

        let currentIndex = 0;

        function showImage(index) {
            const slideshowContainer = document.getElementById("slideshow");
            slideshowContainer.innerHTML = `<img src="${images[index]}" alt="Slideshow image" style="width: 100%; height: auto;">`;
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Tự động chuyển ảnh sau mỗi 5 giây
        setInterval(nextImage, 10000);

        // Hiển thị ảnh đầu tiên khi tải trang
        showImage(currentIndex);

        // Gắn sự kiện cho nút
        document.getElementById("next").addEventListener("click", nextImage);
        document.getElementById("prev").addEventListener("click", prevImage);
    })
    .catch(error => console.error("Lỗi khi tải nội dung:", error));
	
/*
      document.getElementsByTagName("body")[0].insertAdjacentHTML(
            "beforeend",
            "<div id='mask'></div>"
      );
*/
});
