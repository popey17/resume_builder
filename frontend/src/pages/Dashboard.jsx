import { useEffect } from 'react'
import { useResumeStore } from '../store/ResumeStore'
import { useAuthStore } from '../store/AuthStore';

const Dashboard = () => {

  const { getResumeByUser } = useResumeStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    if (!user) {
      return;
    }
    
    getResumeByUser(user._id);

  }, [getResumeByUser, user])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard