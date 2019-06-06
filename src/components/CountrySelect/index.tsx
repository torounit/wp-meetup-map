import React from "react"
import { fetchCountries } from "../../api"
import Select, { OptionsProps } from "../Select"
import { groupBy } from "lodash"

const { useState, useEffect } = React

const CountrySelect: React.FC<any> = ({ value, onChange, ...props }) => {
  const [countries, setCountries] = useState<OptionsProps>({})

  useEffect(() => {
    ;(async () => {
      const countries = await fetchCountries()
      const groupedCountries = groupBy<{ value: string; label: string; region: string }>(
        countries
          .map(country => {
            const { name, region } = country
            return {
              value: country["alpha-2"],
              label: name,
              region,
            }
          })
          .filter(({ region }) => region),
        "region"
      )
      setCountries(groupedCountries)
    })()
  }, [])
  return (
    <Select
      options={countries}
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
