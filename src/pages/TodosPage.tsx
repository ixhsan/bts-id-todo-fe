// src/pages/Todos.tsx
import { LogoutButton } from '@/components/LogoutButton';
import { Button } from '@/components/ui/button';

interface NoteCard {
  id: string;
  title?: string;
  content: string;
  color: string;
}

const dummyNotes: NoteCard[] = [
  {
    id: '1',
    title: 'Daily Reminder',
    content: 'Drink warm water in the morning.',
    color: 'bg-lime-100',
  },
  {
    id: '2',
    title: 'Online Shopping Tip',
    content: 'Found a better deal right after purchase? Wait 24 hours before making big purchases to avoid impulse buying.',
    color: 'bg-orange-100',
  },
  {
    id: '3',
    title: 'Question of the Day',
    content: 'What task performs best under pressure? Making diamonds, obviously!',
    color: 'bg-blue-100',
  },
  {
    id: '4',
    title: 'Office Humor',
    content: 'In every office there is someone named Mike who thinks they\'re the funny one.',
    color: 'bg-yellow-100',
  },
  {
    id: '5',
    title: 'Meeting Notes',
    content: '10:00 AM - Team sync\n10:30 AM - Client call\n2:00 PM - Project review',
    color: 'bg-green-100',
  },
  {
    id: '6',
    title: 'Random Thought',
    content: 'Why do we park on driveways and drive on parkways?',
    color: 'bg-pink-100',
  },
  {
    id: '7',
    title: 'Commute Timeline',
    content: '8:15 left home\n8:25 reached station\n8:45 arrived at office',
    color: 'bg-cyan-100',
  },
  {
    id: '8',
    title: 'Hidden Talent',
    content: 'I can recite the alphabet backwards in under 3 seconds.',
    color: 'bg-rose-100',
  },
];

const NoteCard = ({ note }: { note: NoteCard }) => (
  <div className={`p-6 rounded-lg shadow-sm ${note.color} h-full transition-transform hover:scale-102 cursor-pointer`}>
    {note.title && (
      <h3 className="text-sm font-medium text-gray-600 mb-2">{note.title}</h3>
    )}
    <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
  </div>
);

export const Todos = () => {
  console.log("loaded todos")
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => console.log('Add new note')}>
            Add Note
          </Button>
          <LogoutButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dummyNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};