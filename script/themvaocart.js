let listProductsHTML = document.querySelector('DanhMucSanPham');

let DanhMucSanPham = [];
const addDataToHTML = () => {
    listProductsHTML.innerHTML = '';
    if (listProducts.length > 0) {
      listProducts.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('SanPham');
        newProduct.setAttribute('data-id', product.id);
  
        newProduct.innerHTML = `
          <div class="SanPhamNoiDung">
            <div class="SanPhamTop">
              <img class="anhSanPham" src="${product.img}" alt="${product.name}" />
              <a href="#" class="ThemNhanhVaoGio">Thêm nhanh vào giỏ</a>
            </div>
            <div class="LuaChonThuocTinhMau">
              ${product.colors.map((color, index) => `
                <span class="LuaChonMau ${index === 0 ? 'selected' : ''}" 
                      style="background-color: ${color.color}" 
                      data-img="${color.img}" 
                      data-color="${color.color}">
                </span>
              `).join('')}
            </div>
            <div class="SanPhamThongTin">
              <a href="${product.link}" class="TenCardSanPham">${product.name}</a>
              <div class="SanPhamGia">${product.price}</div>
            </div>
          </div>
        `;
        listProductsHTML.appendChild(newProduct);
      });

    }
  }
  let cart = [];

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('button.btn').forEach(button => {
        if (button.textContent.trim() === 'Thanh toán') {
            button.addEventListener('click', function () {
                alert("Bạn đã mua sản phẩm thành công");
                    sessionStorage.removeItem("cart");
                    capNhatSoLuong();
                    location.reload();
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ThemNhanhVaoGio').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            ThemVaoCart(btn);
        });
    });
    capNhatSoLuong();
});

function ThemVaoCart(btn) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productElement = btn.closest('.SanPham');
    const ten = productElement.querySelector('.TenCardSanPham')?.textContent.trim();
    const giaText = productElement.querySelector('.SanPhamGia')?.textContent.trim();
    const gia = parseInt(giaText.replace(/\D/g, ''));
    const mauElement = productElement.querySelector('.LuaChonMau.selected');
    const mau = mauElement?.style.backgroundColor;
    const anh = mauElement?.dataset.img;
    const size = "M";
    // Kiểm tra trùng
    const existingItem = cart.find(sp =>
        sp.ten === ten && sp.gia === gia && sp.mau === mau && sp.anh === anh && sp.size === size
    );
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ten,
            gia,
            mau,
            anh,
            size,
            quantity: 1
        });
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    capNhatSoLuong();
}

function capNhatSoLuong() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const soLuong = cart.reduce((sum, sp) => sum + sp.quantity, 0);
    const badge = document.querySelector(".SoLuongSanPham");
    if (badge) {
        badge.textContent = soLuong;
        badge.style.display = soLuong > 0 ? "block" : "none";
    }
}
//Hiển thị giỏ hàng
document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-item');
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="padding: 1rem;">Giỏ hàng trống.</div>';
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const tong = item.quantity * item.gia;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-row');
        itemDiv.innerHTML = `
            <span><img src="${item.anh}" alt="${item.ten}" width="60"><br>${item.ten}</span>
            <span>${item.gia.toLocaleString()} ₫</span>
            <span>${item.mau || ''}</span>
            <span>${item.size}</span>
            <span>${item.quantity}</span>
            <span>${tong.toLocaleString()} ₫</span>
            <span><button class="remove" data-index="${index}">Xóa</button></span>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = this.dataset.index;
            cart.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
});
updateTotal();
const initApp = () => {
    fetch('products.json')
        .then(Response => Response.json())
        .then(data => {
            DanhMucSanPham = data;
            addDataToHTML();
        })
}
initApp();
