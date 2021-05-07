async function getcep() {
    try {
        const cep = $('#Input-Search').val()
        const url = "https://viacep.com.br/ws/" + cep + "/json/"
        const response = await axios.get(url)
        const data = response.data
        const { localidade, uf, logradouro } = data
        const urlTemp = "https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=" + localidade + "&state=" + uf + "&token=c1cdba8979fd4fb41bf76d03b1d04eb9"
        const responseTemp = await axios.get(urlTemp)
        const dataTemp = responseTemp.data
        const id = dataTemp[0].id
        const UrlId = "https://apiadvisor.climatempo.com.br/api/v1/weather/locale/" + id + "/current?token=c1cdba8979fd4fb41bf76d03b1d04eb9"
        const responseID = await axios.get(UrlId)
        const dataId = responseID.data
        console.log(dataId)
        const { condition, date, humidity, icon, sensation, temperature, wind_direction, wind_velocity } = dataId.data
        console.log(condition, date, humidity, icon, sensation, temperature)

        const content = `
            <div class= "Cidade-Estilo" >
                ${localidade} - ${logradouro} / ${uf} 
            </div> 
            <div class="Centraliza">
            <div class="Info"> 
                <div class ="Sensacao"> 
                    Sensação: ${sensation} 
                </div>
                <div class ="Organiza-info">
                    <div class="Temperatura">
                    Temperatura: ${temperature}
                </div>
                <div class="Condicao">
                    ${condition}    
                </div>
                </div>
            </div>
            </div>
            <div class="Date"> 
                    ${date}
        </div>
   
        `
        $('#Cidade').html(content)
    } catch (error) {
        console.log("Caiu no catch")
        console.log(error.menssage)

    }
}