import Papa from 'papaparse'
import * as R from 'ramda'
import incomeData from '../data/income_data_processed.csv'
import popData from '../data/population_age.csv'

const papaPromise = path => {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {download: true, dynamicTyping: true, complete: ({data, errors}) => {
      if (R.isEmpty(errors)) {
        resolve(data)
      } else {
        reject(errors)
      }
    }})
  })
}

function transformData(rawData) {
  return R.zipObj(
    R.head(rawData), R.transpose(R.tail(rawData))
  )
}

function popOverAge(minAge, population) {
  return R.reduce(
    (acc, [pop,]) => acc + pop,
    0,
    R.filter(
      ([, age]) => age >= minAge, 
      R.zip(population.population, population.age_lower_bound)
    )
  )
}

function nPeopleCorrected(nPeopleRaw, population) {
  return R.adjust(
    0,
    noIncRaw => noIncRaw + popOverAge(15, population) - R.sum(nPeopleRaw),
    nPeopleRaw
  )
}

const cumeSum = R.compose(R.tail, R.scan(R.add, 0))

function cumeProp(nPeople) {
  const nTot = R.sum(nPeople)
  return R.map(R.divide(R.__, nTot), cumeSum(nPeople))
}

async function getIncomeData() {
  const rawData = await Promise.all([
    papaPromise(incomeData),
    papaPromise(popData)
  ])
  const [income, population] = R.map(transformData, rawData)
  const nPeople = nPeopleCorrected(income.n_people, population)
  return {
    taxableIncome: income.taxable_income_per_person,
    nPeople: nPeople,
    cumeProp: cumeProp(nPeople),
  }
}

export { getIncomeData }