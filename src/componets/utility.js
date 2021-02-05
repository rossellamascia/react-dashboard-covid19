//array al contrario
export const sortedArray = (dati) => [...dati].reverse()
//formatto i dati per una maggiore chiarezza
export const formatNumber = (num) => new Intl.NumberFormat('it-IT').format(num)

export const lastUpdated = (dati) => {
    if (dati.length > 0) {
        let sorted = sortedArray(dati)
        // ultima data caricata
        let lastUpdated = sorted[0].data
        // regione con più casi
        let lastUpdatedData = sorted.filter(el => el.data === lastUpdated).sort((a, b) => b.nuovi_positivi - a.nuovi_positivi)
        return lastUpdatedData
    } else {
        return []
    }
}

export const formatData = lastUpdated => {
   let lastUpdatedFormatted = lastUpdated
            .split("T")[0]
            .split("-")
            .reverse()
            .join("/");
        return lastUpdatedFormatted
};