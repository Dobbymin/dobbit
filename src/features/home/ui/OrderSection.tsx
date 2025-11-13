import { OrderForm, OrderTable } from "../components";

export const OrderSection = () => {
  return (
    <section className='flex w-full flex-col space-y-4 p-4'>
      <div className='flex w-full bg-surface-dark'>
        <OrderTable />
        <OrderForm />
      </div>
    </section>
  );
};
