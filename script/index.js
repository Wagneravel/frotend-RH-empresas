
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

        window.location.assign("./pages/login.html")
    })




    const tagButtonCadastro = document.createElement("button")
    tagButtonCadastro.className = `tagButtonCadastro`


    tagButtonCadastro.addEventListener("click", () => {

        window.location.assign("./pages/cadastro.html")
    })





    tagLogo.innerText = `Kenzie Empresas`

    tagButtonLogin.innerText = `Login`
    tagButtonCadastro.innerText = `Cadastro`



    tagDivLogo.append(tagDivLogoCor, tagLogo)
    tagDivButtons.append(tagButtonLogin, tagButtonCadastro)
    tagDivContainer.append(tagDivLogo, tagDivButtons)

    tagMain.appendChild(tagDivContainer)
}
renderHeader()


let arrSelectOpt = []
let arrElementos = []
async function requisicao(){
    const resposta =  await fetch(`http://localhost:6278/companies`,{
          
          method:"GET",
          headers:{"Authorization" : `Bearer ${null}`},
          //body: JSON.stringify(user)
      }).then((response)=>response.json() )
      
      .then((response)=> {
              
                
                //console.log(response)

                
                response.forEach(element => {


                    if(element != undefined){

                        // console.log(element)
                         arrElementos.push(element)
                        // console.log(element.name)
                        // console.log(element.opening_hours)
                        arrSelectOpt.push(element.sectors.description)


                        renderBodyHome(element.name, element.opening_hours, element.sectors.description)


                           
                    }
                    


                   //renderBodyHome(element.name, element.opening_hours, element.sectors.description)
                    
                });
                //console.log(arrSelectOpt)
                var semRepetidos = arrSelectOpt.filter(function(el, i) {
                    return arrSelectOpt.indexOf(el) === i;
                });
               // console.log(semRepetidos)
                selectOpt(semRepetidos)
        
       })
      .catch(error =>{
          console.log(error)
          
      })
      return resposta
}
requisicao()








const tagDivContainerBody = document.createElement("div")
tagDivContainerBody.className = `tagDivContainerBody`

const tagDivImg = document.createElement("div")
tagDivImg.className = `tagDivImg`

const tagImg = document.createElement("img")
tagImg.className = `tagImg`
tagImg.src = `https://vemvoar.voeazul.com.br/wp-content/uploads/2018/07/regras-de-etiqueta-5-formas-de-se-portar-em-uma-reuniao-de-negocios.jpeg`
 

const tagDivMobile = document.createElement("div")
tagDivMobile.className = `tagDivMobile`

const tagDivSelect = document.createElement("select")
tagDivSelect.className = `tagDivSelect`
let result = ""
tagDivSelect.addEventListener("change", (e) => {

    e.preventDefault()
    
    result = e.target.value
   // console.log(result)
    //console.log(arrElementos)
    tagUl.innerHTML = ``
    arrElementos.forEach(element => {

        if (result === element.sectors.description){

            

            renderBodyHome(element.name, element.opening_hours, element.sectors.description)
        }else if(result === `Selecionar setor`){

            renderBodyHome(element.name, element.opening_hours, element.sectors.description)
        }
        
    })
   


})


const option = document.createElement("option")
option.innerText = `Selecionar setor`

function selectOpt(arr){

    arr.forEach((element) => {

        const tagOpt = document.createElement("option")
        tagOpt.className = `tagOpt`
        tagOpt.innerText = element
        

        

        tagDivSelect.appendChild(tagOpt)

    })
}

tagDivSelect.innerText = `Selecionar setor`
tagDivSelect.appendChild(option)
const tagUl = document.createElement("ul")
tagUl.className = `tagUl`

function renderBodyHome(a, b, c){

    const tagli = document.createElement("li")
    tagli.className = `tagli`

    const nomeEmpresa = document.createElement("h2")

    const divPeSetor = document.createElement("div")
    divPeSetor.className =`divPeSetor`


    const horasDeTrabalho = document.createElement("p")

    const divSetor = document.createElement("div")
    divSetor.className = `divSetor`

    nomeEmpresa.innerText = a
    horasDeTrabalho.innerText = `${b} horas`
    divSetor.innerText = c


    divPeSetor.append(horasDeTrabalho, divSetor)
    tagli.append(nomeEmpresa, divPeSetor)
    tagUl.appendChild(tagli)
    tagDivMobile.append(tagDivSelect, tagUl)
    tagDivImg.appendChild(tagImg)
    tagDivContainerBody.append(tagDivImg, tagDivMobile)
    tagMain.appendChild(tagDivContainerBody)

    
}



