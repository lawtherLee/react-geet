import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/types/store";

export const useInitState = (
  stateName: keyof RootState,
  actionName: () => void,
) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state[stateName]);
  useEffect(() => {
    dispatch(actionName());
  }, []);
  return state;
};
