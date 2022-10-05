import { CashFlow } from 'goodvandro-alganews-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as CategoryActions from '../store/EntriesCategory.slice';

export default function useEntriesCategories() {
  const dispatch = useDispatch<any>();
  const expenses = useSelector((s: RootState) => s.cashFlow.category.expenses);
  const revenues = useSelector((s: RootState) => s.cashFlow.category.revenues);

  const fetchCategories = useCallback(
    () => dispatch(CategoryActions.getCategories()),
    [dispatch]
  );

  const createCategory = useCallback(
    (category: CashFlow.CategoryInput) =>
      dispatch(CategoryActions.createCategory(category)),
    [dispatch]
  );

  return {
    expenses,
    revenues,
    fetchCategories,
    createCategory,
  };
}
