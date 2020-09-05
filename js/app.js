showNotes();

let addNoteButton = document.getElementById("addBtn");
addNoteButton.addEventListener("click", function (e) {

    let notes_check = localStorage.getItem("notes");
    if (notes_check == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes_check);
    }

    let add_Text = document.getElementById("addTxt");
    notesObj.push(add_Text.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    add_Text.value = "";
    showNotes();
});

function showNotes() {
    let notes_check = localStorage.getItem("notes");
    if (notes_check == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes_check);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text"> ${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"> Delete Note </button>
                </div>
            </div>`;
    });

    let noteElm = document.getElementById("notepad");
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `You do not have any notes as of now. Click on "Add note" to add them.`
    }
}

function deleteNote(index){
    let notes_check = localStorage.getItem("notes");
    if (notes_check == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes_check);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

}