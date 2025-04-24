document.addEventListener('DOMContentLoaded', function() {
    const ChonMau = document.querySelectorAll('.LuaChonMau')
ChonMau.forEach(color => {
    color.addEventListener('click', () => {
        if (!color.classList.contains('selected')) {
            const product = color.closest('.SanPham');
            const newImg = color.getAttribute('data-img');
            resetActiveBtns(product);
            color.classList.add('selected');
            setNewColor(product, newImg);
        }
    });
});
function resetActiveBtns(product) {
    const buttons = product.querySelectorAll('.LuaChonMau');
    buttons.forEach(color => color.classList.remove('selected'));
}
function setNewColor(product, imgSrc) {
    const img = product.querySelector('.anhSanPham');
    img.src = imgSrc;
}
})