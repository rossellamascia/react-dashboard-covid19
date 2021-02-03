export const getList = () => {
    return (
        fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
            .then(response => response.json())
    )

}