// Hook

import { useCallback, useState } from 'react';

// Parameter is the boolean, with default "false" value
export const useToggle = (initialState: boolean = false) => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle: any = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};
