export const  typesDeCours = {
    GUITARE : 'Guitare',
    PIANO : 'Piano',
    CHANT : 'Chant',
    SOLFEGE : 'Solfege',
    VIOLON : 'Violon'
  }

export const etatCours = [
  'Programmé',
  'Annulé',
   'Effectué',
]

export const TransformEtat = (number) =>{
  if(number ===0) {
    return 'Programmé'
  }
  if(number ===1) {
    return 'Annulé'
  }
  if(number ===2) {
    return 'Effectué'
  }
  return ''
}

export const typeDePaiements = {
  CHEQUE: 'Chèque',
  ESPECE: 'Espece',
  VIREMENT: 'Virement'
}

export const intToDayString = (index) => {
  if(index === 0) {
    return "Dimanche"
  }
  if(index === 1) {
    return "Lundi"
  }
  if(index === 2) {
    return "Mardi"
  }
  if(index === 3) {
    return "Mercredi"
  }
  if(index === 4) {
    return "Jeudi"
  }
  if(index === 5) {
    return "Vendredi"
  }
  if(index === 6) {
    return "Samedi"
  }
}