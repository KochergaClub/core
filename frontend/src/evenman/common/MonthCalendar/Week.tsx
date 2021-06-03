import { addDays } from 'date-fns';

const weekDates = (firstDay: Date) =>
  Array.from(Array(7).keys()).map((delta) => addDays(firstDay, delta));

interface Props {
  firstDay: Date;
  renderCell: (date: Date) => React.ReactNode;
  renderHeader: (date: Date) => React.ReactNode;
}

export const Week: React.FC<Props> = ({
  firstDay,
  renderCell,
  renderHeader,
}) => {
  return (
    <div className="relative grid grid-cols-7 h-full divide-x divide-gray-200 border-b border-gray-200">
      {weekDates(firstDay).map((day, i) => {
        return (
          <div className="flex flex-col h-full group overflow-hidden" key={i}>
            <header>{renderHeader(day)}</header>
            <div className="flex-1 flex flex-col overflow-hidden">
              {renderCell(day)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
