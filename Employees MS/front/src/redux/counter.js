import { useSelector, useDispatch } from 'react-redux';

import { increment } from './counterSlice';

export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return(
        <>
            <button className="btn btn-primary" onClick={() => dispatch(increment())}>+{count} Likes</button>
        </>
    );
}