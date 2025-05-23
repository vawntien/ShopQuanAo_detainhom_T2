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

document.querySelectorAll(".SanPham").forEach(sp => {
    const btnThem = sp.querySelector(".ThemNhanhVaoGio");
    const menuSize = sp.querySelector(".LuaChonSize");
    btnThem.addEventListener("click", function (e) {
        e.preventDefault();
        btnThem.style.display = "none";
        menuSize.style.display = "flex";
    });
    sp.addEventListener("mouseleave", function () {
        btnThem.style.display = "block";
        menuSize.style.display = "none";
    });
});


