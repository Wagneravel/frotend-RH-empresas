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

        window.location.assign("./login.html")
    })




    const tagButtonHome = document.createElement("button")
    tagButtonHome.className = `tagButtonHome`


    tagButtonHome.addEventListener("click", () => {

        window.location.assign("../index.html")
    })





    tagLogo.innerText = `Kenzie Empresas`

    tagButtonLogin.innerText = `Login`
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
    tagH1.innerText = `Cadastre-se`

    const tagForm = document.createElement("form")
    tagForm.className = `tagForm`

    const inputNome = document.createElement("input")
    inputNome.placeholder = `Seu nome`

    const inputEmail = document.createElement("input")
    inputEmail.placeholder = `Seu e-mail`
    inputEmail.type = `email`

    const inputSenha = document.createElement("input")
    inputSenha.placeholder = `Sua senha`
    inputSenha.type = `password`

    const inputSelect = document.createElement("select")
    inputSelect.className = `inputSelect`

    const nivel = document.createElement("option")
    nivel.innerText = `Nível profissional`

    

    const optionEstagio = document.createElement("option")
    optionEstagio.innerText = `estágio`
    
    const optionBasico = document.createElement("option")
    optionBasico.innerText = `júnior`

    const optionMedio = document.createElement("option")
    optionMedio.innerText = `pleno`

    const optionAvancado = document.createElement("option")
    optionAvancado.innerText = `sênior`

    const buttonCadastrar = document.createElement("button")
    buttonCadastrar.type = `button`
    buttonCadastrar.innerText = `Cadastrar`

    buttonCadastrar.addEventListener("click", (e) => {

        e.preventDefault()

        if (inputNome.value != `` || inputEmail.value != `` || inputSenha.value != `` || inputSelect.value != ``){

            let objCadastro = {

                "username": inputNome.value,
                "password": inputSenha.value,
                "email": inputEmail.value,
                "professional_level": inputSelect.value
    
    
            }
            console.log(objCadastro)

            requisicao(objCadastro)

            // window.location.assign("./login.html")


        }
    })

    const buttonVoltar = document.createElement("button")
    buttonVoltar.type = `button`
    buttonVoltar.innerText = `Voltar`

    buttonVoltar.addEventListener("click", () => {

        window.location.assign("../index.html")
    })

    inputSelect.append(nivel, optionEstagio, optionBasico, optionMedio, optionAvancado)
    tagForm.append(tagH1, inputNome, inputEmail, inputSenha, inputSelect, buttonCadastrar, buttonVoltar)
    divContainer.append(tagForm)
    tagMain.appendChild(divContainer)
}
renderFormCadastro()


async function requisicao(user){
  const resposta =  await fetch(`http://localhost:6278/auth/register`,{
        
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(user)
    }).then((response)=>response.json() )
    
    .then((response)=> {
            
        console.log(response)
        
        if(response.error){

            alert(response.error)

        }else{
        
             alert(`Cadastro confirmado com sucesso!`)
             window.location.assign("./login.html")
        }
    })
    .catch(error =>{
        console.log(error)
    })
    return resposta
}  