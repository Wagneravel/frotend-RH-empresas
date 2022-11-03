const tagMain = document.querySelector(".tagMain")
const token = localStorage.getItem("token Login")
console.log(token)
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

    tagMain.appendChild(tagDivContainer)
}
renderHeaderPage()


function renderHeaderDepartamento(arr){

    

    const divHeaderDepart = document.createElement("div")
    divHeaderDepart.className = `divHeaderDepart`

    const divH1Depart = document.createElement("h1")
    divH1Depart.className = `divH1Depart`
    divH1Depart.innerText = `Departamentos`

    const divSelectDepart = document.createElement("select")
    divSelectDepart.className = `divSelectDepart`

    const option = document.createElement("option")
    option.innerText = `Todas as empresas`
    divSelectDepart.append(option)
    arr.forEach((element) => {

        const tagOpt = document.createElement("option")
        tagOpt.className = `tagOpt`
        tagOpt.innerText = element.name
        
        divSelectDepart.appendChild(tagOpt)
    })

    const ButtonDepart = document.createElement("button")
    ButtonDepart.className = `ButtonDepart`
    ButtonDepart.type = `button`
    ButtonDepart.innerText = `Criar departamento`

    divHeaderDepart.append(divH1Depart, divSelectDepart, ButtonDepart)
    tagMain.appendChild(divHeaderDepart)


}




function renderDepartamentos(arr){


    const divDepartos = document.createElement("div")
    divDepartos.className = `divDepartos`


    const tagUlDepartos = document.createElement("ul")
    tagUlDepartos.className = `tagUlDepartos`

    divDepartos.appendChild(tagUlDepartos)

    arr.forEach(element => {
        
        
        const tagLiDepartos = document.createElement("li")
        tagLiDepartos.className = `tagLiDepartos`

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

        tagB1.innerText = `B1`
        tagB2.innerText = `B2`
        tagB3.innerText = `B3`

        tagDB.append(tagB1, tagB2, tagB3)
        tagLiDepartos.append(tagNomeEmpresa, tagNomeDepart, tagNomeDescri, tagDB)
        tagUlDepartos.appendChild(tagLiDepartos)
    });


    divDepartos.appendChild(tagUlDepartos)
    tagMain.appendChild(divDepartos)
}




async function requisicaoEmpresas(){
    const resposta =  await fetch(`http://localhost:6278/companies`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
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



//http://localhost:6278/departments




async function requisicaoDepartamentos(admin){
    const resposta =  await fetch(`http://localhost:6278/departments`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${admin}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
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
requisicaoDepartamentos("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA")




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
        
        
        const tagLiFuncionarios = document.createElement("li")
        tagLiFuncionarios.className = `tagLiFuncionarios`



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
        

        tagB1.innerText = `B1`
        tagB2.innerText = `B2`
        

        tagDB.append(tagB1, tagB2)
        tagLiFuncionarios.append(tagNomeEmpresa, tagNomeDepart, tagNomeDescri, tagDB)
        tagUlFuncionarios.appendChild(tagLiFuncionarios)
    });


    divFuncionarios.appendChild(tagUlFuncionarios)
    tagMain.appendChild(divFuncionarios)
}

//http://localhost:6278/users



async function requisicaoFuncionarios(admin){
    const resposta =  await fetch(`http://localhost:6278/users`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${admin}`},
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)
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
requisicaoFuncionarios("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA")
