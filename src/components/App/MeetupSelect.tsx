import React, {ChangeEvent} from "react";
import {chain, isEqual} from "lodash"
import Select, {OptionProp} from "../Select";
import {MeetupEvent} from "../Events";

const getMeetups = (meetupEvents: MeetupEvent[]): Array<{ meetup: string; meetup_url: string }> =>
  chain<MeetupEvent>(meetupEvents)
    .filter(({meetup}) => !!meetup)
    .map(({meetup, meetup_url}) => ({
      meetup,
      meetup_url,
    }))
    .uniqWith(isEqual)
    .value()

const createMeetupOptionProps = (meetupEvents: MeetupEvent[]): Array<OptionProp> => {
  const options = getMeetups(meetupEvents).map(({meetup}) => ({label: meetup, value: meetup}))
  return [{label: 'All', value: ""}, ...options]
}

interface Props {
  meetupEvents: MeetupEvent[],
  label: string,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

const MeetupSelect: React.FC<Props> = ({meetupEvents, onChange, ...props}) => (
  <Select
    {...props}
    options={createMeetupOptionProps(meetupEvents)}
    onChange={onChange}
  />
)

export default MeetupSelect
