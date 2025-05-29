const yourDate = new Date("2022-02-22T00:00:00");
// connect firebase gg
 // Cấu hình Firebase
    const firebaseConfig = {
        apiKey: "API_KEY",
        authDomain: "PROJECT_ID.firebaseapp.com",
        databaseURL: "https://PROJECT_ID.firebaseio.com",
        projectId: "PROJECT_ID",
        storageBucket: "PROJECT_ID.appspot.com",
        messagingSenderId: "SENDER_ID",
        appId: "APP_ID"
    };

   
// end connect
const CLIENT_ID = '451667163554-rrbvqoahepjlq35d634c09fgc8ssuofo.apps.googleusercontent.com'; // Lấy từ Google Cloud Console
const API_KEY = 'AIzaSyDJddlVwOWA8vzdVNrcp70if4eOL30xjp0'; // Lấy từ Google Cloud Console
const FOLDER_ID = '1B_tpWbLwlc7mqT789-g2RO9K2pYNXVav'; // ID thư mục Google Drive
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

const imageUrls = [];
music = ['myheart','betifulinwhite','mylove'];
var folderId = '1B_tpWbLwlc7mqT789-g2RO9K2pYNXVav';
// Danh sách ID file từ API Google Drive
let fileIds = [];
var randomNumber = 0;

// Hàm gọi API để lấy danh sách file từ Google Drive (hỗ trợ phân trang)
async function fetchFileIds(folderId, apiKey) {
    let allFileIds = [];
    let nextPageToken = null;

    do {
        const endpoint = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=nextPageToken,files(id,name)&key=${apiKey}` +
            (nextPageToken ? `&pageToken=${nextPageToken}` : '');

        try {
            const response = await fetch(endpoint, { method: 'GET' });
            if (!response.ok) {
                throw new Error(`HTTP lỗi! Trạng thái: ${response.status}`);
            }

            const data = await response.json();

            // Thêm các ID nhận được vào mảng fileIds
            if (data.files && data.files.length > 0) {
                allFileIds = allFileIds.concat(data.files.map(file => file.id)); // Cập nhật fileIds
            }

            // Cập nhật nextPageToken
            nextPageToken = data.nextPageToken || null;

        } catch (error) {
            console.error('Có lỗi xảy ra khi gọi API:', error.message);
            break;
        }
    } while (nextPageToken);

    fileIds = allFileIds; // Cập nhật biến toàn cục fileIds
    console.log('Danh sách ID file đầy đủ:', fileIds);

    // Hiển thị ảnh random sau khi tải xong dữ liệu 
    if (fileIds.length > 0) {
        randomNumber = Math.floor(Math.random() * fileIds.length);
        console.log('randomNumber:', randomNumber);
        showImage(randomNumber);
    } else {
        console.log('Thư mục không có file nào.');
    }
}

// Hàm hiển thị ảnh theo ID
function showImage(index) {
    const slideImg = document.getElementById('slide-img');
    const fileId = fileIds[index];
    slideImg.src = `https://lh3.googleusercontent.com/u/0/d/${fileId}=w1912-h954-iv1?auditContext=forDisplay`;
    slideImg.style.display = 'block';
}

// Nút Back
document.getElementById('prevBtn').addEventListener('click', () => {
    randomNumber = (randomNumber > 0) ? randomNumber - 1 : fileIds.length - 1;
    console.log('randomNumber:', randomNumber);
    showImage(randomNumber);
});

// Nút Next
document.getElementById('nextBtn').addEventListener('click', () => {
    randomNumber = (randomNumber < fileIds.length - 1) ? randomNumber + 1 : 0;
    console.log('randomNumber:', randomNumber);
    showImage(randomNumber);
});

// Biến toàn cục theo dõi ảnh hiện tại
//let currentIndex = 0;

// Hàm tự động chuyển ảnh sau 10 giây
function autoSlideShow() {
    setInterval(() => {
        randomNumber = (randomNumber < fileIds.length - 1) ? randomNumber + 1 : 0;
	console.log('autoSlideShow:', randomNumber);
        showImage(randomNumber);
    }, 10000); // 10 giây
}

// Gọi API và khởi động slide show tự động
fetchFileIds(folderId, API_KEY);
autoSlideShow();

//auto next time
document.addEventListener('DOMContentLoaded', function(){
	var rootTime = document.querySelector("time");

	document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()}-${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)}-${yourDate.getFullYear()}` +"  "+"00:00:00";

	document.querySelector("date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" DAYS";

	function olock() {
		var today = new Date(),
		hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
		min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
		sec =  Math.floor((today - yourDate) / 1000) % 60;
		rootTime.textContent = `${(today.getDate()>9)?today.getDate():"0"+today.getDate()}-${(today.getMonth()>8)?(today.getMonth()+1):"0"+(today.getMonth()+1)}-${today.getFullYear()}` +"  "+`${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
	} olock();
	var timer = setInterval(function(){olock()}, 1000);


	const audioElement = document.querySelector("audio");
	audioElement.setAttribute("src", `music/${music[Math.floor(Math.random() * music.length)]}.mp3`);
	 
});
 


(function() {
    var canvas = document.getElementById('snowCanvas');
    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var flakes = [];

    function Snowflake() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
    }

    Snowflake.prototype.update = function() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) {
            this.y = 0;
            this.x = Math.random() * width;
        }

        if (this.x > width || this.x < 0) {
            this.x = Math.random() * width;
        }
    }

    Snowflake.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255," + this.opacity + ")";
        ctx.fill();
    }

    function createFlakes() {
        for (var i = 0; i < 100; i++) {
            flakes.push(new Snowflake());
        }
    }

    function drawFlakes() {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < flakes.length; i++) {
            flakes[i].update();
            flakes[i].draw();
        }
        requestAnimationFrame(drawFlakes);
    }

    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    createFlakes();
    drawFlakes();
})();
