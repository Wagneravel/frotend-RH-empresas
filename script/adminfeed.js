const body = document.querySelector("body")
const tagMain = document.querySelector(".tagMain")
const token = localStorage.getItem("token Login")

function renderHeaderPage(){
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

    body.prepend(tagDivContainer)
}
renderHeaderPage()

function renderHeaderDepartamento(arr){
   // console.log(arr)
    const divHeaderDepart = document.createElement("div")
    divHeaderDepart.className = `divHeaderDepart`

    const divH1Depart = document.createElement("h1")
    divH1Depart.className = `divH1Depart`
    divH1Depart.innerText = `Departamentos`

    const divSelectDepart = document.createElement("select")
    divSelectDepart.className = `divSelectDepart`

    divSelectDepart.addEventListener("change", (e) => {
        e.preventDefault()
        // e.target.value
        console.log(e.target.value)
        console.log(divSelectDepart.selectedIndex)

       console.log(divSelectDepart.options[divSelectDepart.selectedIndex].id)
       requisicaoDepartamentos(divSelectDepart.options[divSelectDepart.selectedIndex].id)
    })

    const option = document.createElement("option")
    option.innerText = `Todas as empresas`
    divSelectDepart.append(option)
    arr.forEach((element) => {

        const tagOpt = document.createElement("option")
        tagOpt.className = `tagOpt`
        tagOpt.innerText = element.name
        tagOpt.id = element.uuid

       // console.log(tagOpt.id)
        
        divSelectDepart.appendChild(tagOpt)
    })

    const ButtonDepart = document.createElement("button")
    ButtonDepart.className = `ButtonDepart`
    ButtonDepart.type = `button`
    ButtonDepart.innerText = `Criar departamento`

    ButtonDepart.addEventListener("click", (e) => {

        e.preventDefault()

        console.log(`Abrir modal editar`)

        conteudoModalCriar(arr)

    })

    divHeaderDepart.append(divH1Depart, divSelectDepart, ButtonDepart)
    tagMain.prepend(divHeaderDepart)

}

const divDepartos = document.createElement("div")
divDepartos.className = `divDepartos`

const tagUlDepartos = document.createElement("ul")
tagUlDepartos.className = `tagUlDepartos`

divDepartos.appendChild(tagUlDepartos)

function renderDepartamentos(arr){

    tagUlDepartos.innerHTML = ``
    //console.log(arr)
    arr.forEach(element => {
        
        const tagLiDepartos = document.createElement("li")
        tagLiDepartos.className = `tagLiDepartos`
        tagLiDepartos.id = element.uuid
        const tagNomeEmpresa = document.createElement("p")
        const tagNomeDepart = document.createElement("p")
        const tagNomeDescri = document.createElement("p")

        tagNomeEmpresa.innerText = element.name
        tagNomeDepart.innerText = element.description
        tagNomeDescri.innerText = element.companies.name          
        
        const tagDB = document.createElement("div")
        tagDB.className = `tagDB`
        const tagB1 = document.createElement("button")
        const tagB2 = document.createElement("button")
        const tagB3 = document.createElement("button")

        tagB1.innerText = `Ver`
        tagB2.innerText = `Editar`
        tagB3.innerText = `DEL`


        tagB1.addEventListener("click", async (e) => {

            e.preventDefault()

            console.log("visualizando")

           await conteudoModalVisualizarDepart(listaSemEmprego, element.name, element.description, element.companies.name, element.uuid)
        })



        tagB2.addEventListener("click", (e) => {

            e.preventDefault()

            conteudoModalEditarDepart(element.uuid, element.description)
        })

        tagB3.addEventListener("click", (e) => {

            e.preventDefault()

            conteudoModalDeletarDepart(element.uuid)
        })

        tagDB.append(tagB1, tagB2, tagB3)
        tagLiDepartos.append(tagNomeEmpresa, tagNomeDepart, tagNomeDescri, tagDB)
        tagUlDepartos.appendChild(tagLiDepartos)
    });


    divDepartos.appendChild(tagUlDepartos)
    // tagMain.appendChild(divDepartos)
}


