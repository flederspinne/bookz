import { useState, useCallback } from 'react'


const useToggle = (initialState = false) => {
  const [ isActive, setIsActive ] = useState(initialState)

  const open    = useCallback(() => setIsActive(true), [])
  const close   = useCallback(() => setIsActive(false), [])
  const toggle  = useCallback(() => setIsActive(!isActive), [ isActive ])

  return { open, close, isActive, toggle }
}


export default useToggle
