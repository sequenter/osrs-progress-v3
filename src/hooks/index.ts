import type { AppDispatch, RootState } from '@redux';
import { useDispatch, useSelector } from 'react-redux';

export const useStoreDispatch = useDispatch.withTypes<AppDispatch>();
export const useStoreSelector = useSelector.withTypes<RootState>();
