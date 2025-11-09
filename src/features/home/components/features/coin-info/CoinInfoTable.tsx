export const CoinInfoTable = () => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <table className='w-full text-left text-sm'>
        <thead>
          <tr className='sticky top-0 bg-surface-dark/30'>
            <th className='px-4 py-2 text-xs font-medium text-text-muted-dark'>Market</th>
            <th className='px-4 py-2 text-right text-xs font-medium text-text-muted-dark'>Price</th>
            <th className='px-4 py-2 text-right text-xs font-medium text-text-muted-dark'>24h %</th>
          </tr>
        </thead>
        <tbody>
          <tr className='cursor-pointer border-l-2 border-primary bg-primary/10 hover:bg-primary/20'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>BTC/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>68,450.25</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+2.15%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>ETH/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>3,550.78</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+1.80%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>SOL/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>165.40</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-negative'>-0.50%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>DOGE/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>0.158</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+5.75%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>XRP/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>0.525</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-negative'>-1.10%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>ADA/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>0.450</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+0.25%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>AVAX/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>35.60</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-negative'>-2.30%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>LINK/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>18.20</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+3.40%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
