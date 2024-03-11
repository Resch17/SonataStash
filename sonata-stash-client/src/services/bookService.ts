import { Book } from '../types';
import { apiClient } from './baseService';

export const getAllBooks = async (): Promise<Book[]> => {
  const res = await apiClient.get('/api/book');
  return res.data;
};

export const getBookById = async (bookId: number): Promise<Book | null> => {
  try {
    const res = await apiClient.get(`/api/book/${bookId}`);
    return res.data;
  } catch {
    return null;
  }
};

export const addBook = async (book: Book): Promise<number> => {
  const res = await apiClient.post('/api/book', book);
  return res.data;
};
