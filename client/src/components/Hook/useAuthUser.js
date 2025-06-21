import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getAuthuser } from '../../lib/helper';
 
 const useAuthUser = () => {
    const authUser = useQuery({
        queryKey: ['authUser'],
        queryFn: getAuthuser,
        retry: false, //auth check
      });

      return {isLoading: authUser.isLoading, authUser: authUser.data?.user}
 }
 
 export default useAuthUser
 