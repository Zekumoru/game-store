import { format } from 'date-fns';
import './styles/DateCapsule.scss';

function DateCapsule({ date }) {
  return (
    <div className="DateCapsule capsule capsule-light">
      {format(new Date(date), 'MMM yyyy')}
    </div>
  );
}

export default DateCapsule;
