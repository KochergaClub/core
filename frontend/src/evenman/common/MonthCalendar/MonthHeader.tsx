const MonthHeader: React.FC = () => {
  return (
    <div className="flex divide-x divide-gray-200 border-t border-gray-200">
      {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((weekday) => (
        <div
          key={weekday}
          className="flex-1 text-center text-xs font-bold tracking-wide"
        >
          {weekday}
        </div>
      ))}
    </div>
  );
};

export default MonthHeader;
