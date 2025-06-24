import React from 'react'
import { getUserFriends } from '../lib/helper'
import FriendCard from '../components/Cards/FriendCard'
import { useQuery } from '@tanstack/react-query'
import NoFriendFound from '../components/EmptyState/NoFriendFound'

const Friends = () => {

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ['friends'],
        queryFn: getUserFriends,
    })
    return (
        <div className='p-4'>
            {loadingFriends ? (
                <div className='flex justify-center py-12'>
                    <span className='loading loading-spinner loading-lg' />
                </div>
            ) : friends.length === 0 ? (
                <NoFriendFound />
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {friends.map((friend) => (
                        <FriendCard key={friend._id} friend={friend} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Friends
