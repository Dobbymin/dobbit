export const OrderSection = () => {
  return (
    <aside className='flex w-[20%] min-w-72 flex-col space-y-4 border-l border-white/10 bg-surface-dark/20 p-4'>
      <div className='rounded-lg bg-surface-dark p-4'>
        <div className='mb-4 flex border-b border-white/10'>
          <button className='flex-1 border-b-2 border-primary pb-2 text-sm font-semibold text-primary'>Market</button>
          <button className='flex-1 border-b-2 border-transparent pb-2 text-sm font-semibold text-text-muted-dark hover:text-white'>
            Limit
          </button>
        </div>
        <form className='space-y-4'>
          <div>
            <label className='mb-1 block text-xs text-text-muted-dark' htmlFor='price'>
              Price
            </label>
            <div className='relative'>
              <input
                className='form-input bg-background-dark h-10 w-full rounded-md border-white/10 pr-12 text-sm text-text-dark placeholder:text-text-muted-dark focus:ring-2 focus:ring-primary/50 focus:outline-0'
                id='price'
                type='text'
                value='Market'
              />
              <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-text-muted-dark'>USD</span>
            </div>
          </div>
          <div>
            <label className='mb-1 block text-xs text-text-muted-dark' htmlFor='amount'>
              Amount
            </label>
            <div className='relative'>
              <input
                className='form-input bg-background-dark h-10 w-full rounded-md border-white/10 pr-12 text-sm text-text-dark placeholder:text-text-muted-dark focus:ring-2 focus:ring-primary/50 focus:outline-0'
                id='amount'
                placeholder='0.00'
                type='number'
              />
              <span className='absolute top-1/2 right-3 -translate-y-1/2 text-xs text-text-muted-dark'>BTC</span>
            </div>
          </div>
          <div className='flex gap-4 pt-2'>
            <button
              className='hover:bg-opacity-90 flex-1 rounded-md bg-positive py-2.5 text-sm font-bold text-white'
              type='button'
            >
              Buy
            </button>
            <button
              className='hover:bg-opacity-90 flex-1 rounded-md bg-negative py-2.5 text-sm font-bold text-white'
              type='button'
            >
              Sell
            </button>
          </div>
        </form>
      </div>
      <div className='flex-1 overflow-y-auto rounded-lg bg-surface-dark'>
        <h3 className='sticky top-0 border-b border-white/10 bg-surface-dark p-4 text-sm font-semibold text-text-dark'>
          Open Positions (1)
        </h3>
        <div className='space-y-4 p-4'>
          <div className='bg-background-dark rounded-md border border-white/10 p-3 text-sm'>
            <div className='mb-2 flex items-center justify-between'>
              <span className='font-bold text-text-dark'>BTC/USD Long</span>
              <span className='font-mono text-positive'>+1,230.50 (+4.5%)</span>
            </div>
            <div className='flex justify-between text-xs text-text-muted-dark'>
              <span>Entry Price</span>
              <span className='font-mono'>67,219.75</span>
            </div>
            <div className='flex justify-between text-xs text-text-muted-dark'>
              <span>Size</span>
              <span className='font-mono'>0.5 BTC</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
