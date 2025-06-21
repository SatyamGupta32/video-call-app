import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { getFriendReqs, acceptFriendReqs } from '../lib/helper';
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import NoNotificationFound from '../components/EmptyState/NoNotificationFound';

const Notification = () => {
  const queryClient = useQueryClient();

  const { data: friendReqs, isLoading } = useQuery({
    queryKey: ['FriendRequests'],
    queryFn: getFriendReqs,
  })

  const { mutate: acceptReqMutation, isPending } = useMutation({
    mutationFn: acceptFriendReqs,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['FriendRequests'] })
  })

  const incomingReqs = friendReqs?.incomingReqs || [];
  const acceptedReqs = friendReqs?.acceptedReqs || [];

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6 '>Notifications</h1>
        {isLoading ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg' />
          </div>
        ) : (
          <>
            {incomingReqs.length > 0 && (
              <section className='space-y-4'>
                <h2 className='ytext-xl font-semibold flex items-center gap-2'>
                  <UserCheckIcon className='h-5 w-5 text-primary' />
                  Friend Requests
                  <span className='badge badge-primary ml-2'>{incomingReqs.length}</span>
                </h2>

                <div className='space-y-3'>
                  {incomingReqs.map((req) => (
                    <div
                      key={req._id}
                      className='card bg-base-200 shadow-sm hover:shadow-lg transition-shadow'>
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                              <img src={req.sender.profilePicture} alt={req.sender.fullName} />
                            </div>
                            <div>
                              <h3 className='font-semibold'>{req.sender.fullName}</h3>
                              <div className='flex flex-wrap gap-1.5 mt-1'>
                                <span className='badge badge-secondary badge-sm'>
                                  Native: {req.sender.nativeLanguage}
                                </span>
                                <span className='badge badge-outline badge-sm'>
                                  Learning: {req.sender.learningLanguage}
                                </span>
                              </div>
                              <p className='text-xs flex items-center opacity-70 mt-2'>
                                <ClockIcon className='h-3 w-3 mr-1'/>
                                {formatDistanceToNow(new Date(req.createdAt))} ago
                              </p>
                            </div>
                          </div>
                          <button
                            className='btn btn-primary btn-sm'
                            onClick={() => acceptReqMutation(req._id)}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {acceptedReqs.length > 0 && (
              <section className='space-y-4'>
                <h2 className='text-xl font-semibold items-center gap-2'>
                  <BellIcon className='h-5 w-5 text-success' />
                  New Connections
                </h2>

                <div className='space-y-3'>
                  {acceptedReqs.map((notification) => (
                    <div
                      key={notification._id}
                      className='card bg-base-200 shadow-sm'
                    >
                      <div className='card-body p-4'>
                        <div className="flex items-start gap-3">
                          <div className='avatar mt-1 size-10 rounded-full'>
                            <img
                              src={notification.receiver.profilePicture}
                              alt={notification.receiver.fullName}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className='font-semibold'>{notification.receiver.fullName}</h3>
                            <p className='text-sm my-1'>
                              {notification.receiver.fullName} has accepted your friend request.
                            </p>
                            <p className='text-xs flex items-center opacity-70'>
                              <ClockIcon className='h-3 w-3 mr-1'/>
                              {formatDistanceToNow(new Date(notification.updatedAt))} ago
                            </p>
                          </div>
                          <div className='badge badge-success'>
                            <MessageSquareIcon className='h-3 w-3 mr-1'/>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(incomingReqs.length === 0 && acceptedReqs.length === 0) && (
              <NoNotificationFound/>
            ) }
          </>
        )}
      </div>
    </div>
  )
}

export default Notification
