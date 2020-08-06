import { useLocalStorage } from './useLocalStorage'

export const useDarkMode = () => {
  const [ darkMode, setDarkMode ] = useLocalStorage('isDarkMode', false)
  return [darkMode, setDarkMode]
}