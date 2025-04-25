const yourDate = new Date("2022-02-22T00:00:00");

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


// Hàm gọi API để lấy danh sách file từ Google Drive
async function fetchFileIds(folderId, apiKey) {
    const endpoint = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name)&key=${apiKey}`;


    try {
        const response = await fetch(endpoint, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP lỗi! Trạng thái: ${response.status}`);
        }

        const data = await response.json();

        // Thêm các ID nhận được vào mảng fileIds
        if (data.files && data.files.length > 0) {
            fileIds = data.files.map(file => file.id); // Cập nhật fileIds
            console.log('Danh sách ID file:', fileIds);

            // Hiển thị ảnh đầu tiên sau khi tải xong dữ liệu
            if (fileIds.length > 0) {
                showImage(0);
            }
        } else {
            console.log('Thư mục không có file nào.');
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi gọi API:', error.message);
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
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : fileIds.length - 1;
    showImage(currentIndex);
});

// Nút Next
document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex < fileIds.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
});

// Biến toàn cục theo dõi ảnh hiện tại
let currentIndex = 0;

// Hàm tự động chuyển ảnh sau 10 giây
function autoSlideShow() {
    setInterval(() => {
        currentIndex = (currentIndex < fileIds.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    }, 10000); // 10 giây
}

// Gọi API và khởi động slide show tự động
fetchFileIds(folderId, API_KEY);
autoSlideShow();

//auto next time
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
 

 
});

// Danh sách file nhạc
const musicFiles = [
	"music/betifulinwhite.mp3",
	"music/liloveyou.mp3",
	"music/myheart.mp3",
	"music/mylove.mp3"
];

let currentIndex_music = 0;

document.getElementById("next-button").addEventListener("click", function () {
  // Tăng chỉ số bài hát
  currentIndex_music = (currentIndex_music + 1) % musicFiles.length;

  // Cập nhật source của audio
  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");

  audioSource.src = musicFiles[currentIndex_music];
  audioPlayer.load(); // Load lại bài nhạc mới
  audioPlayer.play(); // Phát bài nhạc
});
