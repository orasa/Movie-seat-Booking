//in css has class of movie.selected,  .seat.selected , .seat.occupied
// can be used to manipulate the state of event in js

// querySelectorAll will slect all and  put them into a node similar to an array
//find available seat which has no, click and make them blue, add toggle class do deslected
//get the count of ticket

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

//Update total and count
//queryselect all the seats in the row with the seat with selected class(style in css)

//querySelectorAll will give a nodelist like array and lenght or count of items
// change the count using innerText
//calculate the ticket price using the count * ticket price

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedSeatsCount = selectedSeats.length;
	console.log('number of ticket selected:', selectedSeatsCount);

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event, because it is a select list will want to use with change event

// when select different movie, price change , call updateSelectedCount

movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	updateSelectedCount();
});

// Add eventListener on the container with click event console.log(e.target)
// when click on the seat and add classList
// look for Available seat, find element in th  container that has th class of seat
// && the class that not occupied
// toggle class so we can unselect the seat aswell

container.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');

		updateSelectedCount();
	}
});
