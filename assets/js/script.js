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

// Note Color
palet.forEach(item => {
    item.addEventListener("click", event => {
        var paletColor = event.target.style.backgroundColor
        noteText.style.backgroundColor = paletColor

    })
})

// Error For Empy Frame
var errorNotif = noteItem => {
    if (noteItem == "") {
        error.innerHTML = "Please Fill The Frame !"
        return false
    }
    return true
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

// Create Note
var bildNote = () => {
    list.innerHTML = ""
    var noteCount = 1

    notes.forEach(element => {
      var note = element.note
      var color = element.color
        // Delete Note
        var deleteBtn = $.createElement("i")
        deleteBtn.classList.add("bi", "bi-x", "delete_btn")
        deleteBtn.addEventListener("click", () => {
            deleteIcon(note)
        })

        // Note Text
        var wrotenNote = $.createElement("p")
        wrotenNote.innerHTML = note

        // Note Box
        var noteBox = $.createElement("div")
        noteBox.classList.add("parent_div", "col-md-3", "shadow")
        noteBox.setAttribute("id", "note" + noteCount++)
        noteBox.style.backgroundColor = color
      
        noteBox.append(wrotenNote, deleteBtn)
        list.append(noteBox)
    })
}

// Delet Notes
var deleteIcon = inputNote => {
    var deletNotesConfirm = confirm("Are You Sure...?")

    if (deletNotesConfirm) {
        notes.forEach((noteItem, index) => {
            if (noteItem.note === inputNote) {
                notes.splice(index, 1)
            }
        })
    }
    localStorage.setItem("notes", JSON.stringify(notes))
    fetchNotes()
}

// Adding Notes
var addNotes = () => {
    if (!errorNotif(noteText.value)) {
        return false
    }

    notes.push({note: noteText.value, color: noteText.style.backgroundColor})
    localStorage.setItem("notes", JSON.stringify(notes))

    bildNote()
    clear()
}

var addByEnter = event => {
    if (event.keyCode === 13) {
        addNotes()
    }
}

// Fetch Notes
var fetchNotes = () => {
    if (localStorage.getItem("notes")) {
        notes = JSON.parse(localStorage.getItem("notes"))
    } else {
        notes = []
        localStorage.setItem("notes", JSON.stringify(notes))
    }
    bildNote()
}

// Event Listener
addNote.addEventListener("click", addNotes)
noteText.addEventListener("keyup", addByEnter)
noteText.addEventListener("focus", ClearError)
deleteNoteValue.addEventListener("click", clear)

fetchNotes()