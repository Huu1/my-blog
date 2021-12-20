import { useEffect, useReducer, useState } from 'react';
import { Get, Post } from '@/api/request';

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error('类型不匹配');
  }
};

export const useAsync = (
  initUrl: string,
  initialParam: any,
  methods = 'POST'
) => {
  const [param, setParam] = useState(initialParam);
  const [url, setUrl] = useState(initUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        let result: any;
        if (methods === 'GET') {
          result = await Get(url, param);
        } else if (methods === 'POST') {
          result = await Post(url, param);
        }

        if (result?.code !== 0) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, param, methods]);

  return { state, setParam, setUrl };
};
