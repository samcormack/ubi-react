import * as R from 'ramda'


const taxOnIncome = (tax, income) => {
  const bands = R.aperture(2, R.append(Infinity, R.pluck('threshold', tax)))
  
  const inBand = R.map(
    ([low, high]) => R.min(high-low, R.max(0, income - low)),
    bands
  )
  
  return R.reduce(
    (acc, [amount, rate]) => acc + (amount * rate), 
    0, 
    R.zip(inBand, R.pluck('rate', tax))
  )
}

function calculateTax(tax, incomes) {
  return R.map(income => taxOnIncome(tax, income), incomes)
}

const vectorSubtract = R.compose(R.map(R.apply(R.subtract)),R.zip)

function getAfterTax(tax, incomes) {
  return vectorSubtract(incomes, calculateTax(tax, incomes))
}

function afterUbiIncome(ubi, income) {
  return R.max(
    income,
    ubi.value + (1 - ubi.phaseOut) * income
  )
}

function addUbi(ubi, incomes) {
  return R.map(income => afterUbiIncome(ubi, income), incomes)
}

export { calculateTax, getAfterTax, addUbi }