export const MonthHeader: React.FC = () => (
  <div className="w-full flex border border-gray-200 text-center font-bold text-sm tracking-wider">
    {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((weekday) => (
      <div
        key={weekday}
        className="flex-1 border-r border-gray-200 last:border-r-0"
      >
        {weekday}
      </div>
    ))}
  </div>
);
