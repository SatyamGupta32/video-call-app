import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../lib/helper';

const useLogout = () => {

    const queryClient = useQueryClient();

    const { mutate: logoutMutation, isPending, error } = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        onError: (err) => console.log(err.response?.data?.message)
    });

    return { logoutMutation, isPending, error };
}

export default useLogout
