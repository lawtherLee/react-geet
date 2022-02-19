import { RootState } from '@/types/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const useInitState = (
  stateName: keyof RootState,
  actionName: () => void
) => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state[stateName])
  useEffect(() => {
    dispatch(actionName())
  }, [])
  return state
}

// export function useInitState<StateName extends keyof RootState>(
//   stateName: StateName,
//   actionName: () => void
// ) {
//   const dispatch = useDispatch()
//   const state = useSelector((state: RootState) => state[stateName])
//   useEffect(() => {
//     dispatch(actionName())
//   }, [])
//   return state
// }
