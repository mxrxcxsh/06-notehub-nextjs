'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Link from 'next/link';

const NoteDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <span>{data.tag}</span>
      <button>
        <Link href="/notes">Go back</Link>
      </button>
    </div>
  );
};

export default NoteDetails;
