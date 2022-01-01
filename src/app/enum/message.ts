export enum Message {
    //error messages
    ServerDown = "Seems like server is down at this moment, please try again after sometime!",

    //validation messages
    NoteTitleRequired = "Title is required!",
    NoteTitleMaxLength = "Title is too big, Title length must be less than 256 characters!",

    //success message
    NoteSaved = "Note successfully saved!",
    NoteUpdated = "Note successfully updated!",
    NoteDeleted = "Note successfully deleted!"
}