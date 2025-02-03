import { useState, useEffect } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from './components/TimerList';
import { Toaster } from 'sonner';
import Button from './components/Button';
import { AddEditTimerModal } from './components/EditTimerModal';
import { useTimerStore } from './store/useTimerStore';

interface TimerData {
  id: string;
  title: string;
  description: string;
  duration: number;
  remainingTime: number;
  isRunning: boolean;
  createdAt: number;
}
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastPosition, setToastPosition] = useState<'top-right' | 'bottom-center'>('top-right');
  const { addTimer } = useTimerStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setToastPosition('bottom-center');
      } else {
        setToastPosition('top-right');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window != undefined) {
      const savedList: string | null = localStorage.getItem("timer_data");
      const parsedList: TimerData[] = JSON.parse(savedList);
      parsedList?.map((item) => {
        addTimer({
          title: item?.title.trim(),
          description: item?.description.trim(),
          duration: item?.duration,
          remainingTime: item?.remainingTime,
          isRunning: item?.isRunning,
        });
      })
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position={toastPosition} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer App</h1>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            label='Add Timer'
            icon={<Plus className="w-5 h-5" />} />
        </div>
        <TimerList />
        <AddEditTimerModal
          timer={{
            id: '',
            title: '',
            description: '',
            duration: 0,
            remainingTime: 0,
            isRunning: false,
            createdAt: 0,
          }}
          type="add"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;