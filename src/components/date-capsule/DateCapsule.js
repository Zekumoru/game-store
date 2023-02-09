import { format } from 'date-fns';

function DateCapsule({ date }) {
  return (
    <div className="DateCapsule">{format(new Date(date), 'MMM yyyy')}</div>
  );
}

export default DateCapsule;