async function requisicaoEmpresas(){
    const resposta =  await fetch(`http://localhost:6278/companies`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          //console.log(response)
          renderHeaderDepartamento(response)

        
          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
}  
requisicaoEmpresas()



async function requisicaoDepartamentos(idEmpresa){
    const resposta =  await fetch(`http://localhost:6278/departments/${idEmpresa}`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${token}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          //console.log(response)
          renderDepartamentos(response)
        
          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
}  
requisicaoDepartamentos("")

function renderFuncionarios(arr){

    const divFuncionarios= document.createElement("div")
    divFuncionarios.className = `divFuncionarios`

    const tagH1Funcionarios = document.createElement("h1")
    tagH1Funcionarios.className = `tagH1Funcionarios`
    tagH1Funcionarios.innerText = `Usuários Cadastrados`

    const tagUlFuncionarios = document.createElement("ul")
    tagUlFuncionarios.className = `tagUlFuncionarios`

    divFuncionarios.appendChild(tagH1Funcionarios, tagUlFuncionarios)

    arr.forEach(element => {
        
        // console.log(element)
        if(!element.is_admin === true){

            const tagLiFuncionarios = document.createElement("li")
            tagLiFuncionarios.className = `tagLiFuncionarios`
            tagLiFuncionarios.id = element.uuid
    
    
            const tagNomeEmpresa = document.createElement("p")
            const tagNomeDepart = document.createElement("p")
            const tagNomeDescri = document.createElement("p")
    
            tagNomeEmpresa.innerText = element.username
            tagNomeDepart.innerText = element.professional_level
            tagNomeDescri.innerText = element.kind_of_work        
            
            const tagDB = document.createElement("div")
            tagDB.className = `tagFB`
            const tagB1 = document.createElement("button")
            const tagB2 = document.createElement("button")
            
    
            tagB1.innerText = ` Editar`
    
            tagB1.addEventListener("click", (e) => {
    
    
                conteudoModalEditarFuncionario(element.uuid)
    
    
    
            })
    
    
            tagB2.innerText = `Remover`
    
            tagB2.addEventListener("click", (e)=>{
    
                e.preventDefault()
    
                console.log("Modal deletar")
    
                // proxima função precisa de um parametro que será o id do funcionário
                conteudoModalDeletarFuncionario(tagLiFuncionarios.id)
    
            })
    
            tagDB.append(tagB1, tagB2)
            tagLiFuncionarios.append(tagNomeEmpresa, tagNomeDepart, tagNomeDescri, tagDB)
            tagUlFuncionarios.appendChild(tagLiFuncionarios)






            
        }

    });


    divFuncionarios.appendChild(tagUlFuncionarios)
    tagMain.append(divDepartos, divFuncionarios)
    
}


async function requisicaoFuncionarios(){
    const resposta =  await fetch(`http://localhost:6278/users`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${token}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          //console.log(response)
          renderFuncionarios(response)
        
          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
}  
requisicaoFuncionarios()

//modal
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

        window.location.reload()
    })

    mainContainer.appendChild(closeModalButton)
    mainContainer.append(children)
    backgroudContainer.appendChild(mainContainer)
    BodyModal.appendChild(backgroudContainer)
}


let objEditar = []
function conteudoModalCriar(arr){

    const div = document.createElement("div")
    div.classList = `divModalCriarD`
    const nomeModal = document.createElement("h2")
    
    
    const inputNome = document.createElement("input")

    const inputcompany_uuid = document.createElement("select")
    inputcompany_uuid.className = `inputcompany_uuid`

    const inputdescription = document.createElement("input")

    inputNome.placeholder = `Nome`
    inputdescription.placeholder = `description`


    const option = document.createElement("option")
    option.innerText = `Todas as empresas`
    inputcompany_uuid.append(option)
    arr.forEach((element)=>{

        const tagOpt = document.createElement("option")
        tagOpt.className = `tagOpt`
        tagOpt.innerText = element.name
        tagOpt.id = element.uuid

        console.log(tagOpt.id)


        inputcompany_uuid.appendChild(tagOpt)
    })



    inputcompany_uuid.addEventListener("change", (e) => {
        e.preventDefault()
        // e.target.value
        console.log(e.target.value)
        console.log(inputcompany_uuid.selectedIndex)

        

       console.log(inputcompany_uuid.options[inputcompany_uuid.selectedIndex].id)



    })




    const tagButton = document.createElement("button")
    tagButton.type = "button"
    tagButton.innerText = "Salvar Alterações"

    tagButton.addEventListener("click", (e) =>{

        e.preventDefault()
        console.log("click Editar")    

        objEditar = {
            "name": inputNome.value,
            "description": inputdescription.value,
            "company_uuid": inputcompany_uuid.options[inputcompany_uuid.selectedIndex].id

        }
        
        console.log(objEditar)
        requisicaoCriarDepart(objEditar)
        window.location.reload()
        
    })
    


    nomeModal.innerText = "Criar Departamento"
    

   
    div.append(nomeModal, inputNome, inputdescription, inputcompany_uuid, tagButton)
    
    openModal(div)
}

