import React, { useState } from 'react';
import { CameraIcon, ShuffleIcon } from 'lucide-react';
import Textarea from '../Input/Textarea';
import Input from '../Input/Input';
import Select from '../Input/Select';
import Button from '../Button/Button';
import { toast } from 'react-hot-toast';


const OnboardingForm = ({
    formState,
    setFormState,
    onboardingMutation,
    isPending
}) => {

    const [agreed, setAgreed] = useState(false);
    const handleSumbit = (e) => {
        e.preventDefault();
        onboardingMutation(formState);
    };

    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        setFormState({ ...formState, profilePicture: randomAvatar });
        toast.success('Random Avatar Changed Successfully');
    }

    return (

        <form onSubmit={handleSumbit} className='space-y-6'>
            {/* Profile Pic Container */}
            <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                    {formState.profilePicture ? (
                        <img
                            src={formState.profilePicture}
                            alt="Profile Preview"
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <div className='flex items-center justify-center h-full'>
                            <CameraIcon className='size-12 text-base-content opacity-40' />
                        </div>
                    )}
                </div>

                <div className='flex items-center gap-2'>
                    <button type='button' onClick={handleRandomAvatar} className='btn btn-primary'>
                        <ShuffleIcon className='size-4 mr-2' />
                        Generate random Avatar
                    </button>
                </div>
            </div>


            <Input
                id="onboarding-fullname"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formState.fullName}
                onChange={e => setFormState({ ...formState, fullName: e.target.value })}
                required
                autoComplete="on"
            />

            <Textarea
                id="onborading-bio"
                label="Bio"
                type="text"
                placeholder="Tell about yourself"
                value={formState.bio}
                onChange={e => setFormState({ ...formState, bio: e.target.value })}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Select
                    label={'Native Language'}
                    name={'nativeLanguage'}
                    id={'nativeLanguage'}
                    onchange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    value={formState.nativeLanguage}
                    type={'Native'}
                />

                <Select
                    label={'Learning Language'}
                    name={'learningLanguage'}
                    id={'learningLanguage'}
                    onchange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    value={formState.learningLanguage}
                    type={'Learning'}
                />
            </div>

            <Input
                id="onboarding-location"
                label="Location"
                type="text"
                placeholder="City, Country"
                value={formState.location}
                onChange={e => setFormState({ ...formState, location: e.target.value })}
                autoComplete="on"
                required={false}
            />

            <div className='form-control'>
                <label className='label cursor-pointer justify-start gap-2'>
                    <input
                        type="checkbox"
                        className='checkbox checkbox-sm'
                        required
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                    />
                    <span className='text-sm leading-tight'>
                        I agree to the
                        <span className='text-primary hover:underline'> Terms of services</span> and
                        <span className='text-primary hover:underline'> Privacy policy</span>
                    </span>
                </label>
            </div>

            <Button disabled={!agreed}>
                {
                    isPending ?
                        (
                            <>
                                <span className='loading loading-spinner loading-xs'></span>
                                <span>Onboarding Profile...</span>
                            </>
                        )
                        :
                        (
                            <>
                                <span>
                                    Onboarding Complete
                                </span>
                            </>
                        )
                }
            </Button>
        </form>
    )
}

export default OnboardingForm
