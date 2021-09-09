var $ = document

function _id(id_name) {
    return $.getElementById(id_name)
}

function _class(class_name) {
    return $.getElementsByClassName(class_name)
}

var noteText = _id("note_text")
var addNote = _id("add_note")
var deleteNoteValue = _id("delete_note")
var error = _id("error")
var list = _id("list")
var palet = $.querySelectorAll(".note_color")
var notes = []

// Create Note
var render = () => {
    var wrotenNote = $.createElement("p")
    var parentDiv = $.createElement("div")
    var deleteBtn = $.createElement("i")
    var noteCount = 1

    notes.forEach(note => {
        wrotenNote.innerHTML = note
        deleteBtn.classList.add("bi", "bi-x", "delete_btn")
        wrotenNote.appendChild(deleteBtn)
        parentDiv.classList.add("parent_div", "col-md-3", "shadow")
        parentDiv.setAttribute("id", "note" + noteCount++)
        parentDiv.appendChild(wrotenNote)
        parentDiv.style.background = noteText.style.backgroundColor
        list.appendChild(parentDiv)
    })

    // Delet Notes
    deleteBtn.addEventListener("click", () => {
        deleteBtn.parentElement.parentElement.remove()
        localStorage.setItem("notes", list.innerHTML)
    })
}

// Error For Empy Frame
var errorNotif = () => {
    if (noteText.value == "") {
        error.innerHTML = "Please Fill The Frame !"
        list.lastElementChild.style.display = "none"
    }
}

// Clear Error
var ClearError = () => {
    error.innerHTML = ""
}

// Clear Input
var clear = () => {
    noteText.value = ""
    noteText.style.backgroundColor = "#fff"
}

// Adding Notes
var addNotes = () => {
    notes.push(noteText.value)

    render()
    errorNotif()
    clear()

    localStorage.setItem("notes", list.innerHTML)
}

var addByEnter = event => {
    if(event.keyCode === 13) {
        addNotes()
    }
}

// refresh Act
if (window.performance) {
    list.innerHTML = localStorage.getItem("notes")
}

// Change Color
palet.forEach(item => {
    item.addEventListener("click", event => {
        var paletColor = event.target.style.backgroundColor
        noteText.style.backgroundColor = paletColor
    })
})

// Event Listener
addNote.addEventListener("click", addNotes)
noteText.addEventListener("keyup", addByEnter)
noteText.addEventListener("focus", ClearError)
deleteNoteValue.addEventListener("click", clear)