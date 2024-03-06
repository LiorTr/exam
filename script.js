const inputProductName = document.querySelector('.product-name')
const inputProductNumber = document.querySelector('.product-number')
const inputProductType = document.querySelector('.product-type')
const inputProductImg = document.querySelector('.product-img')
let productList = document.querySelector('.product-list')
let addProductBtn = document.querySelector('.btn-add')
const editProductDiv = document.querySelector('.edit-product')
let product = {}
let products = localStorage['product'] ? JSON.parse(localStorage.getItem('product')) : []
const inputEditName = document.querySelector('.product-name-edit')
const inputEditNumber = document.querySelector('.product-number-edit')
const inputEditType = document.querySelector('.product-type-edit')
const inputEditImg = document.querySelector('.product-img-edit')
let addProductBtnEdit = document.querySelector('.btn-add-edit')

window.onload = function () {
  if (localStorage['product']) {
    let retrevedProduct = JSON.parse(localStorage.getItem('product'))

    retrevedProduct.forEach(product => {
      createProductHtml(product)
    });
  }
}
function saveProduct() {
  if (inputProductName.value === '' || inputProductNumber.value === '' || inputProductType.value === '' || inputProductImg.value === '') {
    alert('Please fill all the forms')

  }
  else {
    product = {
      productName: inputProductName.value,
      productNumber: inputProductNumber.value,
      productType: inputProductType.value,
      productImg: inputProductImg.value
    }
    products.push(product)
    createProductHtml(product)
    inputProductName.value = ''
    inputProductNumber.value = ''
    inputProductType.value = ''
    inputProductImg.value = ''
    saveToLocalStorage()
  }
}
function createProductHtml(product) {
  let productNameCreate = document.createElement('td')
  let productNumberCreate = document.createElement('td')
  let productTypeCreate = document.createElement('td')
  let productImgCreate = document.createElement('img')
  productImgCreate.classList.add('img-prod')
  changeTextContentToElements(productNameCreate, productNumberCreate, productTypeCreate, productImgCreate, product)
  let productDiv = document.createElement('tr')
  let productTdImg = document.createElement('td')
  let btnDeleteProd = document.createElement('button')
  let btnEditProd = document.createElement('button')
  btnDeleteProd.textContent = 'x'
  btnEditProd.textContent = 'x'
  let productTdBtnDelete = document.createElement('td')
  let productTdBtnEdit = document.createElement('td')
  appendChildToHtml(productNameCreate, productNumberCreate, productTypeCreate, productImgCreate, productTdImg, btnDeleteProd, productTdBtnDelete, btnEditProd, productTdBtnEdit, productDiv)

  btnDeleteProd.addEventListener('click', function () {
    let i = productNameCreate.textContent
    for (let j = 0; j < products.length; j++) {
      if (products[j].productName === i) {
        products.splice(j, 1)
        saveToLocalStorage()
      }

    }
    btnDeleteProd.parentElement.parentElement.remove()
    saveToLocalStorage()
  }
  )
  btnEditProd.addEventListener('click', function () {
    editProductDiv.style.opacity = '1'
    let productDiv = productNameCreate.textContent
    for (let j = 0; j < products.length; j++) {
      if (products[j].productName === productDiv) {
        addProductBtnEdit.addEventListener('click', function () {
          products[j].productName = inputEditName.value
          console.log(inputEditName.value)
          products[j].productNumber = inputProductNumber.value
          console.log(inputProductNumber.value)
          products[j].productType = inputProductType.value
          console.log(inputProductType.value)
          products[j].productImg = inputProductImg.value
          console.log(inputProductImg.value)
        })



        saveToLocalStorage()
      }
    }
  }
  )
}
addProductBtn.addEventListener('click', function () {
  saveProduct()
})
function appendChildToHtml(productName, productNumber, productType, productImg, tdimg, btndelete, tdbtndelete, btnedit, tdbtnedit, maintr) {
  maintr.appendChild(productName)
  maintr.appendChild(productNumber)
  maintr.appendChild(productType)
  tdimg.appendChild(productImg)
  maintr.appendChild(tdimg)
  tdbtndelete.appendChild(btndelete)
  tdbtnedit.appendChild(btnedit)
  maintr.appendChild(tdbtndelete)
  maintr.appendChild(tdbtnedit)
  productList.appendChild(maintr)
}

function changeTextContentToElements(productName, productNumber, productType, productImg, product) {
  productName.textContent = product.productName
  productNumber.textContent = product.productNumber
  productType.textContent = product.productType
  productImg.src = product.productImg
}
function saveToLocalStorage() {
  localStorage['product'] = JSON.stringify(products)
}