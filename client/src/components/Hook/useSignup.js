import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../../lib/helper';

const useSignup = () => {
    const queryClient = useQueryClient();

    const { mutate: signupMutation, isPending, error } = useMutation({
      mutationFn: signup,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
      onError: (err) => console.log(err.response?.data?.message),
    });

    return { signupMutation, isPending, error };
}

export default useSignup;
