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

export const formatData = lastUpdated => lastUpdated
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
;

export const totalCases = (datiToday, trend) => {
    if (datiToday.length > 0) {
        let totalCases = datiToday.map(el => el[trend]).reduce((t, n) => t + n);
        return formatNumber(totalCases);
    }
}

//perendo i giorni senza doppioni
export const setDays = (dati) => dati.length > 0 ? Array.from(new Set(sortedArray(dati).map(el => el.data))).reverse() : null

// //casi per ogni giorno e le data
export const totalsForDays = (dati, trend) => dati.length > 0 ? setDays(dati).map(el => [el, sortedArray(dati).filter(i => i.data === el).map(e => e[trend]).reduce((t, n) => t + n)]) : null