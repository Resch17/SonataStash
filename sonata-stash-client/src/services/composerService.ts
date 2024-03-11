import { Composer, NewComposer } from '../types';
import { apiClient } from './baseService';

export const getComposers = async (): Promise<Composer[]> => {
  const res = await apiClient.get('/api/composer');
  return res.data;
};

export const addComposer = async (newComposer: NewComposer): Promise<number> => {
  const res = await apiClient.post('/api/composer', newComposer);
  return res.data;
};
