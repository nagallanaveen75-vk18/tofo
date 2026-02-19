const input= document.getElementById("input")
const add = document.getElementById("add")
const list = document.getElementById("list")

let items=[];
let editItem=null;
let currentFilter="all"

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

     let filterdTodos= items.filter(item =>{
        if(currentFilter ==="all") return true;
        if(currentFilter ==="active") return !item.completed;
        if(currentFilter ==="completed") return item.completed;
     })
   
    filterdTodos.forEach(item =>{
        const li =document.createElement("li");
        const span =document.createElement("span")
        span.textContent=item.text;

        if(item.completed){
            span.classList.add("completed")
        }

        const toggele=document.createElement("button")
        toggele.textContent=item.completed ? "not completed" : "completed"
        toggele.dataset.action="toggele"
        toggele.dataset.id=item.id;

        const delBtn = document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.dataset.action="delete";
        delBtn.dataset.id=item.id;

        const editBtn =document.createElement("button");
        editBtn.textContent="Edit";
        editBtn.dataset.action="edit";
        editBtn.dataset.id=item.id;

        li.appendChild(span)
        li.appendChild(toggele)
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

    if(action === "toggele"){
        const item =items.find(item=>item.id === id);
        if(!item) return ;
        item.completed = !item.completed;
        addtoLocalStorage();
        render()
    }
})

  const filterButtons = document.querySelectorAll(".filter");

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                currentFilter = btn.dataset.filter;
                render()
            })
        })

function addItem(){
      const val = input.value.trim();

    if(val === "") return;

    if(editItem  === null){
        items.push({
            id:Date.now(),
            text:val,
            completed:false
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

        if(e.key ==="Escape" && editItem !== null){
            editItem=null;
            input.value=""
            input.focus();
            add.textContent="Add"
        }
    })
add.addEventListener("click",()=>{
  addItem()
})
loadLocalStorage()
render()