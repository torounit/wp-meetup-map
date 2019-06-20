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
          label: name,
          group: region,
        }
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
