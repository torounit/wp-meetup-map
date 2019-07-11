import React from "react"
import Select from "../Select"
import {groupBy} from "lodash"
import countries from "ISO-3166-Countries-with-Regional-Codes/all/all.json"

type CountryData = {
  label: string,
  value: string,
  group: string,
}

const CountrySelect: React.FC<any> = ({value, onChange, ...props}) => {
  const groupedCountries = groupBy<CountryData>(
    countries
      .map(country => {
        const {name, region} = country
        return {
          value: country["alpha-2"],
          label: `${country["alpha-2"]} : ${name}`,
          group: region,
        }
      })
      .sort( (a,b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      .filter(({group}) => group),
    "group"
  )

  return (
    <Select
      options={groupedCountries}
      value={value}
      onChange={e => {
        if (onChange) {
          onChange(e.target.value)
        }
      }}
      {...props}
    />
  )
}

export default CountrySelect