async function requisicaoCriarDepart(user){
    const resposta =  await fetch(`http://localhost:6278/departments`,{          
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
          body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
        //   renderDadosLogado(response)
          
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


function conteudoModalDeletarFuncionario(idUser){


    const DivConteudoModalDeletar = document.createElement("div")
    DivConteudoModalDeletar.className = `DivConteudoModalDeletar`

    const tagH1DeletarFuncionario = document.createElement("h1")

    tagH1DeletarFuncionario.innerText = `Tem certeza que deseja deletar o usuário?`


    const bottonDeletarFuncionario = document.createElement("botton")
    bottonDeletarFuncionario.className = `bottonDeletarFuncionario`
    bottonDeletarFuncionario.type = `button`
    bottonDeletarFuncionario.innerText = `Deletar`
    
    bottonDeletarFuncionario.addEventListener("click", (e) =>{

        e.preventDefault()

        console.log("Deletando")

        requisicaoDeletarFuncionarios(idUser)

        window.location.reload()

    })

    DivConteudoModalDeletar.append(tagH1DeletarFuncionario, bottonDeletarFuncionario)

    openModal(DivConteudoModalDeletar)

}


async function requisicaoDeletarFuncionarios(idUser){
    const resposta =  await fetch(`http://localhost:6278/admin/delete_user/${idUser}`,{
          
          method:"DELETE",
          headers:{"Authorization" : `Bearer ${token}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
          alert(`usuário deletado com sucesso`)
          
        
          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


function conteudoModalEditarFuncionario(idUser){


    const DivConteudoModalEditar = document.createElement("div")
    DivConteudoModalEditar.className = `DivConteudoModalEditar`

    const tagH1DeletarFuncionario = document.createElement("h1")

    tagH1DeletarFuncionario.innerText = `Editar Funcionário`

    const divSelectModalidadeDeTrabalho = document.createElement("select")

    divSelectModalidadeDeTrabalho.addEventListener("change", (e) => {
        
        e.preventDefault()

        console.log(divSelectModalidadeDeTrabalho.value)
        

    })

    const optionModalidadeDeTrabalho = document.createElement("option")
    const optionModalidadeDeTrabalhoCasa = document.createElement("option")
    const optionModalidadeDeTrabalhoPresencial = document.createElement("option")
    const optionModalidadeDeTrabalhohibrido = document.createElement("option")
    optionModalidadeDeTrabalho.innerText = `Selecionar modalidade de trabalho`
    optionModalidadeDeTrabalhoCasa.innerText = `home office`
    optionModalidadeDeTrabalhoPresencial.innerText = `presencial`
    optionModalidadeDeTrabalhohibrido.innerText = `hibrido`

    divSelectModalidadeDeTrabalho.append(optionModalidadeDeTrabalho, optionModalidadeDeTrabalhoCasa, optionModalidadeDeTrabalhoPresencial,optionModalidadeDeTrabalhohibrido)



    const divSelectNivel = document.createElement("select")

    divSelectNivel.addEventListener("change", (e) => {
        
        e.preventDefault()

        console.log(divSelectNivel.value)
        

    })


    const optionNivelProf = document.createElement("option")
    optionNivelProf.innerText = `Selecionar nível Profissional`
    const optionEstagio = document.createElement("option")
    optionEstagio.innerText = `estágio`
    const optionBasico = document.createElement("option")
    optionBasico.innerText = `júnior`
    const optionMedio = document.createElement("option")
    optionMedio.innerText = `pleno`
    const optionAvancado = document.createElement("option")
    optionAvancado.innerText = `sênior`

    divSelectNivel.append(optionNivelProf, optionEstagio, optionBasico, optionMedio, optionAvancado)


    const bottonDeletarEditar = document.createElement("botton")
    bottonDeletarEditar.className = `bottonDeletarEditar`
    bottonDeletarEditar.type = `button`
    bottonDeletarEditar.innerText = `Editar`



    // const user = {

    //     "professional_level": divSelectNivel.value,
    //     "kind_of_work": divSelectModalidadeDeTrabalho.value,
        
    // }


    // console.log(user)


    
    bottonDeletarEditar.addEventListener("click", (e) =>{

        e.preventDefault()

        const user = {

            "professional_level": divSelectNivel.value,
            "kind_of_work": divSelectModalidadeDeTrabalho.value,
            
        }
        console.log(user)
        console.log("Editando")

        requisicaoEditarFuncionario(user, idUser)
        //window.location.reload()

    })

    DivConteudoModalEditar.append(tagH1DeletarFuncionario, divSelectModalidadeDeTrabalho, divSelectNivel, bottonDeletarEditar)

    openModal(DivConteudoModalEditar)



}


async function requisicaoEditarFuncionario(user, idUser){
    const resposta =  await fetch(`http://localhost:6278/admin/update_user/${idUser}`,{          
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
          body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
        //   renderDadosLogado(response)
          
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


function conteudoModalEditarDepart(idUser, inputValorInicial){

    const DivModalEditarDepart = document.createElement("div")
    DivModalEditarDepart.className = `DivConteudoModalEditar`

    const tagH1EditarDepart = document.createElement("h1")

    tagH1EditarDepart.innerText = `Editar Departamento`


    const bottonEditarDepart = document.createElement("botton")
    bottonEditarDepart.className = `bottonDeletarFuncionario`
    bottonEditarDepart.type = `button`
    bottonEditarDepart.innerText = `Salvar alteração`
    
    const inputdescriptionModal = document.createElement("input")
    inputdescriptionModal.className = `inputdescriptionModal`
    inputdescriptionModal.placeholder = inputValorInicial

    bottonEditarDepart.addEventListener("click", (e) =>{

        e.preventDefault()

        console.log("editando depart")

        console.log(inputdescriptionModal.value)



        const user ={
            "description": inputdescriptionModal.value
          }
          console.log(user)

        requisicaoEditarDepart(user, idUser)
        window.location.reload()

    })

    DivModalEditarDepart.append(tagH1EditarDepart,inputdescriptionModal, bottonEditarDepart)

    openModal(DivModalEditarDepart)
}

async function requisicaoEditarDepart(user, idUser){
    const resposta =  await fetch(`http://localhost:6278/departments/${idUser}`,{          
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
          body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
        
          
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


function conteudoModalDeletarDepart(idUser){

    const DivConteudoModalDeletar = document.createElement("div")
    DivConteudoModalDeletar.className = `DivConteudoModalDeletar`


    const tagH1DeletarDepart = document.createElement("h1")

    tagH1DeletarDepart.innerText = `Tem certeza que deseja deletar o departamento e demitir seus funcionários?`

    const bottonDeletarDepart = document.createElement("botton")
    bottonDeletarDepart.className = `bottonDeletarDepart`
    bottonDeletarDepart.type = `button`
    bottonDeletarDepart.innerText = `Deletar`
    
    bottonDeletarDepart.addEventListener("click", (e) =>{

        e.preventDefault()

        console.log("Deletando")

        requisicaoDeletarDepart(idUser)

        window.location.reload()

    })

    DivConteudoModalDeletar.append(tagH1DeletarDepart, bottonDeletarDepart)

    openModal(DivConteudoModalDeletar)

}


async function requisicaoDeletarDepart(idUser){
    const resposta =  await fetch(`http://localhost:6278/departments/${idUser}`,{
          
          method:"DELETE",
          headers:{"Authorization" : `Bearer ${token}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
          alert(`usuário deletado com sucesso`)
          
        
          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


async function requisicaoFuncionarioSemDepart(){
    const resposta =  await fetch(`http://localhost:6278/admin/out_of_work`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${token}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
         // console.log(response)
        
          response.forEach(element => listaSemEmprego.push(element))

          if(response.error){
  
              alert(response.error)
  
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 

requisicaoFuncionarioSemDepart()
let listaSemEmprego = []


async function conteudoModalVisualizarDepart(arr, a, b, c, d){

    const divVisualizarDepart = document.createElement("div")
    divVisualizarDepart.className = `divVisualizarDepartShow`

    const tagH1VisualizarDepart= document.createElement("h1")
    //`nome do Departamento`
    tagH1VisualizarDepart.innerText = a

    const divNomesxSelect = document.createElement("div")
    divNomesxSelect.className = `divNomesxSelectShow`
   
    const divNomes = document.createElement("div")
    const tagh2 = document.createElement("h3")
    const tagh3 = document.createElement("h3")
    //`descrição do depart`
    tagh2.innerText = b
    //`nome da empresa`
    tagh3.innerText = c
    
    const divSelectButton = document.createElement("div")
    divSelectButton.className = `divSelectButtonShow`

    const tagSelect = document.createElement("select")

    tagSelect.addEventListener("change", (e) => {
        e.preventDefault()
        console.log(e.target.value)
    })

    arr.forEach((element) => {

        const tagOpt = document.createElement("option")
        tagOpt.className = `tagOpt`
        tagOpt.innerText = element.username
        tagOpt.value = element.uuid

       // console.log(tagOpt.id)
        
       tagSelect.appendChild(tagOpt)


    })


    const tagButtonContratar = document.createElement("button")
    tagButtonContratar.innerText = `Contratar`
    tagButtonContratar.addEventListener("click", (e) => {

        let userContratar = {
            "user_uuid": tagSelect.value,
            "department_uuid": d
        }
        console.log(userContratar)
        requisicaoContratar(userContratar)



        
    })



    const divListarFuncionariosPorDepart = document.createElement("ul")
    divListarFuncionariosPorDepart.className = `divListarFuncionariosPorDepart`
    const retorno = await requisicaoColegasMesmoDepart()

    console.log(await requisicaoColegasMesmoDepart())

    retorno.forEach((element) => { 
        
        if(element.department_uuid === d){

            console.log(element) 

            const tagLiFuncionariosDoDepart = document.createElement("li")
            tagLiFuncionariosDoDepart.className = `tagLiFuncionariosDoDepart`

            const tagH2NomeFuncionario = document.createElement("h4")
            tagH2NomeFuncionario.innerText = element.username

            const tagH4Nivel = document.createElement("h5")
            tagH4Nivel.innerText = element.professional_level

            const tagH4Compania = document.createElement("h5")
            tagH4Compania.innerText = c

            const tagButtonDemitir = document.createElement("button")
            tagButtonDemitir.innerText = `Demitir`

            tagButtonDemitir.addEventListener("click", async () => {
                    console.log("demitindo")
                    await requisicaoDemitir(element.uuid)

                    const ul = document.querySelector(".divListarFuncionariosPorDepart")
                    ul.innerHTML = ``
                    const retorno = await requisicaoColegasMesmoDepart()
                    console.log(retorno)
                    retorno.forEach(ele => {

                        if(ele.department_uuid === d){

                            console.log(ele) 
                
                            const tagLiFuncionariosDoDepart = document.createElement("li")
                            tagLiFuncionariosDoDepart.className = `tagLiFuncionariosDoDepart`
                
                            const tagH2NomeFuncionario = document.createElement("h4")
                            tagH2NomeFuncionario.innerText = ele.username
                
                            const tagH4Nivel = document.createElement("h5")
                            tagH4Nivel.innerText = ele.professional_level
                
                            const tagH4Compania = document.createElement("h5")
                            tagH4Compania.innerText = c
                
                            const tagButtonDemitir = document.createElement("button")
                            tagButtonDemitir.innerText = `Demitir`
                
                            tagButtonDemitir.addEventListener("click", async () => {
                                console.log("demitindo")
                                await requisicaoDemitir(ele.uuid)
                          
                            })
                            tagLiFuncionariosDoDepart.append(tagH2NomeFuncionario, tagH4Nivel, tagH4Compania, tagButtonDemitir)
                
                            ul.appendChild(tagLiFuncionariosDoDepart)
                            
                        }



                    })

            })

            tagLiFuncionariosDoDepart.append(tagH2NomeFuncionario, tagH4Nivel, tagH4Compania, tagButtonDemitir)

            divListarFuncionariosPorDepart.appendChild(tagLiFuncionariosDoDepart)
            
        }
    })


    divSelectButton.append(tagSelect, tagButtonContratar)
    divNomes.append(tagh2, tagh3)
    divNomesxSelect.append(divNomes, divSelectButton)
    divVisualizarDepart.append(tagH1VisualizarDepart, divNomesxSelect, divListarFuncionariosPorDepart)

    openModal(divVisualizarDepart)

}


async function requisicaoContratar(user){
    const resposta =  await fetch(`http://localhost:6278/departments/hire/`,{          
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
          body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
        //   renderDadosLogado(response)
        
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


async function requisicaoColegasMesmoDepart(){
    const resposta =  await fetch(`http://localhost:6278/users`,{          
          method:"GET",
          headers:{"Authorization" : `Bearer ${token}`},
          //body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          return response
          
          
          
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 


async function requisicaoDemitir(idUser){
    const resposta =  await fetch(`http://localhost:6278/departments/dismiss/${idUser}`,{          
          method:"PATCH",
          headers:{
            "Authorization" : `Bearer ${token}`
        },
        //  body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
             console.log(response)
             
                  
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
} 

