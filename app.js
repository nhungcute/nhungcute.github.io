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
	
	const slideshowContainer = document.getElementById("slideshow");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    let currentIndex = 0;
    let images = [];
    const slideshowPath = "./slideshow/";

    // Tải danh sách ảnh từ thư mục
    async function loadImages() {
        try {
            const response = await fetch(slideshowPath);
            if (!response.ok) {
                throw new Error("Không thể tải danh sách ảnh");
            }
            const parser = new DOMParser();
            const html = await response.text();
            const doc = parser.parseFromString(html, "text/html");
            const links = Array.from(doc.querySelectorAll("a"))
                .map((a) => a.href)
                .filter((href) =>
                    /\.(jpg|jpeg|png|gif)$/i.test(href)
                ); // Lọc chỉ lấy file ảnh
            images = links;
            initSlideshow();
        } catch (error) {
            console.error(error);
        }
    }

    // Khởi tạo slideshow
    function initSlideshow() {
        images.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            if (index === 0) img.classList.add("active");
            slideshowContainer.appendChild(img);
        });
        startAutoSlide();
    }

    // Hiển thị ảnh tiếp theo
    function showNextImage() {
        const currentImage = document.querySelector(".slideshow img.active");
        currentImage.classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        slideshowContainer.children[currentIndex].classList.add("active");
    }

    // Hiển thị ảnh trước đó
    function showPrevImage() {
        const currentImage = document.querySelector(".slideshow img.active");
        currentImage.classList.remove("active");
        currentIndex =
            (currentIndex - 1 + images.length) % images.length;
        slideshowContainer.children[currentIndex].classList.add("active");
    }

    // Tự động chuyển ảnh sau 5 giây
    function startAutoSlide() {
        setInterval(() => {
            showNextImage();
        }, 5000);
    }

    // Gắn sự kiện cho nút
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);

    // Tải ảnh
    loadImages();
	
/*
      document.getElementsByTagName("body")[0].insertAdjacentHTML(
            "beforeend",
            "<div id='mask'></div>"
      );
*/
});
