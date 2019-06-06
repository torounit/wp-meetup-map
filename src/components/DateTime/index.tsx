import React, { Fragment } from "react"
import moment from "moment"

const DateTime: React.FC<{ datetime: string; format?: string }> = ({ datetime, format = undefined }) => (
  <time dateTime={moment(datetime).format()}>{moment(datetime).format(format)}</time>
)

export default DateTime
