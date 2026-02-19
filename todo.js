const input= document.getElementById("input")
const add = document.getElementById("add")
const list = document.getElementById("list")

let items=[];
let editItem=null;


function addtoLocalStorage(){
    localStorage.setItem("todos",JSON.stringify(items))
}

function loadLocalStorage(){
    const data = localStorage.getItem("todos")
    if(data){
        items=JSON.parse(data)
    }
}
function render(){
    list.innerHTML =""

    items.forEach(item =>{
        const li =document.createElement("li");
        const span =document.createElement("span")
        span.textContent=item.text;

        const delBtn = document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.dataset.action="delete";
        delBtn.dataset.id=item.id;

        const editBtn =document.createElement("button");
        editBtn.textContent="Edit";
        editBtn.dataset.action="edit";
        editBtn.dataset.id=item.id;

        li.appendChild(span)
        li.appendChild(delBtn)
        li.appendChild(editBtn)
        list.appendChild(li)


    })
}

list.addEventListener("click",(e)=>{
    let action = e.target.dataset.action
    let id =Number(e.target.dataset.id);

    if(!action) return;

    if(action === "delete"){
        items =items.filter(item =>item.id !== id);

        if(editItem === id){
            editItem=null;
            input.value=""
            add.textContent="ADD"
        }
        input.focus()
        addtoLocalStorage();
        render()
    }

    if(action === "edit"){
        let item = items.find(item=>item.id === id)
        input.value = item.text
        editItem =id;
        add.textContent="Update";
        input.focus()
    }
})


function addItem(){
      const val = input.value.trim();

    if(val === "") return;

    if(editItem  === null){
        items.push({
            id:Date.now(),
            text:val,
           // completed:false
        })
    }else{
        const item =items.find(item=>item.id === editItem)
        if(!item) return;
        // input.value =item.text;
        item.text=val;
        editItem=null;
        add.textContent="ADD"
        // render()
    }
    input.value="";
    input.focus();
    addtoLocalStorage()
    render()
}

  input.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){
            addItem()
        }
    })
add.addEventListener("click",()=>{
  addItem()
})
loadLocalStorage()
render()