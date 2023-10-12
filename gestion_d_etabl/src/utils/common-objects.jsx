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