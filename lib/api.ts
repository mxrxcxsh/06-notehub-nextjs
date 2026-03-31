import axios from 'axios';

import type { Note, CreateNote } from '@/types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesParams {
  page: number;
  perPage: number;
  query: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  query = '',
}: fetchNotesParams): Promise<NotesResponse> => {
  const { data } = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: query,
    },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return data;
};
