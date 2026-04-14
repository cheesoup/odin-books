// https://www.theodinproject.com/lessons/node-path-javascript-object-constructors

const myLibrary = [];
const tbody = document.querySelector("tbody");

function Book(title, author, pages, beenRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.beenRead = beenRead;
	this.id = crypto.randomUUID();
	
	this.info = function() {
	  let beenReadStr = (this.beenRead) ? "Read" : "Not Read";
	  return `${this.title} by ${this.author}. ${this.pages} pages. ${beenReadStr}. ${this.id}`
	}
}

function addBook (title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

function displayBook(book) {
	// Create Rpw
	const row = document.createElement("tr");
	row.setAttribute("id", book.id);

	// Generate title th
	const title = document.createElement("th");
	title.setAttribute("scope", "row");
	title.textContent = `${book.title}`;
	row.appendChild(title);

	// Generate author td
	const author = document.createElement("td");
	author.textContent = `${book.author}`;
	row.appendChild(author);

	// generate page count td
	const pages = document.createElement("td");
	pages.textContent = `${book.pages}`;
	row.appendChild(pages);

	// generate id td
	const id = document.createElement("td");
	id.textContent = `${book.id}`;
	row.appendChild(id);

	// generate read status td
	const read = document.createElement("td");
	read.textContent = `${book.beenRead}`;
	row.appendChild(read);

	// generate delete button
	const remove = document.createElement("td");
	const removeButton = document.createElement("button");
	removeButton.textContent = "Delete";
	removeButton.addEventListener("click", () => {
		// find parent element (closest row)
		const pa = removeButton.closest("tr");
		// find entry in myLibrary which matches parent id attribute and splice it out
		myLibrary.splice(myLibrary.findIndex((b) => b.id === pa.getAttribute("id")), 1);
		// remove parent element
		pa.remove();
	});
	remove.appendChild(removeButton);
	row.appendChild(remove);

	// append row to tbody
	tbody.appendChild(row);
}

addBook("The Fellowship of the Ring", "J.R.R. Tolkien", 423, false);
addBook("The Two Towers", "J.R.R. Tolkien", 352, false);
addBook("Return of the King", "J.R.R. Tolkien", 416, false);

for (let book of myLibrary) {
	displayBook(book);
}
