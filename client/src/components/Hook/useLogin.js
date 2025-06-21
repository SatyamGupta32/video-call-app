import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../lib/helper'; 

const useLogin = () => {

    const queryClient = useQueryClient();
    const { mutate: loginMutation, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
        onError: (err) => console.log(err.response?.data?.message)
    });

    return { loginMutation, isPending, error };
}

export default useLogin
