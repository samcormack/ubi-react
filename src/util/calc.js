import * as R from 'ramda'


const taxOnIncome = (tax, income) => {
  const bands = R.aperture(2, R.append(Infinity, R.pluck('threshold', tax)))
  const inBand = R.map(
    ([low, high]) => R.min(high, R.max(0, income - low)),
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

export { calculateTax, getAfterTax }