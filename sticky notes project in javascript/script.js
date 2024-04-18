
const notescontainer=document.getElementById("app");    
const addnotebutton=notescontainer.querySelector(".add-note")

//get note saare notes ko local storage se utha ke laa rha hai or far each har aik ke uper function chla rha hai
getnote().forEach(note=>{
    const noteElement=createnote(note.id ,note.content);
    notescontainer.insertBefore(noteElement,addnotebutton);
    //insert note element BEFORE add note button
})

//stickynotes me jitne note hai ye laa ke de rha hai
//simple retrieve all of the existing notes from our local storage in the clients browser:
//basically returning array of objects in this case
function getnote(){
    return JSON.parse(localStorage.getItem("stickynotes-note") 
    ||"[]");
}
//json.parse converts the item to native i.e parhne ke kabil bnata hai
// or agr local storage me sticky note ka item na mile to return kro aik khali array


//stickynotes-note aik jagah hai local storage me jahan jaa kr yeh notes jo ke array of objects hai usse save kr rha hai
//this is gonna take in array of notes then save new notes in the local storage of the clients browser
function savenotes(notes){
    localStorage.setItem("stickynotes-note",JSON.stringify(notes));
}
//localstorage me jo manually dala tha ab woh code dal rha hai
//go to appication tab in dev tools to check
//notes iss the list of notes or array of objects




//create new element(html) to represent a note:(id of html element where to be added and content to be added)
function createnote(id ,content){
    //create element of textarea  and set its class to note:
    const element = document.createElement('textarea');
    element.classList.add("note");

    //set elements value to content
    element.value=content;
    element.placeholder="Enter Here";

    //when elements value is changed call update note
    element.addEventListener("change",()=>{
        updatenote(id,element.value);
    })

    element.addEventListener("dblclick",()=>{
        const dodelete = confirm("Are you sure you want to delete this note?");
        //if user says ok them variable is gonna return true otherwise false

        if(dodelete){
            deletenote(id,element);
        }
    })
    return element;
}




//add new note not only in the html but also in the local storage
function  addnote(){
    const notenobject = {
        id: Math.floor(Math.random() * 10000),
        content:""
    }
    
    const noteElement= createnote(notenobject.id,notenobject.content);
    notescontainer.insertBefore(noteElement,addnotebutton);

    const existingelements = getnote();
    existingelements.push(notenobject);
    savenotes(existingelements);
}
//in this function all of the elements are firstly loaded to an array existing elements and then a new element is pushed onto it

function updatenote(id, newcontent){
    //getnote returns array of objects in this case
    const notes=getnote();
    const targetnote= notes.filter(note=>note.id == id)[0];
    //note is a single object in notes which is an array of objects
    //since filter is an array and returning an array [0] is added to just give us the first element whose id matches with the id provided

    targetnote.content=newcontent;
    savenotes(notes);
}

function deletenote(id , element){
    //give us all notes without the targeted one and then save it
    const notes = getnote().filter(note=>note.id != id);
    savenotes(notes);

    //jo bhi element hai usko delete krdo jo double click hone pr create element ne idher bheja tha
    notescontainer.removeChild(element);
}



addnotebutton.addEventListener("click",()=>addnote());