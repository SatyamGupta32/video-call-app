import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../../lib/helper';

const useOnboarding = () => {

    const queryClient = useQueryClient();

    const { mutate: onboardingMutation, isPending } = useMutation({
        mutationFn: completeOnboarding,
        onSuccess: () => {
            toast.success('Profile Onboarded Successfully');
            queryClient.invalidateQueries({
                queryKey: ['authUser'],
            });
        },
        onError: (error) => toast.error(error.response?.data?.message),
    });

    return { onboardingMutation, isPending };
}

export default useOnboarding
