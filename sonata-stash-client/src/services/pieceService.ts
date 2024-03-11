import { Piece } from '../types';
import { apiClient } from './baseService';

export const getPieces = async (): Promise<Piece[]> => {
  const res = await apiClient.get('/api/piece');
  return res.data;
};

export const getPiecesByComposer = async (
  composerId: number
): Promise<Piece[]> => {
  const res = await apiClient.get(`/api/piece?composerId=${composerId}`);
  return res.data;
};

export const addPiece = async (piece: Piece): Promise<number> => {
  const res = await apiClient.post('/api/piece', piece);
  return res.data;
};
