const containerElement=document.getElementById("container");

const btnAdd =  document.getElementsByClassName("btn-Add")[0];

function getAppStorage(){
    return JSON.parse(localStorage.getItem('sticky') || "[]");
}

getAppStorage().forEach(element => {
   const textElement= createTextElement(element.id,element.content);

   containerElement.insertBefore(textElement,btnAdd);
   
});

function createTextElement(id,content){
   const textElement = document.createElement('textarea');
   textElement.classList.add('sticky');
   textElement.value=content;
   textElement.placeholder="Enter Your Notes"

   textElement.addEventListener('change',()=>{
    updateNotes(id, textElement.value)
   });

   textElement.addEventListener('dblclick',()=>{
    const check=confirm("Are You Sure to Delete ?");
    console.log(check);
    if(check==true){
        deleteNotes(id,textElement)
    };
   });

   return textElement;
}
//Add New sticky notes
function addSticky(){
    const previousNotes = getAppStorage();
    const newNotes = {
        id:Math.floor(Math.random()*100000),
        content:""
        
    } 

 const textElement=   createTextElement(newNotes.id,newNotes.content);
 containerElement.insertBefore(textElement,btnAdd);
 previousNotes.push(newNotes);
 saveNotes(previousNotes);
}

btnAdd.addEventListener('click',()=>addSticky());

//Save Sticky notes
function saveNotes(previousNotes){
    localStorage.setItem('sticky' ,JSON.stringify(previousNotes));
}

//Update Sticky notes
function updateNotes(id,content){
    const previousNotes = getAppStorage();
    const updateElement = previousNotes.filter((note)=>note.id==id)[0];
    updateElement.content = content;
    saveNotes(previousNotes);
}

function deleteNotes(id,textElement){
    const previousNotes=getAppStorage().filter((note)=>note.id!=id);
    saveNotes(previousNotes);
    containerElement.removeChild(textElement);
}

//JSON format content :  [{"id":14575,"content":"This  is content 1"},{"id":16775,"content":"This is content 2"},{ "id":62539,"content":"This is content 3"},{"id":42527,"content":"This is content 4"},{ "id":625230, "content":"This is content 5"}]