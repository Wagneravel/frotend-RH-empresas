const tagMain = document.querySelector(".tagMain")


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

        window.location.assign("./cadastro.html")
    })




    const tagButtonHome = document.createElement("button")
    tagButtonHome.className = `tagButtonHome`


    tagButtonHome.addEventListener("click", () => {

        window.location.assign("../index.html")
    })





    tagLogo.innerText = `Kenzie Empresas`

    tagButtonLogin.innerText = `Cadastrar`
    tagButtonHome.innerText = `Home`



    tagDivLogo.append(tagDivLogoCor, tagLogo)
    tagDivButtons.append(tagButtonLogin, tagButtonHome)
    tagDivContainer.append(tagDivLogo, tagDivButtons)

    tagMain.appendChild(tagDivContainer)
}
renderHeader()




function renderFormCadastro(){

    const divContainer = document.createElement("div")
    divContainer.className = `divContainer`

    const tagH1 = document.createElement("h1")
    tagH1.innerText = `Fazer Login`

    const tagP = document.createElement("p")
    tagP.innerText = `Preencha os campos para realizar login`

    const tagForm = document.createElement("form")
    tagForm.className = `tagForm`

    const inputEmail = document.createElement("input")
    inputEmail.placeholder = `Seu e-mail`
    inputEmail.type = `email`

    const inputSenha = document.createElement("input")
    inputSenha.placeholder = `Sua senha`
    inputSenha.type = `password`

    const buttonLogin = document.createElement("button")
    buttonLogin.type = `button`
    buttonLogin.innerText = `Entrar`

    buttonLogin.addEventListener("click", (e) => {

        e.preventDefault()

        if (inputEmail.value != `` || inputSenha.value != ``){

            let objCadastro = {

                "password": inputSenha.value,
                "email": inputEmail.value,
            }
            console.log(objCadastro)

            requisicao(objCadastro)


        }
    })



    const tagPou = document.createElement("p")
    tagPou.innerText = `Ou`
    tagPou.className = `tagPou`


    const buttonVoltar = document.createElement("button")
    buttonVoltar.type = `button`
    buttonVoltar.innerText = `Cadastrar`

    buttonVoltar.addEventListener("click", () => {

        window.location.assign("./cadastro.html")
    })
   
    tagForm.append(inputEmail, inputSenha, buttonLogin, tagPou, buttonVoltar)
    divContainer.append(tagH1, tagP, tagForm)
    tagMain.appendChild(divContainer)
}
renderFormCadastro()




async function requisicao(user){
    const resposta =  await fetch(`http://localhost:6278/auth/login`,{
          
          method:"POST",
          headers:{"Content-Type" : "application/json"},
          body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
          console.log(response)

          if(response.token){

            localStorage.setItem(`token Login`, response.token)

            //window.location.assign("./userfeed.html")
            requisicaoValidar(response.token)
          }

          


  
          if(response.error){
  
              alert(response.error)
  
          }else{
          
               alert(`Login realizado com sucesso!`)
          }
      })
      .catch(error =>{
          console.log(error)
      })
      return resposta
}  

// const tokenLSParaValidar = localStorage.getItem(`token Login`)
// console.log(tokenLSParaValidar)

  //http://localhost:6278/auth/validate_user


async function requisicaoValidar(admin){
const resposta =  await fetch(`http://localhost:6278/auth/validate_user`,{
        
        method:"GET",
        headers:{"Authorization" : `Bearer ${admin}`},
    }).then((response)=>response.json() )
    
    .then((response)=> {
            
        console.log(response)
        if(response.is_admin === false){
            console.log(response.is_admin)
            window.location.assign("./userfeed.html")
        }else if(response.is_admin === true){
            console.log(response.is_admin)
            window.location.assign("./adminfeed.html")
        }
    
        if(response.error){

            console.log(response.error)

        }
    })
    .catch(error =>{
        console.log(error)
    })
    return resposta
}  
//requisicaoValidar(tokenLSParaValidar)