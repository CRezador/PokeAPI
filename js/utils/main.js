// Alterando dropdown para aberto e fechado

const dropdown = document.querySelector('.dropdown-type button');

dropdown.addEventListener("click", ()=>{
    const checkType = document.querySelector('.check-type-pokemon');

    checkType.classList.toggle("show")
})