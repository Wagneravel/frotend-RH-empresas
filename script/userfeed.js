const tagMain = document.querySelector(".tagMain")
const token = localStorage.getItem("token Login")
console.log(token)
function renderHeader(){
    const tagDivContainer = document.createElement("div")
    tagDivContainer.className = `tagDivContainer`

    const tagDivLogo = document.createElement("div")
    tagDivLogo.className = `tagDivLogo`

    const tagDivLogoCor = document.createElement("div")
    tagDivLogoCor.className = `tagDivLogoCor`

    const tagLogo = document.createElement("h1")
    tagLogo.className = `tagLogo`

    const tagDivButtons = document.createElement("div")
    tagDivButtons.className = `tagDivButtons`

    const tagButtonLogin = document.createElement("button")
    tagButtonLogin.className = `tagButtonLogin`


    tagButtonLogin.addEventListener("click", () => {

        localStorage.removeItem("token Login")

        window.location.assign("../index.html")
    })

    tagLogo.innerText = `Kenzie Empresas`

    tagButtonLogin.innerText = `Logout`

    tagDivLogo.append(tagDivLogoCor, tagLogo)
    tagDivButtons.append(tagButtonLogin)
    tagDivContainer.append(tagDivLogo, tagDivButtons)

    tagMain.appendChild(tagDivContainer)
}
renderHeader()

function renderDadosLogado(arr){

    const tagDivContainer2 = document.createElement("div")
    tagDivContainer2.className = `tagDivContainer2`

    const tagDivNome = document.createElement("div")
    tagDivNome.className = `tagDivNome`

    const tagDivDentro = document.createElement("div")
    tagDivDentro.className = `tagDivDentro`

    const tagDivButton = document.createElement("div")
    tagDivButton.className = `tagDivButton`

    const tagH1 = document.createElement("h1")
    tagH1.innerText = arr.username
    const tagPemail = document.createElement("p")
    tagPemail.innerText = `E-mail: ${arr.email}`

    const tagPnivel = document.createElement("p")
    tagPnivel.innerText = arr.professional_level

    const tagPondeTrabalha = document.createElement("p")

    if(arr.kind_of_work){

        tagPondeTrabalha.innerText = arr.kind_of_work
    }else{
        tagPondeTrabalha.innerText = `Desempregado`
    }
    

    const tagButtonEditar = document.createElement("button")
    tagButtonEditar.type = `button`
    tagButtonEditar.innerText = `||| Editar`

    tagButtonEditar.addEventListener("click", (e) => {

        console.log(`Abrir modal editar`)

        conteudoModalEditar()
    })

    



    tagDivDentro.append(tagPemail, tagPnivel, tagPondeTrabalha)
    tagDivNome.append(tagH1, tagDivDentro)
    tagDivButton.appendChild(tagButtonEditar)
    tagDivContainer2.append(tagDivNome, tagDivButton)
    tagMain.appendChild(tagDivContainer2)

}




async function requisicao(){
    const resposta =  await fetch(`http://localhost:6278/users/profile`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${token}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
          renderDadosLogado(response)
        
          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
}  
requisicao()



//http://localhost:6278/users/departments/coworkers

function renderDivColegas(arr){

    if(arr.length === 0){

        const tagDivColegas = document.createElement("div")
        tagDivColegas.className = `tagDivColegas`
    
        tagDivColegas.innerText = `Você ainda não foi contratado`

        tagMain.append(tagDivColegas)

    }else {

        const tagDivUl = document.createElement("div")
// tem que criar mais um h1 para o nome da empresa e colocar os 2 h1 dentro da div azul

        const divH1eH12 = document.createElement("div")
        divH1eH12.className = `divH1eH12`
        const tagH12 = document.createElement("h1")
        tagH12.className = `tagH12`
        tagH1.innerText = arr.description
        const tagH1 = document.createElement("h1")
        tagH1.className = `tagH1C`
        tagH1.innerText = arr.description
        divH1eH12.append(tagH1, tagH12)
        const tagUl = document.createElement("ul")
        tagUl.className = `tagUlC`

        arr.forEach(element => {
            
            const tagLi = document.createElement("li")
            tagLi.className = `tagLiC`

            const tagNome = document.createElement("h2")
            const tagNivel = document.createElement("p")

            tagNome.innerText = element.users.username
            tagNivel.innerText = element.users.professional_level

            tagLi.append(tagNome, tagNivel)
            tagUl.appendChild(tagLi)
            tagDivUl.append(divH1eH12, tagUl)
            tagMain.append(tagDivUl)
        });
    }
}

async function requisicaoColegas(){
    const resposta =  await fetch(`http://localhost:6278/users/departments/coworkers`,{          
          method:"GET",
          headers:{"Authorization" : `Bearer ${token}`},
          //body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
          
          renderDivColegas(response)
          
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 

requisicaoColegas()











const BodyModal = document.querySelector("body")

function openModal(children){

    const backgroudContainer = document.createElement("section")
    const mainContainer = document.createElement("section")
    const closeModalButton = document.createElement("button")

    backgroudContainer.classList.add("modal-background")
    mainContainer.classList.add("modal-container")
    closeModalButton.classList.add("modal-close")

    closeModalButton.innerText = "X"

    closeModalButton.addEventListener("click", (e) =>{

        const {className} = (e.target)
        console.log(className)
        
        if(className === "modal-background" || className === "modal-close"){

            backgroudContainer.remove()
        }
    })

    mainContainer.appendChild(closeModalButton)
    mainContainer.append(children)
    backgroudContainer.appendChild(mainContainer)
    BodyModal.appendChild(backgroudContainer)
}


let objEditar = []
function conteudoModalEditar(){

    const div = document.createElement("div")
    const nomeModal = document.createElement("h2")
    
    
    const inputNome = document.createElement("input")
    const inputEmail = document.createElement("input")
    const inputSenha = document.createElement("input")

    inputNome.placeholder = `Seu Nome`
    inputEmail.placeholder = `Seu Email`
    inputSenha.placeholder = `Sua Senha`

    const tagButton = document.createElement("button")
    tagButton.type = "button"
    tagButton.innerText = "Salvar Alterações"

    tagButton.addEventListener("click", (e) =>{

        e.preventDefault()
        console.log("click Editar")    

        objEditar = {
            "username": inputNome.value,
            "password": inputSenha.value,
            "email": inputEmail.value

        }
        
        console.log(objEditar)
        requisicaoEditar(objEditar)
        window.location.reload()
        
    })
    


    nomeModal.innerText = "Editar Perfil"
    

   
    div.append(nomeModal, inputNome, inputEmail, inputSenha, tagButton)

    openModal(div)
}




async function requisicaoEditar(user){
    const resposta =  await fetch(`http://localhost:6278/users`,{          
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
          body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
          renderDadosLogado(response)
          
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 

