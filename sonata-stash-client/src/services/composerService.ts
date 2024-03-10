import { Composer } from "../types";
import { apiClient } from "./baseService";

export const getComposers = async (): Promise<Composer[]> => {
	const res = await apiClient.get('/api/composer');
	return res.data;
}