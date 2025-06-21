import React, { useState } from 'react'
import useAuthUser from '../components/Hook/useAuthUser';
import OnboardingForm from '../components/Forms/OnboardingForm';
import useOnboarding from '../components/Hook/useOnboarding';

const Onboarding = () => {

  const { authUser } = useAuthUser();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePicture: authUser?.profilePicture || '',
  });

  const {onboardingMutation, isPending} = useOnboarding();

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete your Profile</h1>
            <OnboardingForm
            formState={formState}
            setFormState={setFormState} 
            onboardingMutation={onboardingMutation}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  )
}

export default Onboarding
