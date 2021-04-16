export const typeOptions = [
  { value: 'all', label: 'Show all' },
  { value: 'houses', label: 'Houses' },
  { value: 'flats', label: 'Flats' }
]

export const bedroomOptions = [
  { value: 'studio', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10+' }
]

export const priceOptions = [
  { value: '10000', label: '£10,000' },
  { value: '20000', label: '£20,000' },
  { value: '30000', label: '£30,000' },
  { value: '40000', label: '£40,000' },
  { value: '50000', label: '£50,000' },
  { value: '60000', label: '£60,000' },
  { value: '70000', label: '£70,000' },
  { value: '80000', label: '£80,000' },
  { value: '90000', label: '£90,000' },
  { value: '110000', label: '£110,000' },
  { value: '120000', label: '£120,000' },
  { value: '130000', label: '£130,000' },
  { value: '140000', label: '£140,000' },
  { value: '150000', label: '£150,000' },
  { value: '160000', label: '£160,000' },
  { value: '170000', label: '£170,000' },
  { value: '180000', label: '£180,000' },
  { value: '190000', label: '£190,000' },
  { value: '200000', label: '£200,000' },
  { value: '250000', label: '£250,000' },
  { value: '300000', label: '£300,000' },
  { value: '350000', label: '£350,000' },
  { value: '400000', label: '£400,000' },
  { value: '450000', label: '£450,000' },
  { value: '500000', label: '£500,000' },
  { value: '550000', label: '£550,000' },
  { value: '600000', label: '£600,000' },
  { value: '650000', label: '£650,000' },
  { value: '700000', label: '£700,000' },
  { value: '750000', label: '£750,000' },
  { value: '800000', label: '£800,000' },
  { value: '850000', label: '£850,000' },
  { value: '900000', label: '£900,000' },
  { value: '950000', label: '£950,000' },
  { value: '1000000', label: '£1,000,000' }
]

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'grey' : 'darkgrey',
  }),
}