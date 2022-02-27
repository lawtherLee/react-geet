import { RootState } from '@/types/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

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

export const useCountDown = (target: number) => {
  const [count, setCount] = useState(target)
  const setId = useRef(0)

  useEffect(() => {
    setId.current = window.setInterval(() => {
      setCount((count) => {
        return count - 1
      })
      console.log(count)
    }, 1000)
    return () => {
      window.clearInterval(setId.current)
    }
  }, [])
  return count
}

type EventArgs = {
  Forward: { speed: number }
  Stop: { break: boolean }
  Left: { angle: number }
  Right: { angle: number }
}

function emit<key extends keyof EventArgs, obj extends EventArgs[key]>(
  key: key,
  obj: obj
) {}

emit('Left', { angle: 19 })

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
