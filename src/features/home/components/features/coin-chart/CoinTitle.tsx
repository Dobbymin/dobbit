export const CoinTitle = () => {
  return (
    <div className='flex items-center justify-between border-b border-white/10 p-4'>
      <div>
        <h2 className='text-lg font-bold text-text-dark'>BTC/USD</h2>
        <p className='text-sm text-text-muted-dark'>Bitcoin / US Dollar</p>
      </div>
      <div className='text-right font-mono'>
        <p className='text-2xl font-semibold text-text-dark'>68,450.25</p>
        <p className='text-sm text-positive'>+1425.11 (+2.15%)</p>
      </div>
    </div>
  );
};
