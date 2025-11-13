import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";

export const OrderTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className='py-10'>
          <TableHead className='text-md border-b-2 border-text-dark/20 py-4 text-center font-semibold text-text-dark'>
            호가
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>324,130.913</TableCell>
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3' />
        </TableRow>
        <TableRow className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>324,130.913</TableCell>
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3' />
        </TableRow>
        <TableRow className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>324,130.913</TableCell>
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3' />
        </TableRow>
        <TableRow className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>324,130.913</TableCell>
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3' />
        </TableRow>
        <TableRow className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>324,130.913</TableCell>
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3' />
        </TableRow>
        <TableRow className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>324,130.913</TableCell>
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3' />
        </TableRow>

        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 border-2 border-black text-center text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>

        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>
        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>
        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>
        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>
        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>
        <TableRow className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
          <TableCell className='w-1/3' />
          <TableCell className='w-1/3 text-center font-roboto text-black'>17.9</TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>324,130.913</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
