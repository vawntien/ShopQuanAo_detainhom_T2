document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử cần thiết
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const colorOptions = document.querySelectorAll('.color-choose');
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedColorText = document.getElementById('selectedColor');
    const sizeGuideBtn = document.getElementById('sizeGuideBtn');
    const sizeModal = document.getElementById('sizeModal');
    const closeModal = document.querySelector('.close');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Biến lưu trạng thái hiện tại
    let currentIndex = 0;
    let currentColor = null; // Ban đầu không có màu nào được chọn
    let isColorSelected = false; // Biến để kiểm tra xem người dùng đã chọn màu chưa
    
    // Hàm hiển thị/ẩn thumbnails theo màu
    function showThumbnailsByColor(color) {
        if (color === null) {
            // Nếu không có màu nào được chọn, hiển thị tất cả thumbnails
            thumbnails.forEach(thumb => {
                thumb.style.display = 'block';
            });
        } else {
            // Nếu có màu được chọn, chỉ hiển thị thumbnails của màu đó
            thumbnails.forEach(thumb => {
                if (thumb.getAttribute('data-color') === color) {
                    thumb.style.display = 'block';
                } else {
                    thumb.style.display = 'none';
                }
            });
        }
    }
    
    // Hàm cập nhật ảnh chính và thumbnail active
    function updateMainImage(index, color) {
        let targetThumbnails;
        
        if (color === null) {
            // Nếu không có màu nào được chọn, sử dụng tất cả thumbnails
            targetThumbnails = Array.from(thumbnails);
        } else {
            // Nếu có màu được chọn, chỉ sử dụng thumbnails của màu đó
            targetThumbnails = Array.from(thumbnails).filter(
                thumb => thumb.getAttribute('data-color') === color
            );
        }
        
        // Cập nhật ảnh chính
        if (targetThumbnails[index]) {
            mainImage.src = targetThumbnails[index].querySelector('img').src;
            
            // Cập nhật trạng thái active của thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            targetThumbnails[index].classList.add('active');
            
            // Cập nhật chỉ số hiện tại
            currentIndex = index;
        }
    }
    
    // Hàm lấy tất cả thumbnails đang hiển thị
    function getVisibleThumbnails() {
        if (currentColor === null) {
            // Nếu không có màu nào được chọn, trả về tất cả thumbnails
            return Array.from(thumbnails);
        } else {
            // Nếu có màu được chọn, chỉ trả về thumbnails của màu đó
            return Array.from(thumbnails).filter(
                thumb => thumb.getAttribute('data-color') === currentColor
            );
        }
    }
    
    // Khởi tạo - hiển thị tất cả thumbnails ban đầu
    showThumbnailsByColor(null);
    updateMainImage(0, null);
    
    // Xử lý sự kiện click vào nút màu
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Cập nhật trạng thái active
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Kiểm tra xem người dùng có đang bỏ chọn màu hiện tại không
            if (this.classList.contains('active') && isColorSelected) {
                // Nếu đang bỏ chọn, hiển thị tất cả thumbnails
                this.classList.remove('active');
                currentColor = null;
                isColorSelected = false;
                
                // Cập nhật text màu sắc
                if (selectedColorText) {
                    selectedColorText.textContent = "Tất cả";
                }
                
                // Hiển thị tất cả thumbnails
                showThumbnailsByColor(null);
                updateMainImage(0, null);
            } else {
                // Nếu đang chọn màu mới
                this.classList.add('active');
                
                // Lấy màu được chọn
                const color = this.getAttribute('data-color');
                currentColor = color;
                isColorSelected = true;
                
                // Cập nhật text màu sắc
                if (selectedColorText) {
                    selectedColorText.textContent = color === 'black' ? 'Đen' : 'Trắng';
                }
                
                // Hiển thị thumbnails theo màu
                showThumbnailsByColor(color);
                
                // Cập nhật ảnh chính (hiển thị ảnh đầu tiên của màu đó)
                updateMainImage(0, color);
            }
        });
    });
    
    // Xử lý sự kiện click vào thumbnails
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const visibleThumbs = getVisibleThumbnails();
            const index = visibleThumbs.indexOf(this);
            
            if (index !== -1) {
                updateMainImage(index, currentColor);
            }
        });
    });
    
    // Xử lý sự kiện click vào nút trước
    prevBtn.addEventListener('click', function() {
        const visibleThumbs = getVisibleThumbnails();
        
        // Tính toán chỉ số mới
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = visibleThumbs.length - 1;
        }
        
        // Cập nhật ảnh chính
        updateMainImage(newIndex, currentColor);
    });
    
    // Xử lý sự kiện click vào nút sau
    nextBtn.addEventListener('click', function() {
        const visibleThumbs = getVisibleThumbnails();
        
        // Tính toán chỉ số mới
        let newIndex = currentIndex + 1;
        if (newIndex >= visibleThumbs.length) {
            newIndex = 0;
        }
        
        // Cập nhật ảnh chính
        updateMainImage(newIndex, currentColor);
    });
    
    // Xử lý sự kiện click vào các tùy chọn kích cỡ
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Xử lý sự kiện click vào gợi ý tìm size
    sizeGuideBtn.addEventListener('click', function() {
        sizeModal.style.display = 'block';
    });
    
    // Xử lý sự kiện đóng modal
    closeModal.addEventListener('click', function() {
        sizeModal.style.display = 'none';
    });
    
    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function(event) {
        if (event.target === sizeModal) {
            sizeModal.style.display = 'none';
        }
    });
    
    // Xử lý accordion
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle class active cho header
            this.classList.toggle('active');
            
            // Toggle hiển thị nội dung
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});