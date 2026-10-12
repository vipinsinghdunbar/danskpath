import { useState, useEffect } from 'react';
import { Users, Trophy, Share2, MessageSquare, UserPlus, BookOpen } from 'lucide-react';

export default function SocialHub() {
  const [activeTab, setActiveTab] = useState('leaderboard'); // leaderboard, groups, friends
  const [leaderboard, setLeaderboard] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Get current user
      const userRes = await fetch('/api/users/me', { headers });
      if (userRes.ok) {
        setCurrentUser(await userRes.json());
      }

      // Fetch based on active tab
      if (activeTab === 'leaderboard') {
        const res = await fetch('/api/social/leaderboard', { headers });
        if (res.ok) setLeaderboard(await res.json());
      } else if (activeTab === 'groups') {
        const res = await fetch('/api/social/study-groups', { headers });
        if (res.ok) setStudyGroups(await res.json());
      } else if (activeTab === 'friends') {
        const res = await fetch('/api/social/friends', { headers });
        if (res.ok) setFriends(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/social/study-groups/${groupId}/join`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to join group:', err);
    }
  };

  const addFriend = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/social/friends', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId: userId }),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to add friend:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#121417] mb-2">Learning Community</h1>
        <p className="text-[#8E8E93]">Connect, compete, and learn together.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-[#E5E5EA]">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-3 font-semibold transition-all border-b-2 ${
            activeTab === 'leaderboard'
              ? 'border-[#007AFF] text-[#007AFF]'
              : 'border-transparent text-[#8E8E93] hover:text-[#121417]'
          }`}
        >
          <Trophy className="w-5 h-5 inline mr-2" />
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-3 font-semibold transition-all border-b-2 ${
            activeTab === 'groups'
              ? 'border-[#007AFF] text-[#007AFF]'
              : 'border-transparent text-[#8E8E93] hover:text-[#121417]'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Study Groups
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-3 font-semibold transition-all border-b-2 ${
            activeTab === 'friends'
              ? 'border-[#007AFF] text-[#007AFF]'
              : 'border-transparent text-[#8E8E93] hover:text-[#121417]'
          }`}
        >
          <Users className="w-5 h-5 inline mr-2" />
          Friends
        </button>
      </div>

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E5EA] overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#007AFF]/10 to-[#5856D6]/10 border-b border-[#E5E5EA]">
              <h3 className="text-lg font-bold text-[#121417]">Global Leaderboard</h3>
              <p className="text-sm text-[#8E8E93] mt-1">Top learners this month (based on exercises completed & accuracy)</p>
            </div>

            <div className="divide-y divide-[#E5E5EA]">
              {loading ? (
                <div className="p-6 text-center text-[#8E8E93]">Loading...</div>
              ) : leaderboard.length > 0 ? (
                leaderboard.map((user, idx) => (
                  <div key={user.id} className="p-6 flex items-center justify-between hover:bg-[#F2F2F7] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        idx === 0 ? 'bg-[#FFD700]' : idx === 1 ? 'bg-[#C0C0C0]' : idx === 2 ? 'bg-[#CD7F32]' : 'bg-[#8E8E93]'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-[#121417]">{user.name}</p>
                        <p className="text-xs text-[#8E8E93]">
                          {user.module ? `Modul ${user.module}` : 'Guest'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#007AFF]">{user.points} pts</p>
                      <p className="text-xs text-[#8E8E93]">{user.exercisesCompleted} exercises</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#8E8E93]">No users yet. Be the first!</div>
              )}
            </div>
          </div>

          {/* Your position */}
          {currentUser && (
            <div className="mt-6 bg-gradient-to-r from-[#007AFF]/5 to-[#34C759]/5 rounded-xl p-6 border border-[#007AFF]/10">
              <h4 className="font-semibold text-[#121417] mb-4">Your Position</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8E8E93] text-sm">You are ranked</p>
                  <p className="text-3xl font-bold text-[#007AFF] mt-1">{currentUser.rank || '-'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#8E8E93] text-sm">Total points</p>
                  <p className="text-3xl font-bold text-[#34C759] mt-1">{currentUser.points || 0}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Study Groups Tab */}
      {activeTab === 'groups' && (
        <div>
          <div className="mb-6">
            <button className="w-full bg-[#007AFF] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#0051D5] active:scale-95 transition-all flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              Create Study Group
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="text-center text-[#8E8E93] col-span-2">Loading...</div>
            ) : studyGroups.length > 0 ? (
              studyGroups.map(group => (
                <div key={group.id} className="bg-white rounded-xl shadow-sm border border-[#E5E5EA] p-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-[#121417] mb-1">{group.name}</h4>
                    <p className="text-sm text-[#8E8E93]">{group.description}</p>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-[#8E8E93]" />
                      <span className="text-[#8E8E93]">{group.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-[#8E8E93]" />
                      <span className="text-[#8E8E93]">Focus: {group.focus || 'General'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-[#8E8E93]" />
                      <span className="text-[#8E8E93]">{group.messageCount || 0} messages</span>
                    </div>
                  </div>

                  {group.isMember ? (
                    <button className="w-full bg-[#007AFF]/10 text-[#007AFF] rounded-lg py-2 px-4 font-semibold hover:bg-[#007AFF]/20 active:scale-95 transition-all">
                      ✓ Member
                    </button>
                  ) : (
                    <button
                      onClick={() => joinGroup(group.id)}
                      className="w-full bg-[#007AFF] text-white rounded-lg py-2 px-4 font-semibold hover:bg-[#0051D5] active:scale-95 transition-all"
                    >
                      Join Group
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-[#8E8E93] py-12">
                <p>No groups found. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-[#8E8E93]">Loading...</div>
            ) : friends.length > 0 ? (
              friends.map(friend => (
                <div key={friend.id} className="bg-white rounded-xl shadow-sm border border-[#E5E5EA] p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#007AFF]/10 mx-auto mb-4 flex items-center justify-center text-2xl">
                    {friend.avatar || '👤'}
                  </div>
                  <h4 className="font-bold text-[#121417] mb-1">{friend.name}</h4>
                  <p className="text-sm text-[#8E8E93] mb-4">
                    Modul {friend.module} • {friend.exercisesCompleted} exercises
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#007AFF]/10 text-[#007AFF] rounded-lg py-2 px-3 text-sm font-semibold hover:bg-[#007AFF]/20 active:scale-95 transition-all flex items-center justify-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button className="flex-1 bg-[#E5E5EA] text-[#121417] rounded-lg py-2 px-3 text-sm font-semibold hover:bg-[#D1D1D6] active:scale-95 transition-all">
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-[#8E8E93]">
                <p>No friends yet. Add some to start learning together!</p>
              </div>
            )}
          </div>

          {/* Suggested friends */}
          <div className="mt-12">
            <h3 className="text-lg font-bold text-[#121417] mb-6">Suggested Friends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: 'Anna', module: 3, avatar: '👩' },
                { id: 2, name: 'Lars', module: 2, avatar: '👨' },
                { id: 3, name: 'Sofia', module: 4, avatar: '👱' },
              ].map(user => (
                <div key={user.id} className="bg-white rounded-xl shadow-sm border border-[#E5E5EA] p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#5856D6]/10 mx-auto mb-4 flex items-center justify-center text-2xl">
                    {user.avatar}
                  </div>
                  <h4 className="font-bold text-[#121417] mb-1">{user.name}</h4>
                  <p className="text-sm text-[#8E8E93] mb-4">Modul {user.module}</p>
                  <button
                    onClick={() => addFriend(user.id)}
                    className="w-full bg-[#34C759] text-white rounded-lg py-2 px-3 font-semibold hover:bg-[#2AA94E] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Friend
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
