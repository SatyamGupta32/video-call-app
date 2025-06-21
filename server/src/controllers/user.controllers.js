import FriendRequest from '../models/friendRequest.models.js';
import User from '../models/user.models.js';


export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },       // Exclude current user
                { _id: { $nin: currentUser.friends } }, // Exclude current user's friends
                { isOnboarded: true }
            ]
        })

        res.status(200).json({
            success: true,
            message: 'Recommended users fetched successfully',
            recommendedUsers
        })
    } catch (error) {
        console.log('Error in getRecommendedUsers controller', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select('friends').populate('friends', 'fullName profilePicture learningLanguage nativeLanguage');

        res.status(200).json({
            success: true,
            message: 'My friends fetched successfully',
            friends: user.friends
        })

    } catch (error) {
        console.log('Error in getMyFriends controller', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        if (myId === recipientId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot send a friend request to yourself'
            });
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({
                success: false,
                message: 'Recipient not found'
            });
        }

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({
                success: false,
                message: 'You are already friends with this user'
            });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, receiver: recipientId },
                { sender: recipientId, receiver: myId }
            ]
        });
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'Friend request already exists'
            });
        }

        const friendRequest = await FriendRequest.create({ sender: myId, receiver: recipientId });
        return res.status(201).json({
            success: true,
            message: 'Friend request sent successfully',
            request: friendRequest
        });

    } catch (error) {
        console.error('Error in sendFriendRequest controller', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) return res.status(404).json({
            success: false,
            message: 'Friend request not found'
        })

        // verify the current user is receiver
        if (friendRequest.receiver.toString() !== req.user.id) return res.status(403).json({
            success: false,
            message: 'You are not authorized to accept this friend request'
        })

        friendRequest.status = 'accepted';
        await friendRequest.save();

        // add each user to each other friend's list
        // $addToSet: is use to add friends in array only if not exsist's
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.receiver }
        });

        await User.findByIdAndUpdate(friendRequest.receiver, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({
            success: true,
            message: 'Friend request accepted successfully'
        })

    } catch (error) {
        console.log('Error in acceptFriendRequest controller', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            receiver: req.user.id,
            status: 'pending'
        }).populate('sender', 'fullName profilePicture nativeLanguage learningLanguage');

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: 'accepted'
        }).populate('receiver', 'fullName profilePicture');

        res.status(200).json({
            success: true,
            message: 'Friend requests fetched successfully',
            incomingReqs,
            acceptedReqs
        })

    } catch (error) {
        console.log('Error in getFriendRequests controller', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingFriendReqs = await FriendRequest.find({
            sender: req.user.id,
            status: 'pending',
        }).populate('receiver', 'fullName profilePicture nativeLanguage learningLanguage');

        res.status(200).json({
            success: true,
            message: 'Outgoing friend requests fetched successfully',
            outgoingFriendReqs
        })
    } catch (error) {
        console.log('Error in getOutgoingFriendRequests controller', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}