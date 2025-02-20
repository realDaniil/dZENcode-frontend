import { gql, useQuery } from '@apollo/client';
import { OrderProps } from '@/types';

const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      description
    }
  }
`;

export const useOrders = () => {
  // const { data, isLoading, error } = useQuery<{ orders: OrderProps[] }>(GET_ORDERS);

  // return {
  //   orders: data?.orders || [],
  //   isLoading,
  //   error
  // };
};
