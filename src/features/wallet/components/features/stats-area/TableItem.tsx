type Pops = {
  label: string;
  value: string | number;
  unit: string;
};

export const TableItem = ({ label, value, unit }: Pops) => {
  return (
    <div className='flex w-full items-center justify-between'>
      <span className='text-sm text-gray-400'>{label}</span>
      <div className='flex items-end gap-1'>
        <span className='text-lg font-bold'>{value}</span>
        <span className='text-xs font-bold text-gray-400'>{unit}</span>
      </div>
    </div>
  );
};
