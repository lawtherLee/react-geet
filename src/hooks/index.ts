import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
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

export const useCountDown = (target: number) => {
  const [count, setCount] = useState(target);
  const setId = useRef(0);

  useEffect(() => {
    setId.current = window.setInterval(() => {
      setCount((count) => {
        return count - 1;
      });
      console.log(count);
    }, 1000);
    return () => {
      window.clearInterval(setId.current);
    };
  }, []);
  return count;
};
