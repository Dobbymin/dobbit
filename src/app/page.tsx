import { Button, InputGroup, InputGroupAddon, InputGroupInput, Separator } from "@/shared";
import { ChartCandlestick, ChartNoAxesCombined, ChevronDown, Search } from "lucide-react";

export default function Home() {
  return (
    <main className='flex flex-1 overflow-hidden'>
      <aside className='flex w-[20%] min-w-64 flex-col border-r border-white/10 bg-surface-dark/20'>
        <div className='p-4'>
          <InputGroup className='form-input h-10 w-full rounded-lg border-none bg-surface-dark text-sm text-text-dark placeholder:text-text-muted-dark focus:ring-2 focus:ring-primary/50 focus:outline-0'>
            <InputGroupInput placeholder='Search Markets' />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
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
      </aside>
      <section className='flex w-[60%] flex-col'>
        <div className='flex items-center justify-between border-b border-white/10 p-4'>
          <div>
            <h2 className='text-lg font-bold text-text-dark'>BTC/USD</h2>
            <p className='text-sm text-text-muted-dark'>Bitcoin / US Dollar</p>
          </div>
          <div className='text-right'>
            <p className='font-mono text-lg font-semibold text-text-dark'>68,450.25</p>
            <p className='font-mono text-sm text-positive'>+1425.11 (+2.15%)</p>
          </div>
        </div>
        <div className='flex items-center gap-2 border-b border-white/10 p-2'>
          <Button>1H</Button>
          <Button variant='ghost'>4H</Button>
          <Button variant='ghost'>1D</Button>
          <Button variant='ghost'>1W</Button>
          <Button variant='ghost'>1M</Button>
          <Separator orientation='vertical' className='mx-2 h-6 w-px' />
          <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md pr-2 pl-3 text-sm font-medium text-text-muted-dark hover:bg-white/10 hover:text-white'>
            <ChartCandlestick />
            <span>Candles</span>
            <ChevronDown className='size-4' />
          </button>
          <button className='flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md pr-2 pl-3 text-sm font-medium text-text-muted-dark hover:bg-white/10 hover:text-white'>
            <ChartNoAxesCombined />
            <span>Indicators</span>
            <ChevronDown className='size-4' />
          </button>
        </div>
        <div
          className='flex-1 bg-cover bg-center bg-no-repeat p-4'
          data-alt='A detailed candlestick financial chart for BTC/USD showing price action with green and red candles, volume bars below, and a lime green moving average line overlayed. Price and time axes are visible.'
        >
          차트 영역
        </div>
      </section>
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
    </main>
  );
}
