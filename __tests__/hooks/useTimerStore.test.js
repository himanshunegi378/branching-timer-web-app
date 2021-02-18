import useTimerStore from "../../src/hooks/useTimerStore";
import { renderHook } from '@testing-library/react-hooks'
import { expect } from "chai";
import { act } from "react-test-renderer";

describe('useTimerStore', () => {
    it('userTimerStore test', () => {
        const { result, wait, rerender } = renderHook(
            () => useTimerStore()
        );
        let timer
        act(() => {
            timer = result.current.addTimer('himanshu', 50)

        })
        expect(result.current.getTimer(timer.id).id).eq(timer.id)
        expect(timer.name).eq('himanshu')
        expect(timer.time).eq(50)
        act(() => {
            result.current.updateTimer(timer.id,{name:'laxmi',time:60})
        })
        expect(timer.name).eq('laxmi')
        expect(timer.time).eq(60)
        
        act(() => {
            result.current.deleteTimer(timer.id)
        })
        expect(result.current.getTimer(timer.id)).eq(undefined)
        
        
    })

});