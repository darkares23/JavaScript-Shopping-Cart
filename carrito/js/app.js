//Variables
//-------------------------------------------------------------------
const cart = document.getElementById('carrito'),
	curses = document.getElementById('lista-cursos'),
	curseList = document.querySelector('#lista-carrito tbody'),
	cleanCartBtn = document.getElementById('vaciar-carrito');

//Listeners
//-------------------------------------------------------------------
loadEventlisteners();

function loadEventlisteners() {
	// Triger whe add to cart button is target
	curses.addEventListener('click', buyCurse);

	//Delete curse from the cart
	cart.addEventListener('click', deleteCurseFromCart);

	//Clean cart
	cleanCartBtn.addEventListener('click', cleanAllCart);

	//Load local storage load page
	document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
}

//Functions
//-------------------------------------------------------------------
// Added curse to cart function
function buyCurse(e) {
	e.preventDefault();
	// Delegation to add to cart
	if (e.target.classList.contains('agregar-carrito')) {
		const curse = e.target.parentElement.parentElement;
		// Send selected curse
		readCurseInfo(curse);
	}
}
// Read data of the curses
function readCurseInfo(curse) {
	const infoCurse = {
		img: curse.querySelector('img').src,
		title: curse.querySelector('h4').textContent,
		price: curse.querySelector('.precio span').textContent,
		id: curse.querySelector('a').getAttribute('data-id')
	}
	inserToCart(infoCurse);
}

// Show and insert selected cures in the cart DOM
function inserToCart(curse) {
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>
			<img src="${curse.img}" width=100>
		</td>
		<td>${curse.title}</td>
		<td>
			<a href="#" class="borrar-curso" data-id="${curse.id}">X</a>
		</td>
	`;
	curseList.appendChild(row);
	saveCurseToLocalStorage(curse);
}
// Delete curse from cart in DOM function
function deleteCurseFromCart(e) {
	e.preventDefault();
	let curse, curseId;

	if (e.target.classList.contains('borrar-curso')) {
		e.target.parentElement.parentElement.remove();
		curse = e.target.parentElement.parentElement;
		curseId = curse.querySelector('a').getAttribute('data-id');
	}
	deleteFromLocalStorage(curseId);
}

//Clean All cart curses in DOM
function cleanAllCart(e) {
	//Not recomded way
	//curseList.innerHTML = '';
	//recomended way
	while (curseList.firstChild) {
		curseList.removeChild(curseList.firstChild);
	}
	// clear local storage
	clearAllLocalStoreCurses();
	return false;
}
//Save to local storage the curse
function saveCurseToLocalStorage(curse) {
	let curses;
	//see if there are elemts in local storage
	curses = obtainCursesFromLocalStorage();
	// push curse to array
	curses.push(curse);

	localStorage.setItem('curses', JSON.stringify(curses));
}

function obtainCursesFromLocalStorage() {
	let curseLS;

	// See if there are curses in local storage
	if (localStorage.getItem('curses') === null) {
		curseLS = [];
	} else {
		curseLS = JSON.parse(localStorage.getItem('curses'));
	}
	return curseLS
}

// Load from local storage the curses
function loadFromLocalStorage() {
	let curseLS;

	curseLS = obtainCursesFromLocalStorage();

	curseLS.forEach(function(curse) {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${curse.img}" width=100>
			</td>
			<td>${curse.title}</td>
			<td>
				<a href="#" class="borrar-curso" data-id="${curse.id}">X</a>
			</td>
		`;
		curseList.appendChild(row);
	});
}

// Delete Curse  from local store
function deleteFromLocalStorage(curse) {
	let cursesLS;
	// Obtain curses from LS
	cursesLS = obtainCursesFromLocalStorage();
	// Iterating to delete the selected curse from LS
	cursesLS.forEach(function(curseLS, index) {
		if (curseLS.id === curse) {
			cursesLS.splice(index, 1);
		}
	});
	console.log(cursesLS);
	// Add remaining arrays elements to LS
	localStorage.setItem('curses', JSON.stringify(cursesLS));
}
// Clear all local storage
function clearAllLocalStoreCurses() {
	localStorage.clear();
}
