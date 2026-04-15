const lib = {};
const statusEnum = [ "Planned", "Reading", "Completed" ];

function Book(title, author, pages, readStatus, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.readStatus = readStatus;
	this.row = appendRow(id);

	this.update = () => {
		this.row.querySelector(".title").textContent = this.title;
		this.row.querySelector(".author").textContent = this.author;
		this.row.querySelector(".pages").textContent = this.pages;
		this.row.querySelector(".readStatus").textContent = this.readStatus;
	}
	this.update();
}

function addBook (title, author, pages, readStatus) {
	const id = crypto.randomUUID();
	lib[id] = new Book(title, author, pages, readStatus, id);
}

function removeBook(id) {
	lib[id].row.remove();
	delete lib[id];
}

function appendRow(id) {
	const tbody = document.querySelector("tbody");
	const appendCell = (key, r, type = "td") => {
		const cell = document.createElement(`${type}`);
		cell.setAttribute("class", key);
		r.appendChild(cell);
		return cell
	};

	// create new table row element
	const row = document.createElement("tr");
	row.setAttribute("id", id);

	// add title cell w/ scope attribute
	const title = appendCell("title", row, "th");
	title.setAttribute("scope", "row");

	// add other data cells
	appendCell("author", row);
	appendCell("pages", row);
	appendCell("readStatus", row);

	// add remove cell
	const actions = appendCell("actions", row);
	const edit = document.createElement("button");
	edit.textContent = "Edit"
	edit.setAttribute("command", "show-modal");
	edit.setAttribute("commandfor", "book-form");
	edit.addEventListener("click", (e) => {
		updateForm(edit.closest("tr").getAttribute("id"));
	});
	actions.appendChild(edit);

	const remove = document.createElement("button");
	remove.textContent = "Delete";
	remove.addEventListener("click", () => removeBook(remove.closest("tr").getAttribute("id")));
	actions.appendChild(remove);

	// append row to table
	tbody.appendChild(row);
	return row
}

function updateForm(key) {
	if (key === "add") {
		document.querySelector("input#title").value = "";
		document.querySelector("input#author").value = "";
		document.querySelector("input#pages").value = "1";
		document.querySelector("select#readStatus").value = "0";
		document.querySelector("form").setAttribute("data-mode", "add");
	} else {
		document.querySelector("input#title").value = lib[key].title;
		document.querySelector("input#author").value = lib[key].author;
		document.querySelector("input#pages").value = lib[key].pages;
		document.querySelector("select#readStatus").value = statusEnum.indexOf(lib[key].readStatus);
		document.querySelector("form").setAttribute("data-mode", key);
	}
}

document.querySelector("form").addEventListener("submit", function(e) {
	e.preventDefault();
	const data = new FormData(e.target);
	const key = e.target.getAttribute("data-mode");
	if (key === "add") {
		addBook(data.get("title"), data.get("author"), data.get("pages"), statusEnum[data.get("readStatus")]);
	} else {
		lib[key].title = data.get("title");
		lib[key].author = data.get("author");
		lib[key].pages = data.get("pages");
		lib[key].readStatus = statusEnum[data.get("readStatus")];
		lib[key].update();
	}
});

document.querySelector('button[commandfor="book-form"]').addEventListener('click', (e) => {
	updateForm("add");
});

addBook("The Hobbit", "J.R.R. Tolkien", 310, "Completed");
addBook("The Fellowship of the Ring", "J.R.R. Tolkien", 423, "Completed");
addBook("The Two Towers", "J.R.R. Tolkien", 352, "Reading" );
addBook("The Return of the King", "J.R.R. Tolkien", 416, "Planned");
