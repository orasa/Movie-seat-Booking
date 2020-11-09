const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//save selected movie index and price into localStorage using setItem with key and value pair
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [ ...selectedSeats ].map(function(seat) {
		return [ ...seats ].indexOf(seat);
	});

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and poputale UI, Jason.pars to parse it back to array
//check if selectedSeats that we get from localStorage is there
//loop trough seats (all the seats from the dom) with forEach with param seat, index
//
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			console.log(seat);

			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
			console.log(selectedSeats);
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

// Movie select event, because it is a select list will want to use with change event

// when select different movie, price change , call updateSelectedCount

movieSelect.addEventListener('change', (e) => {
	e.preventDefault();

	ticketPrice = +e.target.value;
	//to get the index of movie and the value of movie = price
	console.log(e.target.selectedIndex, e.target.value);
	setMovieData(e.target.selectedIndex, e.target.value);

	updateSelectedCount();
});

// Add eventListener on the container with click event console.log(e.target)
// when click on the seat and add classList
// look for Available seats, find element in th  container that has th class of seat
// && the class that not occupied
// toggle class so we can unselect the seat aswell

container.addEventListener('click', (e) => {
	e.preventDefault();

	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');

		updateSelectedCount();
	}
});

//initial count and total set
updateSelectedCount();
