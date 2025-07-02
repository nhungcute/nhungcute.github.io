// Xử lý nút phát nhạc
        document.addEventListener('DOMContentLoaded', function() {
            const audioButton = document.querySelector('.toggleAudio');
            const audioIcon = audioButton.querySelector('i');
            const backgroundMusic = document.getElementById('backgroundMusic');
            
            // Mặc định là tắt nhạc
            let isPlaying = false;
            
            // Đảm bảo nhạc không tự động phát khi tải trang
            backgroundMusic.pause();
            
            // Xử lý sự kiện khi nhấn nút phát nhạc
            audioButton.addEventListener('click', function() {
                if (isPlaying) {
                    // Dừng phát nhạc
                    backgroundMusic.pause();
                    audioIcon.className = 'ri-volume-mute-fill';
                    isPlaying = false;
                } else {
                    // Bắt đầu phát nhạc
                    // Đảm bảo nhạc được tải lại từ đầu nếu đã kết thúc
                    if (backgroundMusic.ended) {
                        backgroundMusic.currentTime = 0;
                    }
                    
                    // Phát nhạc
                    const playPromise = backgroundMusic.play();
                    
                    // Xử lý lỗi phát nhạc (thường xảy ra trên các trình duyệt mobile)
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Phát nhạc thành công
                            audioIcon.className = 'ri-volume-up-fill';
                            isPlaying = true;
                        })
                        .catch(error => {
                            // Không thể phát nhạc (thường do chính sách của trình duyệt)
                            console.error('Không thể phát nhạc:', error);
                            alert('Không thể phát nhạc tự động. Vui lòng tương tác với trang web trước.');
                        });
                    }
                }
            });
            
            // Xử lý sự kiện khi nhạc kết thúc
            backgroundMusic.addEventListener('ended', function() {
                // Phát lại từ đầu (nếu không có thuộc tính loop)
                backgroundMusic.currentTime = 0;
                backgroundMusic.play();
            });
        
            // Trigger animations when the family section comes into view
            const familyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Reset animations by forcing reflow
                        const familyContainer = entry.target;
                        
                        // Remove and re-add the animation classes to restart animations
                        familyContainer.style.animation = 'none';
                        void familyContainer.offsetWidth; // Force reflow
                        familyContainer.style.animation = 'fadeInContainer 0.8s ease forwards';
                        
                        // Reset title animation
                        const familyTitle = familyContainer.querySelector('.family-title');
                        familyTitle.style.animation = 'none';
                        void familyTitle.offsetWidth;
                        familyTitle.style.animation = 'fadeInUp 0.8s ease forwards 0.3s';
                        
                        // Reset member animations
                        const familyMembers = familyContainer.querySelectorAll('.family-member');
                        familyMembers.forEach((member, index) => {
                            // Reset member container animation
                            member.style.animation = 'none';
                            void member.offsetWidth;
                            member.style.animation = `fadeInUp 0.8s ease forwards ${0.6 + index * 0.3}s`;
                            
                            // Reset member image animation
                            const memberImage = member.querySelector('.member-image');
                            memberImage.style.animation = 'none';
                            void memberImage.offsetWidth;
                            memberImage.style.animation = `zoomIn 0.8s ease forwards ${0.8 + index * 0.3}s`;
                            // Reset image decorations animation
                            const imageDecorations = member.querySelectorAll('.image-decoration');
                            imageDecorations.forEach((decoration, i) => {
                                decoration.style.opacity = '0';
                                setTimeout(() => {
                                    decoration.style.opacity = '0.6';
                                }, (1000 + i * 200) + (index * 300));
                            });
                            // Reset member name animation
                            const memberName = member.querySelector('.member-name');
                            memberName.style.animation = 'none';
                            void memberName.offsetWidth;
                            memberName.style.animation = `fadeIn 0.8s ease forwards ${1.0 + index * 0.3}s`;
                            
                            // Reset member parents animation
                            const memberParents = member.querySelector('.member-parents');
                            memberParents.style.animation = 'none';
                            void memberParents.offsetWidth;
                            memberParents.style.animation = `fadeIn 0.8s ease forwards ${1.2 + index * 0.3}s`;
                            
                            // Reset member address animation
                            const memberAddress = member.querySelector('.member-address');
                            memberAddress.style.animation = 'none';
                            void memberAddress.offsetWidth;
                            memberAddress.style.animation = `fadeIn 0.8s ease forwards ${1.4 + index * 0.3}s`;
                        });
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '-50px 0px'
            });
            // Poem animation observer
        const poemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const captionContainer = entry.target;
                    
                    // Animate poem lines
                    const poemLines = captionContainer.querySelectorAll('.poem-line');
                    poemLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.classList.add('visible');
                        }, 300 * (index + 1));
                    });
                    
                    // Animate decorations
                    const decorations = captionContainer.querySelectorAll('.poem-decoration');
                    decorations.forEach((decoration, index) => {
                        setTimeout(() => {
                            decoration.classList.add('visible');
                        }, 1000 + 200 * index);
                    });
                    
                    // Start floating hearts animation
                    const hearts = captionContainer.querySelectorAll('.heart-float');
                    hearts.forEach(heart => {
                        heart.style.opacity = '0.3';
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-10px 0px'
        });
            const familyContainer = document.querySelector('.family-container');
            if (familyContainer) {
                familyObserver.observe(familyContainer);
            }


			// animation cho đoạn thơ
			const captionContainer = document.querySelector('.caption-container');
			// Hàm kích hoạt animation cho đoạn thơ
            if (captionContainer) {
            poemObserver.observe(captionContainer);
			}



            // Add heartbeat animation to the Thank You section
            const thankYouText = document.querySelector('.thank-you-text');
            if (thankYouText) {
                thankYouText.addEventListener('mouseover', function() {
                    this.style.animation = 'heartBeat 1.5s ease';
                });
                
                thankYouText.addEventListener('animationend', function() {
                    this.style.animation = '';
                });
            }
        });
          
			// Ensure names stay properly sized on window resize
			function adjustNameSizes() {
				const imgTopBg = document.querySelector('.img-top-bg');
				const namesContainer = document.querySelector('.names-container');
				
				// Make sure the names container doesn't overflow the background
				if (imgTopBg && namesContainer) {
					const bgHeight = imgTopBg.offsetHeight;
					const containerHeight = namesContainer.offsetHeight;
					
					if (containerHeight > bgHeight * 0.9) {
						// Reduce the gap between name rows if needed
						const nameRows = document.querySelectorAll('.name-row');
						nameRows.forEach(row => {
							row.style.marginBottom = '0.3rem';
						});
					}
				}
			}
			// Function to ensure family member names and parent info stay aligned
        function syncFamilyMemberHeights() {
            // Get all member names and ensure they have the same height
            const memberNames = document.querySelectorAll('.member-name');
            let maxNameHeight = 0;
            
            memberNames.forEach(name => {
                name.style.height = 'auto'; // Reset height first
                const height = name.offsetHeight;
                if (height > maxNameHeight) {
                    maxNameHeight = height;
                }
            });
            
            // Set all names to the same height
            memberNames.forEach(name => {
                name.style.height = maxNameHeight + 'px';
            });
            
            // Ensure father rows have the same height
            const fatherRows = document.querySelectorAll('.father-row');
            let maxFatherHeight = 0;
            
            fatherRows.forEach(row => {
                row.style.height = 'auto'; // Reset height first
                const height = row.offsetHeight;
                if (height > maxFatherHeight) {
                    maxFatherHeight = height;
                }
            });
            
            // Set all father rows to the same height
            fatherRows.forEach(row => {
                row.style.height = maxFatherHeight + 'px';
            });
            
            // Ensure mother rows have the same height
            const motherRows = document.querySelectorAll('.mother-row');
            let maxMotherHeight = 0;
            
            motherRows.forEach(row => {
                row.style.height = 'auto'; // Reset height first
                const height = row.offsetHeight;
                if (height > maxMotherHeight) {
                    maxMotherHeight = height;
                }
            });
            
            // Set all mother rows to the same height
            motherRows.forEach(row => {
                row.style.height = maxMotherHeight + 'px';
            });
            
            // Ensure addresses have the same height
            const addresses = document.querySelectorAll('.member-address');
            let maxAddressHeight = 0;
            
            addresses.forEach(address => {
                address.style.height = 'auto'; // Reset height first
                const height = address.offsetHeight;
                if (height > maxAddressHeight) {
                    maxAddressHeight = height;
                }
            });
            
            // Set all addresses to the same height
            addresses.forEach(address => {
                address.style.height = maxAddressHeight + 'px';
            });
        }
        
        // Run on load and resize
        window.addEventListener('load', function() {
            adjustNameSizes();
            syncFamilyMemberHeights();
        });
        
        window.addEventListener('resize', function() {
            adjustNameSizes();
            syncFamilyMemberHeights();
        });