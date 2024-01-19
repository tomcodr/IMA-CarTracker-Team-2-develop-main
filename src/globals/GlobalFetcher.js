//Hauptersteller: Ilhan Bahadir 
//Verantwortlich für Methode setInterval(): Tom Bernauer

export const fetchCarData = async () => {
  try {
    const response = await fetch('https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/messwerte');
    const data = await response.json();
    return data.messwerte[0]; // Alle Daten zurückgeben
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeugdaten:', error);
    throw error;
  }
};

setInterval(async () => {
  try {
    const carData = await fetchCarData();
    console.log('Fahrzeugdaten abgerufen:', carData);
    
  } catch (error) {
    
    console.error('Fehler beim regelmäßigen Abrufen der Fahrzeugdaten:', error);
  }
}, 4000);
