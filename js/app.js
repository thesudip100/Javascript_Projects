// this will call showNotes function to show all the previously added notes upon reloading.
showNotes();

// this will grab/select "Add note" button with id "addBtn"
let addNoteButton = document.getElementById("addBtn");

// this adds "click" event listener to above button which gets fired only when clicked on "Add note" button.
addNoteButton.addEventListener("click", function (e) {

    //Checking and fetching if there are any previously stored notes in the local storage under the name "notes".

    let notes_check = localStorage.getItem("notes");

    //if there are not any notes previously, it will return "null"
    if (notes_check == null) {

        //if any notes are not found, initialize "notesObj" with an empty array.
        notesObj = [];
    }
    else {

        /*if some notes are found, parse those notes from array and store in notesObj. 
        We can iterate notesObj since it returns array.
        */
        notesObj = JSON.parse(notes_check);
    }

    //this grabs the textbar where we write our note
    let add_Text = document.getElementById("addTxt");

    /* we are pushing the value of that textarea i.e what we write in the 
    textarea is being added in the notesObj which is an array.*/
    notesObj.push(add_Text.value);

    /*We need to set the added text value in the local storage under the name "notes". 
    Since notesObj is an array and we cannot set array directly in the local storage as we
     have learned so we use the function JSON.stringify().
     */
    localStorage.setItem("notes", JSON.stringify(notesObj));

    /*After we type sth on textarea and click on "Add note", this will give us the blank text area
     again since we do not want the previously entered value to be stucked there.*/
    add_Text.value = "";

    //We have set the notes in the local storage, now we need to show the notes in the "Your Notes" section. So, this function is called.

    showNotes();
});

function showNotes() {
    /*We had set notes in the local storage. To show them , we need to fetch the note first.
     If notes are not found, if part will be executed and if found, else part will be executed.*/
    let notes_check = localStorage.getItem("notes");
    if (notes_check == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes_check);
    }


    //initializing empty string.
    let html = "";

    //notesObj contains the notes that we stored in local storage in the form of the array, so we can iterate it.
    // element gives the textnote itself and index gives the index of its in the array.
    notesObj.forEach(function (element, index) {

        // we are adding complete html file to the above created "html" empty string.
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>  
                    <p class="card-text"> ${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"> Delete Note </button>
                </div>
            </div>`;

        /*Suppose, we have a key value pair in the local storage under the name 
        notes and that notes consists array ["hello","hi","how are you"]. 
        The index of the first note is 0 , second is 1 and third is 2. 
        When we iterate the first element of the array, i.e "hello", then we 
        want it to be stored as Note 1. Thats why we wrote ${index+1}

        We want the iterated element to be present in the 
        paragraph section iteself so we have ${element}

        When we click Delete button, we want to delete that particular note but not others.
         There may be many notes and to delete, we need to grab them by id for 
         deleting individually. so we give them their index number as id and onclick i.e
          when we click on that section, we call deleteNote() function inside which 
          the argument passed is this.id meaning that the the argument is 
          what the "id" is. 
          */
    });

    //we are adding above created html part into the container we have created in index.html with id "notepad"
    let noteElm = document.getElementById("notepad");

    /*check if the length of notesObj is zero or not, if it contains anynotes in it, 
     its length wont be zero. If it is not zero then add the above html in the 
     container inside index.html with id "notepad"*/
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        //if no notes are found, then print below statement
        noteElm.innerHTML = `You do not have any notes as of now. Click on "Add note" to add them.`
    }
}

//when we click on the delete button, we pass the argument as index number of its.
function deleteNote(index) {
    let notes_check = localStorage.getItem("notes");
    if (notes_check == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes_check);
    }

    /*we are deleting from the array notesObj the elemnt in which "Delete Note" has 
    been clicked and the index of that element is passed here.
     1 indicates that we want to delete just one element from that index number.*/
    notesObj.splice(index, 1);

    //after deleting, we need to update the local storage and show the updated notes.
    localStorage.setItem("notes", JSON.stringify(notesObj));

    //showing the updated notes
    showNotes();

}